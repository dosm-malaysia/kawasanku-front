import { NextResponse } from "next/server";

export function middleware() {
  const url = "https://open.dosm.gov.my/dashboard/kawasanku";
  return NextResponse.redirect(url);
}
