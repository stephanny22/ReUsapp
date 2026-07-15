const API = "http://localhost:4000/api/usuarios";

document.addEventListener("DOMContentLoaded", () => {

    cargarUsuarios();

});

async function cargarUsuarios() {

    try {

        const respuesta = await fetch(API + "/lista");

        const datos = await respuesta.json();

        const tabla = document.getElementById("tablaUsuarios");

        tabla.innerHTML = "";

        datos.body.forEach(usuario => {

            tabla.innerHTML += `

                <tr>

                    <td>${usuario.id}</td>

                    <td>

                        ${usuario.tipo_doc}<br>
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
                            class="btn btn-info btn-sm"
                            onclick="verUsuario(${usuario.id})">

                            Ver

                        </button>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editarUsuario(${usuario.id})">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarUsuario(${usuario.id})">

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

function buscarUsuario(){

    let texto=document.getElementById("buscarUsuario").value.toLowerCase();

    let filas=document.querySelectorAll("#tablaUsuarios tr");

    filas.forEach(fila=>{

        if(fila.innerText.toLowerCase().includes(texto)){

            fila.style.display="";

        }else{

            fila.style.display="none";

        }

    });

}

function nuevoUsuario(){

    alert("Abrir formulario para registrar usuario");

}

async function verUsuario(id){

    const respuesta=await fetch(API+"/"+id);

    const datos=await respuesta.json();

    const u=datos.body;

    alert(

        "Nombre: "+u.nombres+" "+u.apellidos+

        "\nCorreo: "+u.email+

        "\nTeléfono: "+u.telefono+

        "\nDirección: "+u.direccion

    );

}

function editarUsuario(id){

    alert("Editar usuario "+id);

}

async function eliminarUsuario(id){

    let confirmar=confirm("¿Eliminar usuario?");

    if(!confirmar) return;

    await fetch(API,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            id:id

        })

    });

    cargarUsuarios();

}