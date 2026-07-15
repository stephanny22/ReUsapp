document.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos(){

    try{

        const respuesta =
        await fetch("http://localhost:4000/api/producto/lista");

        const datos=await respuesta.json();

        const tabla=document.getElementById("tablaProductos");

        tabla.innerHTML="";

        datos.body.forEach(producto=>{

            tabla.innerHTML+=`

            <tr>

                <td>

                    <img
                    src="../img/${producto.url_imagen}"
                    width="70">

                </td>

                <td>${producto.nombre}</td>

                <td>${producto.categoria}</td>

                <td>

                    ${producto.nombres}
                    ${producto.apellidos}

                </td>

                <td>${producto.estado}</td>

                <td>

                    <button
                    class="btn btn-info btn-sm">

                    Ver

                    </button>

                    <button
                    class="btn btn-warning btn-sm">

                    Editar

                    </button>

                    <button
                    class="btn btn-danger btn-sm">

                    Eliminar

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}