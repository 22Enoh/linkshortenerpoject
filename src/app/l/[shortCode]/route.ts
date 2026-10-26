import { NextResponse } from "next/server";
import { getLinkByShortCode } from "@/data/links";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  const { shortCode } = await params;
  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    return new NextResponse("Link not found", { status: 404 });
  }

  return NextResponse.redirect(link.url, 307);
}
