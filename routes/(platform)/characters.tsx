import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import IslaCharacter from "../../islands/IslaCharacter.tsx";
import { getCookieFromHeader } from "../../utils/cookies.ts";
import { Character, State } from "../../utils/types.ts";

export async function handler(req: Request, ctx: FreshContext<State>) {
  const chAPI = await Axios.get("https://hp-api.onrender.com/api/characters");
  const cookHead = req.headers.get("cookie");
  const favCook = getCookieFromHeader(cookHead, "favorites");
  const favs = favCook ? favCook.split(",") : [];

  const ch: Character[] = chAPI.data.map((c: Character) => ({
    ...c,
    favorite: favs.includes(c.id),
  }));

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 21;
  const tPages = Math.ceil(ch.length / limit);

  const inicio = (page - 1) * limit;
  const fin = inicio + limit;
  const chPags = ch.slice(inicio, fin);

  return ctx.render({
    username: ctx.state.username,
    characters: chPags,
    page,
    tPages,
  });
}

export default function Home(props: PageProps<State>) {
  const { page, tPages } = props.data;

  return (
    <>
      <IslaCharacter data={props.data} />
      <div class="pagination">
        {page > 1 && (
          <a href={`/characters?page=${page - 1}`} class="pagination-button">
            Previous
          </a>
        )}
        {page < tPages && (
          <a href={`/characters?page=${page + 1}`} class="pagination-button">
            Next
          </a>
        )}
      </div>
    </>
  );
}