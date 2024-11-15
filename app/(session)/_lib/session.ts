import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const algorithm = "HS256";

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt });

	cookies().set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export function deleteSession() {
	cookies().delete("session");
}

export async function encrypt(payload: any) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: algorithm })
		.setIssuedAt()
		.setExpirationTime("1d")
		.sign(encodedKey);
}

export async function decrypt(session: string | undefined = ""): Promise<any> {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: [algorithm],
		});

		return payload;
	} catch (error) {
		console.log("User has failed to authenticate...");
	}
}
