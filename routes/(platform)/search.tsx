import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import IslaCharacter from "../../islands/IslaCharacter.tsx";
import { getCookieFromHeader } from "../../utils/cookies.ts";
import Buscador from "../../components/Buscador.tsx";
import { Character, State } from "../../utils/types.ts";

export async function handler(req: Request, ctx: FreshContext<State>) {
  const chAPI = await Axios.get(
    "https://hp-api.onrender.com/api/characters",
  );
  const cookHead = req.headers.get("cookie");
  const favsCook = getCookieFromHeader(cookHead, "favorites");
  const favs = favsCook ? favsCook.split(",") : [];

  const url = new URL(req.url);
  const name = url.searchParams.get("name");

  if (!name) {
    return ctx.render({
      username: ctx.state.username,
      characters: [],
    });
  }

  const pers: Character[] = chAPI.data.map((c: Character) => ({
    ...c,
    favorite: favs.includes(c.id),
  }));
  const persName = pers.filter((p) =>
    p.name.toLowerCase().includes(name?.toLowerCase() || "")
  );

  return ctx.render({
    username: ctx.state.username,
    characters: persName,
  });
}
// VER SI SE PUEDE PONER UN MAXIMO DE RETURN EN LA API
export default function Home(props: PageProps<State>) {
  return (
    <>
      <Buscador />
      {props.data.characters.length === 0
        ? (
          null
        )
        : <IslaCharacter data={props.data} />}
    </>
  );
}
