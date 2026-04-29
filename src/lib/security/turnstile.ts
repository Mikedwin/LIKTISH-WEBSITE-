import "server-only";

function getTurnstileConfig() {
  return {
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
    secretKey: process.env.TURNSTILE_SECRET_KEY ?? "",
  };
}

export function hasTurnstileConfig() {
  const config = getTurnstileConfig();
  return Boolean(config.siteKey && config.secretKey);
}

export function getTurnstileSiteKey() {
  return getTurnstileConfig().siteKey;
}

export async function verifyTurnstileToken(
  token: string | undefined,
  ipAddress?: string,
): Promise<boolean> {
  const { secretKey } = getTurnstileConfig();

  if (!secretKey) {
    return true;
  }

  if (!token) {
    return false;
  }

  const payload = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (ipAddress) {
    payload.set("remoteip", ipAddress);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}
