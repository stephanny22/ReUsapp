document.addEventListener("DOMContentLoaded", () => {
    cargarPublicaciones();
});

async function cargarPublicaciones() {
    try {
        const respuesta = await fetch("http://localhost:4000/api/publicacion/publicas");
        const datos = await respuesta.json();

        const contenedor = document.getElementById("listaPublicaciones");
        contenedor.innerHTML = "";

        datos.body.forEach(publicacion => {

            contenedor.innerHTML += `
                <div class="col">
                    <div class="card h-100">

                        <img src="../../img/${publicacion.url_imagen}"
                             class="card-img-top"
                             alt="${publicacion.producto}">

                        <div class="card-body">
                            <h5 class="card-title">${publicacion.titulo}</h5>

                            <p class="card-text">
                                ${publicacion.descripcion}
                            </p>

                            <p><strong>Producto:</strong> ${publicacion.producto}</p>

                            <p><strong>Categoría:</strong> ${publicacion.categoria}</p>

                            <p><strong>Estado:</strong> ${publicacion.estado}</p>

                            <p><strong>Precio:</strong> $${publicacion.precio}</p>

                            <small>
                                Publicado por ${publicacion.nombres} ${publicacion.apellidos}
                            </small>
                        </div>

                        <div class="card-footer">
                            <a href="publicacion.html?id=${publicacion.id}"
                               class="btn btn-primary w-100">
                                Ver más
                            </a>
                        </div>

                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}