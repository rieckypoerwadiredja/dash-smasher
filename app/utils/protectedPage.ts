import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function protectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return session;
}
