document.addEventListener('DOMContentLoaded', () => {
        cerrarSesion();
    cargarCategorias();
});

async function cargarCategorias() {
    try {
        const respuesta = await fetch('http://localhost:4000/api/categoria');
        const datos = await respuesta.json();

        const lista = document.getElementById('listaCategorias');

        lista.innerHTML = datos.body.map(categoria => `
            <li>
                <a class="dropdown-item" href="#">
                    ${categoria.nombre}
                </a>
            </li>
        `).join('');

    } catch (error) {
        console.error(error);
    }
}

//Cerrar sesión
function cerrarSesion(){

    const boton = document.getElementById("cerrarSesion");

    if(boton){

        boton.addEventListener("click", function(e){

            e.preventDefault();

            //Eliminar datos guardados del usuario
            localStorage.removeItem("token");
            localStorage.removeItem("usuarioId");

            alert("Sesión cerrada correctamente");

            //Enviar al login
            window.location.href = "../../index.html";
        });

    }
}