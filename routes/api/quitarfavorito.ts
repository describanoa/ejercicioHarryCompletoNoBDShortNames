import { getCookieFromHeader } from "../../utils/cookies.ts";

export async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await req.json();
  const { id } = body;

  const cookHead = req.headers.get("cookie");
  const favsCook = getCookieFromHeader(cookHead, "favorites");
  const favs = favsCook ? favsCook.split(",") : [];

  const newFavs = favs.filter((favId) => favId !== id);

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `favorites=${newFavs.join(",")}; Path=/; Max-Age=604800`, // Cookie válida por 7 días
  );

  return new Response(JSON.stringify({ message: "Favorito eliminado" }), {
    status: 200,
    headers,
  });
}