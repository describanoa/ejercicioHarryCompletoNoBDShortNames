import { FunctionalComponent } from "preact/src/index.d.ts";
import { PropsUser } from "../utils/types.ts";

const IslaProfile: FunctionalComponent<PropsUser> = (props) => {
  const logOut = (e: Event) => {
    e.preventDefault();
    document.cookie = "username=; Path=/; Max-Age=0"; // Elimina la cookie
    document.cookie = "favorites=; Path=/; Max-Age=0"; // Elimina la cookie
    globalThis.location.href = "/login"; // Redirige a la página de login
  };

  return (
    <div class="profile">
      <p>Username: <span>{props.data.username}</span></p>
      <button type="submit" onClick={logOut}>Cerrar sesión</button>
    </div>
  );
};

export default IslaProfile;