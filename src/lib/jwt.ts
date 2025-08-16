// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET!;

// export const signJwtToken = (payload: object, expiresIn = "7d") => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn });
// };

// export const verifyJwtToken = (token: string) => {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     return null;
//   }
// };

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
  [key: string]: unknown;
}

export const signJwtToken = (
  payload: JwtPayload,
  expiresIn: string | number = "7d"
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
};

export const verifyJwtToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("JWT verification failed:", error.message);
    }
    return null;
  }
};
