import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { defineConfig } from "prisma/config";

let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
      if (match) databaseUrl = match[1];
    }
  } catch {}
}

export default defineConfig({
  datasource: {
    url: databaseUrl,
  },
});
