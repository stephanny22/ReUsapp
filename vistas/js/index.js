document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("login").addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("correo").value;
        const password = document.getElementById("password").value;

        try {

            const respuesta = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const datos = await respuesta.json();

            if (datos.error) {
                alert(datos.body || "Usuario o contraseña incorrectos");
                return;
            }

            // Guardar el token
            localStorage.setItem("token", datos.body.token);
            localStorage.setItem("usuarioId", datos.body.usuario.id);

            alert("Bienvenido " + datos.body.usuario.nombres);

            if (datos.body.usuario.id_tipo_usuario == 1) {
                window.location.href = "/administrador/paneladmin.html";
            } else {
                window.location.href = "/usuario/inicio.html";
            }

        } catch (error) {
            console.error(error);
            alert("No fue posible conectarse con el servidor.");
        }

    });

});