import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function serverApi(method,req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id; // ✅ SAFE
    const reqBody = JSON.stringify(await req.json());

    // Forward request to Express
    const res = await fetch(`${process.env.API_URL}/products`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "x-user-id": userId, // trusted (server → server)
        },
        if(reqBody) {
            body: reqBody
        }
    });

    return res;
}
