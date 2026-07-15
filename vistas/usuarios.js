document.addEventListener("DOMContentLoaded", cargarUsuarios);

async function cargarUsuarios() {

    try {

        const respuesta = await fetch("http://localhost:4000/api/usuarios/lista");

        const datos = await respuesta.json();

        const tabla = document.getElementById("tablaUsuarios");

        tabla.innerHTML = "";

        datos.body.forEach(usuario => {

            tabla.innerHTML += `

                <tr>

                    <td>${usuario.id}</td>

                    <td>
                        ${usuario.tipo_doc}
                        ${usuario.num_doc}
                    </td>

                    <td>
                        ${usuario.nombres}
                        ${usuario.apellidos}
                    </td>

                    <td>${usuario.email}</td>

                    <td>${usuario.telefono}</td>

                    <td>

                        <span class="badge bg-success">
                            Activo
                        </span>

                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editar(${usuario.id})">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminar(${usuario.id})">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

function nuevoUsuario() {

    window.location.href = "nuevo_usuario.html";

}

function editar(id) {

    window.location.href =
        "editar_usuario.html?id=" + id;

}

async function eliminar(id) {

    if (!confirm("¿Desea eliminar este usuario?")) return;

    await fetch("http://localhost:4000/api/usuarios", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: id
        })

    });

    cargarUsuarios();

}