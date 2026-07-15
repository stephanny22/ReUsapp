document.getElementById("formSolicitud")
    .addEventListener("submit", enviarSolicitud);

async function enviarSolicitud(e) {

    e.preventDefault();

    const idUsuario = localStorage.getItem("usuarioId");

    const idPublicacion =
        new URLSearchParams(window.location.search).get("id");

    const cantidad =
        document.getElementById("cantidad").value;

    let producto = {};

    if (document.getElementById("check_creado").checked) {

        producto.tipo = "existente";
        producto.id =
            document.getElementById("productoExistente").value;

    } else {

        producto.tipo = "nuevo";

        producto.nombre =
            document.getElementById("nombreProducto").value;

        producto.precio =
            document.getElementById("precioProducto").value;

        producto.descripcion =
            document.getElementById("descripcionProducto").value;

        producto.estado =
            document.getElementById("estadoProducto").value;


        const imagen =
            document.getElementById("imagenProducto").files[0];

        producto.url_imagen =
            imagen ? imagen.name : "sin_imagen.jpg";


        producto.idSubcategoria =
            document.getElementById("subcategoriaProducto").value;
    }

    const respuesta = await fetch(
        "http://localhost:4000/api/intercambio/solicitud",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                idUsuario,
                idPublicacion,
                cantidad,
                producto

            })
        }
    );

    const datos = await respuesta.json();

    if (respuesta.ok) {

        alert("Solicitud añadida correctamente");

        window.location.href = "inicio.html";

    } else {

        alert(datos.body || "Ocurrió un error al enviar la solicitud");

    }
    alert(datos.body);

}