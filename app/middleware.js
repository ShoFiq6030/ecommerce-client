import { auth } from "@/src/lib/auth";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const session = await auth();

    if (!session) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/cart/:path*"],
};
