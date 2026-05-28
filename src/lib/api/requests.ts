import { randomUUID } from "node:crypto";
import {
  BadRequestError,
  PayloadTooLargeError,
  UnsupportedMediaTypeError,
} from "@/lib/errors";

const REQUEST_ID_HEADER = "x-request-id";

export function getRequestId(request: Request) {
  const fromHeader = request.headers.get(REQUEST_ID_HEADER)?.trim();

  if (fromHeader && /^[a-zA-Z0-9_.:-]{8,100}$/.test(fromHeader)) {
    return fromHeader;
  }

  return randomUUID();
}

export function getLeadMetadata(request: Request, requestId: string, sourcePath: string) {
  return {
    requestId,
    sourcePath,
    sourcePageUrl: request.headers.get("referer") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
  };
}

export async function readJsonObjectRequest(
  request: Request,
  {
    maxBytes,
  }: {
    maxBytes: number;
  },
) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new UnsupportedMediaTypeError();
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxBytes) {
    throw new PayloadTooLargeError();
  }

  const rawBody = await request.text();

  if (new TextEncoder().encode(rawBody).byteLength > maxBytes) {
    throw new PayloadTooLargeError();
  }

  const parsed = JSON.parse(rawBody) as unknown;

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new BadRequestError("Request body must be a JSON object.");
  }

  return parsed as Record<string, unknown>;
}
