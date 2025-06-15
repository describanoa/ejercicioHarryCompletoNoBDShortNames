import { FunctionalComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";


const IslaLogin: FunctionalComponent = () => {
    const usSi = new Signal<string>("");
    const paSi = new Signal<string>("");

    const funLog = (e: Event) => {
        e.preventDefault();

        if(usSi.value.trim() === "" || paSi.value.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        else {
            if(paSi.value === "1234" && usSi.value) {
                document.cookie = `username=${usSi.value}; Path=/`;
                globalThis.location.href = "/characters";
            }
            else {
                usSi.value = "";
                paSi.value = "";
                alert("Usuario o contraseña incorrectos");
            }
        }
    };

    return (
        <div class="login">
            <form>
                <label>Username: </label>
                <input type="text" placeholder="Username..." value={usSi} onInput={(e) => usSi.value = e.currentTarget.value} />
                <br />
                <label>Password: </label>
                <input type="password" placeholder="Password..." value={paSi} onInput={(e) => paSi.value = e.currentTarget.value} />
                <br />
                <button type="submit" onClick={funLog}>Login</button>
            </form>
        </div>
    );
}
export default IslaLogin;