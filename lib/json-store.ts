import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { head, put } from "@vercel/blob";

function useBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN && process.env.VERCEL);
}

function localPath(key: string): string {
  return join(process.cwd(), "data", key);
}

async function readLocalJson<T>(key: string, fallback: T): Promise<T> {
  await mkdir(join(process.cwd(), "data"), { recursive: true });
  try {
    const raw = await readFile(localPath(key), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeLocalJson<T>(key: string, value: T): Promise<void> {
  await mkdir(join(process.cwd(), "data"), { recursive: true });
  await writeFile(localPath(key), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function readBlobJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const meta = await head(key, { token: process.env.BLOB_READ_WRITE_TOKEN });
    const res = await fetch(meta.url);
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

async function writeBlobJson<T>(key: string, value: T): Promise<void> {
  await put(key, JSON.stringify(value), {
    access: "public",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
    contentType: "application/json",
  });
}

export async function readJsonStore<T>(key: string, fallback: T): Promise<T> {
  if (useBlobStorage()) {
    return readBlobJson(key, fallback);
  }
  return readLocalJson(key, fallback);
}

export async function writeJsonStore<T>(key: string, value: T): Promise<void> {
  if (useBlobStorage()) {
    await writeBlobJson(key, value);
    return;
  }
  await writeLocalJson(key, value);
}
