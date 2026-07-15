document.addEventListener("DOMContentLoaded", async () => {

    const id = localStorage.getItem("usuarioId");

    if (!id) {
        alert("No hay sesión iniciada");
        return;
    }

    try {

        const respuesta = await fetch(
            `http://localhost:4000/api/usuarios/${id}`
        );

        const datos = await respuesta.json();

        cargarPerfil(datos.body);

    } catch(error) {
        console.error(error);
    }

});


function cargarPerfil(usuario) {

    document.querySelector(".list-group").innerHTML = `

        <li class="list-group-item">
            Tipo de documento: ${usuario.tipo_doc}
        </li>

        <li class="list-group-item">
            Número de documento: ${usuario.num_doc}
        </li>

        <li class="list-group-item">
            Nombres: ${usuario.nombres}
        </li>

        <li class="list-group-item">
            Apellidos: ${usuario.apellidos}
        </li>

        <li class="list-group-item">
            Email: ${usuario.email}
        </li>

        <li class="list-group-item">
            Teléfono: ${usuario.telefono}
        </li>

        <li class="list-group-item">
            Dirección: ${usuario.direccion}
        </li>

        <li class="list-group-item">
            Fecha de nacimiento: ${usuario.fecha_nacimiento}
        </li>

        <li class="list-group-item">
            Género: ${usuario.genero}
        </li>
    `;
}