document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const ropaForm = document.getElementById('ropa-form');
    const ropaTable = document.querySelector('#ropa-table tbody');

    // ✅ URL del Google Apps Script (Actualizar si cambias la implementación)
    const url = "https://script.google.com/macros/s/AKfycbzsVJC3jlmZVsS2GxOKzUEKHhUwC3JJt0U3JLETRlYRn5BN5DUPIo1bsBwZDADJSRRIQw/exec";

    // ✅ FUNCIÓN DE LOGIN
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loginMessage = document.getElementById('login-message');

            if (username === "1234" && password === "1234") {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "control-ropa.html";  // Redirige al sistema de control de ropa
            } else {
                loginMessage.textContent = "❌ Usuario o contraseña incorrectos";
                loginMessage.style.color = "red";
            }
        });
    }

    // ✅ VALIDAR SI EL USUARIO ESTÁ LOGUEADO EN CONTROL-ROPA.HTML
    if (ropaForm) {
        const loggedIn = localStorage.getItem("loggedIn");
        if (!loggedIn) {
            window.location.href = "login.html";  // Redirige al login si no ha iniciado sesión
        }

        ropaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                nombre: document.getElementById('nombre').value,
                numero: document.getElementById('numero').value,
                equipo: document.getElementById('equipo').value,
                talla: document.getElementById('talla').value,
                precio: document.getElementById('precio').value,
                pagado: document.getElementById('pagado').value,
                entregado: document.getElementById('entregado').value
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert("✅ Datos guardados en Google Sheets correctamente.");
                } else {
                    alert("❌ Error al guardar los datos.");
                }
            } catch (error) {
                alert("❌ Error en la conexión con Google Sheets.");
                console.error("Error:", error);
            }

            ropaTable.innerHTML += `
                <tr>
                    <td>${data.nombre}</td>
                    <td>${data.numero}</td>
                    <td>${data.equipo}</td>
                    <td>${data.talla}</td>
                    <td>${data.precio}</td>
                    <td>${data.pagado}</td>
                    <td>${data.entregado}</td>
                </tr>
            `;

            ropaForm.reset();
        });
    }
});
