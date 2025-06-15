import { FreshContext, PageProps } from "$fresh/server.ts";
import IslaProfile from "../../islands/IslaProfile.tsx";
import { StateUser } from "../../utils/types.ts";

export function handler(
  _req: Request,
  ctx: FreshContext<StateUser>,
) {

  return ctx.render({
    username: ctx.state.username,
  });
}
// VER SI SE PUEDE PONER UN MAXIMO DE RETURN EN LA API
export default function Home(props: PageProps<StateUser>) {
  return <IslaProfile data={props.data} />
}
