document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("registro").addEventListener("submit", async (e) => {

        e.preventDefault();

        const usuario = {
            tipo_doc: document.getElementById("tipo_doc").value,
            num_doc: document.getElementById("num_doc").value,
            nombres: document.getElementById("nombres").value,
            apellidos: document.getElementById("apellidos").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value,
            direccion: document.getElementById("direccion").value,
            fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
            genero: document.getElementById("genero").value,
            contrasenia: document.getElementById("password").value,
            id_tipo_usuario: 2
        };

        try {

            const respuesta = await fetch("http://localhost:4000/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            const datos = await respuesta.json();

            if (datos.error) {
                alert(datos.body);
                return;
            }

            alert("Usuario registrado correctamente");
            window.location.href = "index.html";

        } catch (error) {

            console.error(error);
            alert("No fue posible conectarse con el servidor.");

        }

    });

});