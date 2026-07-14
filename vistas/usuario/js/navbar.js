document.addEventListener('DOMContentLoaded', () => {
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