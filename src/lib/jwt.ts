// // Edge-compatible JWT using jose library
// import { SignJWT, jwtVerify } from "jose";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined");
// }

// interface JwtPayload {
//   [key: string]: unknown;
// }

// // Convert secret string to Uint8Array for jose
// const getSecretKey = () => {
//   return new TextEncoder().encode(JWT_SECRET || "your_secret_key");
// };

// // Convert expiresIn string (like "7d", "1h") to seconds
// const parseExpiresIn = (expiresIn: string | number): number => {
//   if (typeof expiresIn === "number") {
//     return expiresIn;
//   }

//   const match = expiresIn.match(/^(\d+)([smhd])$/);
//   if (match) {
//     const value = parseInt(match[1]);
//     const unit = match[2];
//     const multipliers: { [key: string]: number } = {
//       s: 1,
//       m: 60,
//       h: 3600,
//       d: 86400,
//     };
//     return value * (multipliers[unit] || 1);
//   }

//   // Default to 7 days if format is unrecognized
//   return 604800;
// };

// export const signJwtToken = async (
//   payload: JwtPayload,
//   expiresIn: string | number = "7d"
// ): Promise<string> => {
//   const secret = getSecretKey();
//   const expiresInSeconds = parseExpiresIn(expiresIn);

//   const jwt = await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime(Math.floor(Date.now() / 1000) + expiresInSeconds)
//     .sign(secret);

//   return jwt;
// };

// export const verifyJwtToken = async (
//   token: string
// ): Promise<JwtPayload | null> => {
//   try {
//     const secret = getSecretKey();
//     const { payload } = await jwtVerify(token, secret);
//     return payload as JwtPayload;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("JWT verification failed:", error.message);
//     }
//     return null;
//   }
// };

// import { SignJWT, jwtVerify } from "jose";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined");
// }

// const secret = new TextEncoder().encode(JWT_SECRET);

// export const signJwtToken = async (
//   payload: Record<string, unknown>,
//   expiresIn: string = "7d"
// ): Promise<string> => {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime(expiresIn)
//     .sign(secret);
// };

// export const verifyJwtToken = async (
//   token: string
// ): Promise<Record<string, unknown> | null> => {
//   try {
//     const { payload } = await jwtVerify(token, secret, {
//       algorithms: ["HS256"],
//     });

//     return payload;
//   } catch (error) {
//     console.error("JWT verification failed");
//     return null;
//   }
// };

// import { SignJWT, jwtVerify } from "jose";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined");
// }

// const secret = new TextEncoder().encode(JWT_SECRET);

// /**
//  * Sign JWT Token
//  */
// export const signJwtToken = async (
//   payload: Record<string, unknown>,
//   expiresIn: string = "7d"
// ): Promise<string> => {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime(expiresIn)
//     .sign(secret);
// };

// /**
//  * Verify JWT Token
//  */
// export const verifyJwtToken = async (
//   token: string
// ): Promise<Record<string, unknown> | null> => {
//   try {
//     const { payload } = await jwtVerify(token, secret, {
//       algorithms: ["HS256"],
//     });

//     return payload;
//   } catch {
//     // Token invalid / expired
//     return null;
//   }
// };

// import { SignJWT, jwtVerify } from "jose";

// /**
//  * Get secret safely (works in middleware)
//  */
// const getSecret = () => {
//   const JWT_SECRET = process.env.JWT_SECRET;

//   if (!JWT_SECRET) {
//     throw new Error("JWT_SECRET is not defined");
//   }

//   return new TextEncoder().encode(JWT_SECRET);
// };

// /**
//  * Sign JWT Token
//  */
// export const signJwtToken = async (
//   payload: Record<string, unknown>,
//   expiresIn: string = "7d",
// ): Promise<string> => {
//   const secret = getSecret();

//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime(expiresIn)
//     .sign(secret);
// };

// /**
//  * Verify JWT Token
//  */
// export const verifyJwtToken = async (
//   token: string,
// ): Promise<Record<string, unknown> | null> => {
//   try {
//     const secret = getSecret();

//     const { payload } = await jwtVerify(token, secret, {
//       algorithms: ["HS256"],
//     });

//     return payload;
//   } catch {
//     return null;
//   }
// };

// src/lib/jwt.ts
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signJwtToken(
  payload: Record<string, unknown>,
  expiresIn: string,
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

// src/lib/jwt.ts
// import { SignJWT } from "jose";

// export async function signJwtToken(payload: any, expiresIn: string) {
//   const secretKey = process.env.JWT_SECRET;

//   if (!secretKey) {
//     throw new Error("JWT_SECRET is not defined in environment variables");
//   }

//   const secret = new TextEncoder().encode(secretKey);

//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setExpirationTime(expiresIn)
//     .setIssuedAt()
//     .sign(secret);
// }
