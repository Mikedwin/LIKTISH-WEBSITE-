export class PublicAppError extends Error {
  readonly code: string;
  readonly publicMessage: string;
  readonly statusCode: number;

  constructor({
    code,
    message,
    publicMessage,
    statusCode,
  }: {
    code: string;
    message: string;
    publicMessage: string;
    statusCode: number;
  }) {
    super(message);
    this.name = "PublicAppError";
    this.code = code;
    this.publicMessage = publicMessage;
    this.statusCode = statusCode;
  }
}

export class StorageUnavailableError extends PublicAppError {
  constructor(message = "Lead storage is not configured.") {
    super({
      code: "storage_unavailable",
      message,
      publicMessage:
        "We could not save your request right now. Please try again later or contact LIKTISH directly.",
      statusCode: 503,
    });
    this.name = "StorageUnavailableError";
  }
}

export class SecurityControlUnavailableError extends PublicAppError {
  constructor(message = "Abuse protection storage is not configured.") {
    super({
      code: "security_control_unavailable",
      message,
      publicMessage:
        "We could not verify this request right now. Please try again later or contact LIKTISH directly.",
      statusCode: 503,
    });
    this.name = "SecurityControlUnavailableError";
  }
}

export class BadRequestError extends PublicAppError {
  constructor(message = "Invalid request.") {
    super({
      code: "bad_request",
      message,
      publicMessage: message,
      statusCode: 400,
    });
    this.name = "BadRequestError";
  }
}

export class PayloadTooLargeError extends PublicAppError {
  constructor(message = "Request body is too large.") {
    super({
      code: "payload_too_large",
      message,
      publicMessage: "This request is too large. Please shorten it and try again.",
      statusCode: 413,
    });
    this.name = "PayloadTooLargeError";
  }
}

export class UnsupportedMediaTypeError extends PublicAppError {
  constructor(message = "Content-Type must be application/json.") {
    super({
      code: "unsupported_media_type",
      message,
      publicMessage: "Content-Type must be application/json.",
      statusCode: 415,
    });
    this.name = "UnsupportedMediaTypeError";
  }
}

export class ForbiddenError extends PublicAppError {
  constructor(message = "Forbidden.") {
    super({
      code: "forbidden",
      message,
      publicMessage: message,
      statusCode: 403,
    });
    this.name = "ForbiddenError";
  }
}
