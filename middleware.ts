import { NextResponse } from "next/server";

export function middleware() {
  const url = "https://open.dosm.gov.my/kawasanku";
  return NextResponse.redirect(url);
}
