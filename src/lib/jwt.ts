// Edge-compatible JWT using jose library
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
  [key: string]: unknown;
}

// Convert secret string to Uint8Array for jose
const getSecretKey = () => {
  return new TextEncoder().encode(JWT_SECRET || "your_secret_key");
};

// Convert expiresIn string (like "7d", "1h") to seconds
const parseExpiresIn = (expiresIn: string | number): number => {
  if (typeof expiresIn === "number") {
    return expiresIn;
  }

  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (match) {
    const value = parseInt(match[1]);
    const unit = match[2];
    const multipliers: { [key: string]: number } = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    };
    return value * (multipliers[unit] || 1);
  }

  // Default to 7 days if format is unrecognized
  return 604800;
};

export const signJwtToken = async (
  payload: JwtPayload,
  expiresIn: string | number = "7d"
): Promise<string> => {
  const secret = getSecretKey();
  const expiresInSeconds = parseExpiresIn(expiresIn);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresInSeconds)
    .sign(secret);

  return jwt;
};

export const verifyJwtToken = async (
  token: string
): Promise<JwtPayload | null> => {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    return payload as JwtPayload;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("JWT verification failed:", error.message);
    }
    return null;
  }
};
