import { FunctionalComponent } from "preact/src/index.d.ts";
import { useState } from "preact/hooks";
import { Character, Props } from "../utils/types.ts";

const IslaFavoritesCharacters: FunctionalComponent<Props> = (props) => {
  const [ch, setCh] = useState<Character[]>(
    props.data.characters,
  );

  const quitFav = async (c: Character, event: Event) => {
    event.stopPropagation();
    const resp = await fetch("/api/quitarfavorito", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id }),
    });

    if (!resp.ok) {
      alert("Error al quitar favorito");
    } else {
      setCh(ch.filter((pers) => pers.id !== c.id));
      if (ch.length === 1) {
        alert("No tienes favoritos, por favor, añade alguno.");
        document.cookie = "favorites=; Path=/; Max-Age=0"; // Elimina la cookie de favoritos
        globalThis.location.href = "/characters";
      }
    }
  };

  return (
    <div class="containerCharacters">
      <div class="titular">
        <p>
          Usuario: <span>{props.data.username}</span>
        </p>
      </div>
      <div class="characters">
        {ch.map((c) => (
          <div class="character" key={c.id} onClick={() => globalThis.location.href = `/character/${c.id}`} >
            <img src={c.image} alt={c.name} />
            <h3>{c.name}</h3>
            <p>House: <a href={`/house/${c.house}`}>{c.house}</a></p>
            <button type="button" onClick={(e) => quitFav(c, e)}>
              ❌ Quitar de favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslaFavoritesCharacters;
