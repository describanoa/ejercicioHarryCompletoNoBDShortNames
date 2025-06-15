import { FreshContext } from "$fresh/server.ts";
import { StateUser } from "../../utils/types.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<StateUser>,
) {
  const cookie = req.headers.get("cookie") || "";
  if (!cookie.includes("username=")) {
    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  } else if (cookie.includes("username=")) {
    const cookies = cookie.split(";").map(c => c.trim());
    const userCook = cookies.find(c => c.startsWith("username="));
    if (userCook) ctx.state.username = userCook.split("=")[1];
    const resp = await ctx.next();
    return resp;
  }
}