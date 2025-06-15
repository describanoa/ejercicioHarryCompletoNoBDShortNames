import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import IslaFavoritesCharacters from "../../islands/IslaFavoritesCharacters.tsx";
import { getCookieFromHeader } from "../../utils/cookies.ts";
import { Character, State } from "../../utils/types.ts";

export async function handler(req: Request, ctx: FreshContext<State>) {
  const cookHead = req.headers.get("cookie");
  const favsCook = getCookieFromHeader(cookHead, "favorites");
  const favs = favsCook ? favsCook.split(",") : [];

  if(favs.length === 0) {
    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/characters");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  }

  const chAPI = await Axios.get("https://hp-api.onrender.com/api/characters");
  const chs = chAPI.data.filter((c: Character) =>
    favs.includes(c.id)
  );

  return ctx.render({
    username: ctx.state.username,
    characters: chs,
  });
}

export default function Home(props: PageProps<State>) {
  return <IslaFavoritesCharacters data={props.data} />;
}
