"use server";

import { cookies } from "next/headers";
import { decrypt } from "../(session)/_lib/session";

export async function getSessionData() {
	const encryptedSessionData = cookies().get("session")?.value;
	if (encryptedSessionData == null) {
		return null;
	}
	const decryptedSessionData = await decrypt(encryptedSessionData);
	return { userId: decryptedSessionData.userId };
}
