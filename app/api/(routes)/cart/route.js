import { auth } from "@/lib/auth";

export async function GET() {
    const session = await auth();

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.user._id;
    // console.log(userId);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        headers: {
            "Content-Type": "application/json",
            "user-id": userId,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        return new Response(text || "Failed to fetch cart", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
}
export async function POST(request) {
    const session = await auth();

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.user._id;

    const body = await request.json();

    // console.log(userId);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
            "user-id": userId,
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        return new Response(text || "Failed to fetch cart", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
}
