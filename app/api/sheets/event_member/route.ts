import { NextResponse } from "next/server";
import {
  getEventMembersByEmail,
  addEventMember,
} from "@/app/services/eventMember.service";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email") ?? "";

  const result = await getEventMembersByEmail(email);

  if (!result.success) {
    return NextResponse.json(
      { error: result.message, data: result.data },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { data: result.data, message: result.message },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await addEventMember(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.message, data: result.data },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { data: result.data, message: result.message },
    { status: result.status }
  );
}
