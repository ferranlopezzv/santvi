document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const eventForm = document.getElementById('eventForm');
    const eventTitleInput = document.getElementById('eventTitle');
    const eventDateInput = document.getElementById('eventDate');
    const monthYearDisplay = document.getElementById('monthYear');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const addPlayerForm = document.getElementById('add-player-form');
    const playerNameInput = document.getElementById('player-name');
    const playerSurnameInput = document.getElementById('player-surname');
    const playerDorsalInput = document.getElementById('player-dorsal');
    const playerList = document.getElementById('player-list');
    const attendanceList = document.getElementById('attendance-list');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let events = JSON.parse(localStorage.getItem('events')) || {};
    let players = JSON.parse(localStorage.getItem('players')) || [];

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const generateCalendar = (month, year) => {
        calendar.innerHTML = `
            <div class="day-name">Domingo</div>
            <div class="day-name">Lunes</div>
            <div class="day-name">Martes</div>
            <div class="day-name">Miércoles</div>
            <div class="day-name">Jueves</div>
            <div class="day-name">Viernes</div>
            <div class="day-name">Sábado</div>
        `;
        const days = daysInMonth(month, year);
        const firstDay = new Date(year, month, 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day');
            calendar.appendChild(emptyDiv);
        }
        for (let i = 1; i <= days; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.dataset.date = dateStr;
            dayDiv.innerHTML = `<div class="day-number">${i}</div><div class="events"></div>`;
            if (events[dateStr]) {
                dayDiv.classList.add('has-event');
                events[dateStr].forEach(event => {
                    addEventToDay(dayDiv, event.title);
                });
            }
            calendar.appendChild(dayDiv);
        }
        updateMonthYearDisplay(month, year);
    };

    const updateMonthYearDisplay = (month, year) => {
        monthYearDisplay.textContent = `${months[month]} ${year}`;
    };

    const addEventToDay = (dayDiv, title) => {
        const eventsDiv = dayDiv.querySelector('.events');
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.textContent = title;
        eventsDiv.appendChild(eventDiv);
    };

    const addEvent = (title, date) => {
        if (!events[date]) {
            events[date] = [];
        }
        events[date].push({ title });
        localStorage.setItem('events', JSON.stringify(events));
        const dayDiv = document.querySelector(`.day[data-date="${date}"]`);
        if (dayDiv) {
            dayDiv.classList.add('has-event');
            addEventToDay(dayDiv, title);
        }
    };

    const addPlayer = (name, surname, dorsal) => {
        const player = { name, surname, dorsal, trainings: 0 };
        players.push(player);
        localStorage.setItem('players', JSON.stringify(players));
        renderPlayers();
        renderAttendance();
    };

    const renderPlayers = () => {
        playerList.innerHTML = '';
        players.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.name}</td>
                <td>${player.surname}</td>
                <td>${player.dorsal}</td>
                <td><button onclick="removePlayer(${index})">Eliminar</button></td>
            `;
            playerList.appendChild(row);
        });
    };

    const renderAttendance = () => {
        attendanceList.innerHTML = '';
        players.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.name}</td>
                <td>${player.surname}</td>
                <td>${player.dorsal}</td>
                <td>${player.trainings}</td>
                <td>
                    <button onclick="incrementTraining(${index})">+</button>
                    <button onclick="decrementTraining(${index})">-</button>
                </td>
            `;
            attendanceList.appendChild(row);
        });
    };

    window.removePlayer = (index) => {
        players.splice(index, 1);
        localStorage.setItem('players', JSON.stringify(players));
        renderPlayers();
        renderAttendance();
    };

    window.incrementTraining = (index) => {
        players[index].trainings += 1;
        localStorage.setItem('players', JSON.stringify(players));
        renderAttendance();
    };

    window.decrementTraining = (index) => {
        if (players[index].trainings > 0) {
            players[index].trainings -= 1;
            localStorage.setItem('players', JSON.stringify(players));
            renderAttendance();
        }
    };

    addPlayerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = playerNameInput.value;
        const surname = playerSurnameInput.value;
        const dorsal = playerDorsalInput.value;
        addPlayer(name, surname, dorsal);
        playerNameInput.value = '';
        playerSurnameInput.value = '';
        playerDorsalInput.value = '';
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = eventTitleInput.value;
        const date = eventDateInput.value;
        addEvent(title, date);
        eventTitleInput.value = '';
        eventDateInput.value = '';
    });

    prevMonthButton.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    generateCalendar(currentMonth, currentYear);
    renderPlayers();
    renderAttendance();
});
