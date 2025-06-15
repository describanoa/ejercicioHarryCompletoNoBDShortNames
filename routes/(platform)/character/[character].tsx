import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import ComponenteCharacter from "../../../components/ComponenteCharacter.tsx";
import { StateID } from "../../../utils/types.ts";

export async function handler(
  _req: Request,
  ctx: FreshContext<StateID>,
) {
  const { character } = ctx.params;

  // Obtener los personajes de la casa desde la API
  const chAPI = await Axios.get(
    `https://hp-api.onrender.com/api/character/${character}`,
  );

  return ctx.render({
    username: ctx.state.username,
    characters: chAPI.data[0],
  });
}

export default function Home(props: PageProps<StateID>) {
  return <ComponenteCharacter data={props.data} />;
}