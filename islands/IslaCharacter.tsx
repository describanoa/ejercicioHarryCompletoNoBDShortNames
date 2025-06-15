import { FunctionalComponent } from "preact/src/index.d.ts";
import { useState } from "preact/hooks";
import { Character, Props } from "../utils/types.ts";

const IslaCharacter: FunctionalComponent<Props> = (props) => {
  const [ch, setCh] = useState<Character[]>(
    props.data.characters,
  );

  const addFav = async (c: Character, event: Event) => {
    event.stopPropagation(); // Evita que el evento se propague al div
    const resp = await fetch("/api/nuevofavorito", {
      method: "POST",
      body: JSON.stringify({ id: c.id }),
    });

    if (!resp.ok) {
      alert("Error al añadir favorito");
    } else {
      setCh(
        ch.map((pers) =>
          pers.id === c.id ? { ...pers, favorite: true } : pers
        ),
      );
    }
  };

  const quitFav = async (c: Character, event: Event) => {
    event.stopPropagation(); // Evita que el evento se propague al div
    const resp = await fetch("/api/quitarfavorito", {
      method: "POST",
      body: JSON.stringify({ id: c.id }),
    });

    if (!resp.ok) {
      alert("Error al quitar favorito");
    } else {
      setCh(
        ch.map((pers) =>
          pers.id === c.id ? { ...pers, favorite: false } : pers
        ),
      );
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
          <div
            class="character"
            key={c.id}
            onClick={() => globalThis.location.href = `/character/${c.id}`}
          >
            <img src={c.image} alt={c.name} />
            <h3>{c.name}</h3>
            <p>House: <a href={`/house/${c.house}`}>{c.house}</a></p>
            {!c.favorite
              ? (
                <button
                  type="button"
                  onClick={(event) => addFav(c, event)}
                >
                  ⭐️ Añadir a favoritos
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={(event) => quitFav(c, event)}
                >
                  ❌ Quitar de favoritos
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslaCharacter;
