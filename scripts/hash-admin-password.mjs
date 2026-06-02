import { pbkdf2Sync, randomBytes } from "node:crypto";
import { stdin, stdout, stderr, exit } from "node:process";

const ITERATIONS = 310_000;

async function readPasswordFromStdin() {
  if (stdin.isTTY) {
    return "";
  }

  let value = "";

  for await (const chunk of stdin) {
    value += chunk;
  }

  return value.trim();
}

const password = process.argv[2] ?? (await readPasswordFromStdin());

if (!password) {
  stderr.write("Usage: npm run admin:hash-password -- <password>\n");
  stderr.write("Or pipe a password into: node scripts/hash-admin-password.mjs\n");
  exit(1);
}

const salt = randomBytes(16).toString("base64url");
const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256").toString("base64url");

stdout.write(`pbkdf2_sha256$${ITERATIONS}$${salt}$${hash}\n`);
