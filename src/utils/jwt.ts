import jwt from "jsonwebtoken";

// Sign, verify the jwt with secret
const SECRET = process.env.SECRET || "changeme";

export function signJWT(data: object) {
    return jwt.sign(data, SECRET);
}

export function verifyJWT<T>(token: string) {
    return jwt.verify(token, SECRET) as T;
}

// or with public and private keys,
// we could sign jwt with private key
// and verify with public key

// # Public, private keys are much more secure than secret keys
