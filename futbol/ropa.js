document.addEventListener('DOMContentLoaded', () => {
    // Variables para el formulario de añadir jugador
    const playerForm = document.getElementById('player-form');
    const categorySelect = document.getElementById('category');
    const teamSelect = document.getElementById('team');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const jerseyInput = document.getElementById('jersey');
    const shortsInput = document.getElementById('shorts');
    const socksInput = document.getElementById('socks');

    // Variables para las tablas de jugadores
    const benjaminTable = document.getElementById('benjamin-table');
    const alevinTable = document.getElementById('alevin-table');
    const infantilTable = document.getElementById('infantil-table');

    // Función para añadir un nuevo jugador
    const addPlayer = (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores del formulario
        const category = categorySelect.value;
        const team = teamSelect.value;
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const jersey = jerseyInput.value.trim();
        const shorts = shortsInput.value.trim();
        const socks = socksInput.value.trim();

        // Validar que se haya ingresado un nombre y apellidos
        if (!firstName || !lastName) {
            alert('Por favor, introduce el nombre y los apellidos del jugador.');
            return;
        }

        // Crear la fila para el nuevo jugador
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${jersey}</td>
            <td>${shorts}</td>
            <td>${socks}</td>
            <td><input type="checkbox"></td>
            <td><button class="delete-btn">Eliminar</button></td>
        `;

        // Determinar a qué tabla se debe añadir el jugador
        let targetTable;
        switch (category) {
            case 'benjamin':
                targetTable = benjaminTable.querySelector('tbody');
                break;
            case 'alevin':
                targetTable = alevinTable.querySelector('tbody');
                break;
            case 'infantil':
                targetTable = infantilTable.querySelector('tbody');
                break;
            default:
                return;
        }

        // Añadir la nueva fila a la tabla correspondiente
        targetTable.appendChild(newRow);

        // Limpiar los campos del formulario
        playerForm.reset();
    };

    // Evento para añadir un jugador cuando se envía el formulario
    playerForm.addEventListener('submit', addPlayer);

    // Evento para eliminar un jugador
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            event.target.closest('tr').remove();
        }
    });
});
