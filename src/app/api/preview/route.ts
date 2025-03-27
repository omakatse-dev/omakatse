import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  // Check for a valid slug
  if (!slug) {
    return NextResponse.json(
      { message: "Invalid slug" },
      { status: 401 }
    );
  }

  // Enable Preview Mode (this sets a cookie)
  const res = NextResponse.redirect(`/blog/${slug}`);
  res.cookies.set("preview", "true", { maxAge: 60 * 60 });

  return res;
}
