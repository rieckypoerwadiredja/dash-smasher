import { google } from "googleapis";

export async function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  // Debug: log whether env vars exist (don't log actual values for security)
  // console.log("[sheets] GOOGLE_CLIENT_EMAIL exists:", !!clientEmail);
  // console.log("[sheets] GOOGLE_PRIVATE_KEY exists:", !!rawKey);
  // console.log("[sheets] GOOGLE_PRIVATE_KEY length:", rawKey?.length ?? 0);
  // console.log("[sheets] Key starts with:", rawKey?.substring(0, 30));

  if (!clientEmail || !rawKey) {
    throw new Error(
      `Missing env vars: GOOGLE_CLIENT_EMAIL=${!!clientEmail}, GOOGLE_PRIVATE_KEY=${!!rawKey}`,
    );
  }

  // Replace escaped newlines with actual newlines
  const privateKey = rawKey.replace(/\\n/g, "\n");

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}
