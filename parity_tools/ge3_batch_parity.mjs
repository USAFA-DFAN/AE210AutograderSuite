import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath, pathToFileURL } from "url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const graderPath = path.join(repoRoot, "GE3Autograder/docs/engine/grade.js");
const rulesPath = path.join(repoRoot, "GE3Autograder/docs/engine/rules.js");
const baselinePath =
  process.argv[4] ||
  path.join(repoRoot, "GE3Autograder/docs/testdata/matlab_expected.json");
const parserPath = path.join(scriptDir, "jet11_xlsx_loader.py");
const pythonPath = process.env.PARITY_PYTHON || "/home/dellolmstead/pyproj/.venv/bin/python";
const workbookDir = process.argv[2] || "/mnt/c/AE210AutograderFiles/FA25FinalProject";
const reportPath = process.argv[3] || path.resolve(process.cwd(), "ge3_parity_report.json");
const caseLimit = Number.parseInt(process.argv[5] || "", 10);

if (!globalThis.XLSX) {
  globalThis.XLSX = {
    utils: {
      decode_cell(ref) {
        const match = /^([A-Z]+)(\d+)$/i.exec(ref);
        if (!match) throw new Error(`Invalid cell reference: ${ref}`);
        const [, colLetters, rowStr] = match;
        let c = 0;
        for (const ch of colLetters.toUpperCase()) {
          c = c * 26 + (ch.charCodeAt(0) - 64);
        }
        return { r: Number.parseInt(rowStr, 10) - 1, c: c - 1 };
      },
    },
  };
}

const { gradeWorkbook } = await import(pathToFileURL(graderPath).href);
const { RULES } = await import(pathToFileURL(rulesPath).href);

const WEIRD_GE = String.fromCharCode(0xe2) + String.fromCharCode(0x2030) + String.fromCharCode(0xa5);
const WEIRD_LE = String.fromCharCode(0xe2) + String.fromCharCode(0x2030) + String.fromCharCode(0xa4);

function normalizeLine(line) {
  if (!line && line !== "") return "";
  return String(line)
    .replaceAll(WEIRD_GE, "≥")
    .replaceAll(WEIRD_LE, "≤")
    .replace(/\r/g, "")
    .replace(/\s+$/g, "");
}

function normalizeLog(log, fileName = "") {
  const lines = Array.isArray(log) ? log : String(log).split(/\r?\n/);
  const lowerFile = (fileName || "").toLowerCase();
  const cleaned = lines
    .map((line) => normalizeLine(line))
    .filter((line) => {
      if (!line) return false;
      const lower = line.toLowerCase();
      if (lower.endsWith(".xlsm")) return false;
      if (lowerFile && lower.includes(lowerFile)) return false;
      if (lower.startsWith("ge 3_") || lower.startsWith("ge 5_")) return false;
      return true;
    });
  while (cleaned.length > 0 && cleaned[cleaned.length - 1] === "") cleaned.pop();
  return cleaned;
}

function compareLogs(expected, actual, fileName = "") {
  const exp = normalizeLog(expected);
  const act = normalizeLog(actual, fileName);
  const max = Math.max(exp.length, act.length);
  const mismatches = [];
  for (let i = 0; i < max; i += 1) {
    const expectedLine = exp[i] ?? "";
    const actualLine = act[i] ?? "";
    if (expectedLine !== actualLine) {
      mismatches.push({ line: i + 1, expected: expectedLine, actual: actualLine });
    }
  }
  return mismatches;
}

function loadWorkbookViaPython(filePath) {
  const proc = spawnSync(pythonPath, [parserPath, filePath], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (proc.status !== 0) {
    throw new Error(`Loader failed for ${path.basename(filePath)}: ${proc.stderr || proc.stdout}`);
  }
  return JSON.parse(proc.stdout);
}

function main() {
  const baselines = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  const report = [];
  let matched = 0;
  let mismatched = 0;
  let failed = 0;

  for (const entry of Number.isFinite(caseLimit) ? baselines.slice(0, caseLimit) : baselines) {
    const filePath = path.join(workbookDir, entry.file);
    if (!fs.existsSync(filePath)) {
      failed += 1;
      report.push({ file: entry.file, status: "missing_workbook" });
      continue;
    }
    try {
      const workbook = loadWorkbookViaPython(filePath);
      const result = gradeWorkbook(workbook, RULES);
      const actualLines = result.feedbackLog.split(/\r?\n/);
      const mismatchesForFile = compareLogs(entry.logLines, actualLines, entry.file);
      if (mismatchesForFile.length === 0) {
        matched += 1;
        report.push({ file: entry.file, status: "match" });
      } else {
        mismatched += 1;
        report.push({
          file: entry.file,
          status: "mismatch",
          mismatchCount: mismatchesForFile.length,
          mismatches: mismatchesForFile.slice(0, 30),
          expectedLast: entry.logLines[entry.logLines.length - 1] ?? "",
          actualLast: actualLines[actualLines.length - 1] ?? "",
        });
      }
    } catch (error) {
      failed += 1;
      report.push({ file: entry.file, status: "error", error: error.message });
    }
  }

  const summary = {
    repoRoot,
    pythonPath,
    workbookDir,
    baselinePath,
    baselineCount: baselines.length,
    casesRun: Number.isFinite(caseLimit) ? Math.min(caseLimit, baselines.length) : baselines.length,
    matched,
    mismatched,
    failed,
  };

  fs.writeFileSync(reportPath, JSON.stringify({ summary, report }, null, 2));

  console.log(JSON.stringify(summary, null, 2));
  if (mismatched > 0 || failed > 0) {
    const interesting = report.filter((r) => r.status !== "match").slice(0, 10);
    for (const item of interesting) {
      console.log(`\n${item.file}`);
      console.log(`status: ${item.status}`);
      if (item.mismatchCount) console.log(`mismatches: ${item.mismatchCount}`);
      if (item.error) console.log(`error: ${item.error}`);
      if (item.mismatches?.length) {
        for (const row of item.mismatches.slice(0, 5)) {
          console.log(` line ${row.line}`);
          console.log(`   expected: ${row.expected}`);
          console.log(`   actual:   ${row.actual}`);
        }
      }
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
