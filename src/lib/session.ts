import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-me";
const COOKIE_NAME = "sp_session";

export type SessionPayload = {
  userId: number;
  role: "FARMER" | "BUYER" | "ADMIN";
};

function sign(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export async function createSession(payload: SessionPayload) {
  const base = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = sign(base);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${base}.${sig}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const [base, sig] = raw.split(".");
  if (!base || !sig || sign(base) !== sig) return null;

  try {
    return JSON.parse(Buffer.from(base, "base64url").toString());
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
