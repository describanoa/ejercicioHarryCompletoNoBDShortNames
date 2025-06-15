import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { getCookieFromHeader } from "../../../utils/cookies.ts";
import IslaCharacter from "../../../islands/IslaCharacter.tsx";
import { Character, State } from "../../../utils/types.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const { house } = ctx.params;

  const cookHead = req.headers.get("cookie");
  const favsCook = getCookieFromHeader(cookHead, "favorites");
  const favs = favsCook ? favsCook.split(",") : [];

  const casaAPI = await Axios.get(
    `https://hp-api.onrender.com/api/characters/house/${house}`,
  );

  const pers: Character[] = casaAPI.data.map((c: Character) => ({
    ...c,
    favorite: favs.includes(c.id),
  }));

  return ctx.render({
    username: ctx.state.username,
    characters: pers,
  });
}

export default function Home(props: PageProps<State>) {
  return <IslaCharacter data={props.data} />;
}