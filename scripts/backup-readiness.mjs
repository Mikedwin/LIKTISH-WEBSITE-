import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const REQUIRED_VERCEL_ENV = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_DASHBOARD_USERNAME",
  "ADMIN_DASHBOARD_PASSWORD",
  "ADMIN_DASHBOARD_ROLE",
  "ADMIN_SESSION_SECRET",
  "CRON_SECRET",
];

const OPTIONAL_VERCEL_ENV = [
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "SENDGRID_API_KEY",
  "SENDGRID_FROM_EMAIL",
  "HUBTEL_CLIENT_ID",
  "HUBTEL_CLIENT_SECRET",
  "HUBTEL_SENDER_ID",
  "ADMIN_NOTIFICATION_EMAIL",
  "ADMIN_NOTIFICATION_PHONE",
  "ADMIN_ALLOWED_ORIGINS",
];

const root = process.cwd();
const isWindows = process.platform === "win32";
const results = [];
const commandOverrides = {
  supabase: isWindows ? join(homedir(), "bin", "supabase-cli", "supabase.exe") : "",
  vercel: isWindows ? join(homedir(), "bin", "vercel-cli", "vercel.cmd") : "",
};

function addResult(name, status, detail = "") {
  results.push({ name, status, detail });
}

function run(command, args, options = {}) {
  const resolvedCommand = resolveCommand(command);
  const isCmd = isWindows && resolvedCommand.toLowerCase().endsWith(".cmd");

  return execFileSync(isCmd ? "cmd.exe" : resolvedCommand, isCmd ? ["/d", "/c", resolvedCommand, ...args] : args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

function commandExists(command) {
  const override = commandOverrides[command];
  if (override && existsSync(override)) {
    return true;
  }

  try {
    run(isWindows ? "where.exe" : "which", [command]);
    return true;
  } catch {
    return false;
  }
}

function resolveCommand(command) {
  const override = commandOverrides[command];
  if (override && existsSync(override)) {
    return override;
  }

  return command;
}

function parseEnvNames(contents) {
  const names = new Set();

  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#][^=]+?)\s*=/);
    if (match) {
      names.add(match[1].trim());
    }
  }

  return names;
}

function checkGit() {
  if (!commandExists("git")) {
    addResult("Git CLI", "fail", "git is not available on PATH.");
    return;
  }

  const status = run("git", ["status", "--short"]).trim();
  addResult("Git working tree", status ? "warn" : "pass", status ? "Uncommitted changes exist." : "Clean.");
}

function checkSupabase() {
  if (!commandExists("supabase")) {
    addResult("Supabase CLI", "fail", "supabase is not available on PATH.");
    return;
  }

  const projectRefPath = join(root, "supabase", ".temp", "project-ref");
  addResult(
    "Supabase link",
    existsSync(projectRefPath) ? "pass" : "fail",
    existsSync(projectRefPath) ? "Project ref is present." : "Run supabase link.",
  );

  try {
    const output = run("supabase", ["migration", "list", "--linked"]);
    const mismatch = output
      .split(/\r?\n/)
      .some((line) => /\d{8}/.test(line) && line.includes("|") && line.split("|").slice(0, 2).some((part) => !part.trim()));

    addResult(
      "Supabase migrations",
      mismatch ? "fail" : "pass",
      mismatch ? "Local and remote migrations are not aligned." : "Local and remote migrations appear aligned.",
    );
  } catch (error) {
    addResult("Supabase migrations", "fail", error.stderr?.toString().trim() || "Unable to list linked migrations.");
  }
}

function checkVercel() {
  if (!commandExists("vercel")) {
    addResult("Vercel CLI", "fail", "vercel is not available on PATH.");
    return;
  }

  const projectPath = join(root, ".vercel", "project.json");
  addResult(
    "Vercel link",
    existsSync(projectPath) ? "pass" : "fail",
    existsSync(projectPath) ? "Project link is present." : "Run vercel link.",
  );

  let envOutput = "";

  try {
    const tmpPath = join(root, ".backup-readiness.env.tmp");
    run("vercel", [
      "env",
      "pull",
      tmpPath,
      "--environment=production",
      "--non-interactive",
    ]);
    envOutput = readFileSync(tmpPath, "utf8");
  } catch (error) {
    addResult("Vercel production env", "fail", error.stderr?.toString().trim() || "Unable to pull env names.");
    return;
  }

  const envNames = parseEnvNames(envOutput);
  const missingRequired = REQUIRED_VERCEL_ENV.filter((name) => !envNames.has(name));
  const missingOptional = OPTIONAL_VERCEL_ENV.filter((name) => !envNames.has(name));

  addResult(
    "Vercel required env names",
    missingRequired.length === 0 ? "pass" : "fail",
    missingRequired.length === 0 ? "All required names present." : `Missing: ${missingRequired.join(", ")}`,
  );
  addResult(
    "Vercel optional env names",
    missingOptional.length === 0 ? "pass" : "warn",
    missingOptional.length === 0 ? "All optional names present." : `Not configured: ${missingOptional.join(", ")}`,
  );
}

async function checkHealth() {
  try {
    const response = await fetch("https://liktish-website.vercel.app/api/health", {
      headers: {
        "x-request-id": "backup-readiness-check",
      },
    });
    const body = await response.json();
    addResult(
      "Live health",
      response.ok && body.ok ? "pass" : "fail",
      `HTTP ${response.status}; status=${body.status ?? "unknown"}`,
    );
  } catch (error) {
    addResult("Live health", "fail", error instanceof Error ? error.message : "Unable to reach health endpoint.");
  }
}

function cleanup() {
  const tmpPath = join(root, ".backup-readiness.env.tmp");
  if (existsSync(tmpPath)) {
    try {
      unlinkSync(tmpPath);
    } catch {
      // Best effort cleanup only.
    }
  }
}

function printSummary() {
  console.log("Backup readiness check");
  console.log("======================");

  for (const result of results) {
    const marker = result.status === "pass" ? "PASS" : result.status === "warn" ? "WARN" : "FAIL";
    console.log(`${marker} ${result.name}${result.detail ? ` - ${result.detail}` : ""}`);
  }

  const failures = results.filter((result) => result.status === "fail");
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

try {
  checkGit();
  checkSupabase();
  checkVercel();
  await checkHealth();
} finally {
  cleanup();
  printSummary();
}
