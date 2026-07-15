document.addEventListener("DOMContentLoaded", cargarPublicacion);
async function cargarPublicacion() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
console.log("Este es el id:"+id);
    try {

        const respuesta = await fetch(
            `http://localhost:4000/api/publicacion/detalle/${id}`
        );

        const datos = await respuesta.json();

        const publicacion = datos.body;

        // A partir de aquí ya puedes usar publicacion

        document.getElementById("tituloProducto").textContent =
            publicacion.titulo;

        document.getElementById("descripcionProducto").textContent =
            publicacion.descripcion;

        document.getElementById("precioProducto").textContent =
            publicacion.precio;

        document.getElementById("estadoProducto").textContent =
            publicacion.estado;

        document.getElementById("categoriaProducto").textContent =
            publicacion.categoria;

        document.getElementById("subcategoriaProducto").textContent =
            publicacion.subcategoria;

        document.getElementById("duenoProducto").textContent =
            publicacion.nombres + " " + publicacion.apellidos;

        document.getElementById("imagenProducto").src =
            "../../img/" + publicacion.url_imagen;
            document.getElementById("btnSolicitud").href =
    `solicitud.html?id=${id}`;

    } catch (error) {
        console.error(error);
    }
}