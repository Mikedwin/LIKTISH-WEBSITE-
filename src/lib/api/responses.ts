import { NextResponse } from "next/server";
import { PublicAppError } from "@/lib/errors";

type ApiResponseInit = {
  requestId: string;
  status?: number;
  headers?: HeadersInit;
};

export function jsonSuccess(
  body: { message: string; [key: string]: unknown },
  { requestId, status = 200, headers }: ApiResponseInit,
) {
  return NextResponse.json(
    {
      ok: true,
      code: "ok",
      requestId,
      ...body,
    },
    {
      status,
      headers: {
        "X-Request-Id": requestId,
        ...headers,
      },
    },
  );
}

export function jsonError({
  code,
  message,
  requestId,
  status,
  headers,
}: {
  code: string;
  message: string;
  requestId: string;
  status: number;
  headers?: HeadersInit;
}) {
  return NextResponse.json(
    {
      ok: false,
      code,
      error: message,
      requestId,
    },
    {
      status,
      headers: {
        "X-Request-Id": requestId,
        ...headers,
      },
    },
  );
}

export function handleApiError(error: unknown, route: string, requestId: string) {
  if (error instanceof PublicAppError) {
    console.error(`[${route}] [${requestId}] ${error.code}: ${error.message}`);
    return jsonError({
      code: error.code,
      message: error.publicMessage,
      requestId,
      status: error.statusCode,
    });
  }

  if (error instanceof SyntaxError) {
    return jsonError({
      code: "invalid_json",
      message: "Invalid request body.",
      requestId,
      status: 400,
    });
  }

  console.error(`[${route}] [${requestId}] Unexpected API error`, error);
  return jsonError({
    code: "internal_error",
    message: "Something went wrong. Please try again later.",
    requestId,
    status: 500,
  });
}

export async function runAfterLeadSaved(route: string, action: () => Promise<unknown>) {
  try {
    await action();
  } catch (error) {
    console.error(`[${route}] Lead saved but follow-up action failed`, error);
  }
}
