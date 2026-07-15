document.getElementById("login").addEventListener("submit", function (event) {

            event.preventDefault();

            var correo = document.getElementById("correo").value;
            var clave = document.getElementById("clave").value;

            if (correo == "admin@reusapp.com" && clave == "admin123") {

                alert("Bienvenido Administrador");
                window.location.href = "/administrador/paneladmin.html";

            } else {

                alert("Correo o contraseña incorrectos");

            }

        });