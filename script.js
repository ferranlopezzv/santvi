const ropaForm = document.getElementById('ropa-form');
const ropaTableBody = document.querySelector('#ropa-table tbody');
const entregadoBtn = document.getElementById('entregado-btn');
let selectedRowIndex = null;

// Load saved data from localStorage
function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('ropaData')) || [];
    savedData.forEach((item, index) => {
        addRowToTable(item, index);
    });
}

// Add a row to the table
function addRowToTable(data, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.nombre}</td>
        <td>${data.numero}</td>
        <td>${data.telefono}</td>
        <td>${data.ropa}</td>
        <td>${data.precio}</td>
        <td>${data.pagado}</td>
        <td class="entregado-cell"></td>
        <td>
            <button class="select-btn" data-index="${index}">Seleccionar</button>
        </td>
    `;
    ropaTableBody.appendChild(row);
}

// Save data to localStorage
function saveDataToLocalStorage(data) {
    localStorage.setItem('ropaData', JSON.stringify(data));
}

// Form submission
ropaForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre').value,
        numero: document.getElementById('numero').value,
        telefono: document.getElementById('telefono').value,
        ropa: document.getElementById('ropa').value,
        precio: document.getElementById('precio').value,
        pagado: document.getElementById('pagado').value,
    };
    const savedData = JSON.parse(localStorage.getItem('ropaData')) || [];
    savedData.push(data);
    saveDataToLocalStorage(savedData);
    addRowToTable(data, savedData.length - 1);
    ropaForm.reset();
});

// Handle row selection
ropaTableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('select-btn')) {
        selectedRowIndex = e.target.dataset.index;
        entregadoBtn.disabled = false;
    }
});

// Mark as delivered
entregadoBtn.addEventListener('click', function () {
    if (selectedRowIndex !== null) {
        const savedData = JSON.parse(localStorage.getItem('ropaData')) || [];
        const row = ropaTableBody.children[selectedRowIndex];
        const entregadoCell = row.querySelector('.entregado-cell');
        entregadoCell.innerHTML = `
            <img src="https://static.vecteezy.com/system/resources/thumbnails/011/858/556/small_2x/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png" alt="Entregado">
        `;
        savedData[selectedRowIndex].entregado = true;
        saveDataToLocalStorage(savedData);
        entregadoBtn.disabled = true;
        selectedRowIndex = null;
    }
});

// Load initial data
loadSavedData();
