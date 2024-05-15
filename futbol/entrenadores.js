document.addEventListener("DOMContentLoaded", function() {
    var subteamSelect = document.getElementById("subteam-select");
    var teamSelect = document.getElementById("team-select");

    // Define los subequipos para cada equipo
    var subteams = {
        "alevin": ["Alevín A", "Alevín B", "Alevín C", "Alevín D"],
        "infantil": ["Infantil A", "Infantil B", "Infantil C"],
        "cadete": ["Cadete A", "Cadete B"]
    };

    // Define las páginas correspondientes para cada subequipo
    var pages = {
        "alevin-a": "alevinA.html",
        "alevin-b": "alevinB.html",
        "alevin-c": "alevinC.html",
        "alevin-d": "alevinD.html",
        "infantil-a": "infantilA.html",
        "infantil-b": "infantilB.html",
        "infantil-c": "infantilC.html",
        "cadete-a": "cadeteA.html",
        "cadete-b": "cadeteB.html"
    };

    // Función para actualizar los subequipos cuando se cambia el equipo
    function updateSubteams() {
        var selectedTeam = teamSelect.value;
        subteamSelect.innerHTML = ""; // Limpiar opciones anteriores

        subteams[selectedTeam].forEach(function(subteam) {
            var option = document.createElement("option");
            option.textContent = subteam;
            option.value = subteam.toLowerCase().replace(/\s+/g, "-"); // Convierte el nombre en minúsculas y reemplaza espacios con guiones
            subteamSelect.appendChild(option);
        });
    }

    // Llama a la función una vez al cargar la página para inicializar los subequipos
    updateSubteams();

    // Evento que se activa al cambiar el equipo
    teamSelect.addEventListener("change", updateSubteams);

    // Evento que se activa al enviar el formulario
    document.getElementById("enter-team-button").addEventListener("click", function() {
        // Obtener la opción seleccionada en el segundo select
        var selectedSubteam = subteamSelect.value;

        // Redirigir a la página correspondiente
        window.location.href = pages[selectedSubteam];
    });

    // Automatización del carrusel de imágenes
    var carouselSlide = document.querySelector('.carousel-slide');
    var images = document.querySelectorAll('.carousel-slide img');

    var interval = 5000; // Cambiar de imagen cada 5 segundos
    var index = 0;

    setInterval(function() {
        index = (index + 1) % images.length;
        carouselSlide.style.transform = 'translateX(' + (-index * 100) + '%)';
    }, interval);
});
