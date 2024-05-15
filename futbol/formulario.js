document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'german' && password === '1234') {
        window.location.href = 'entrenadores.html';
    } else if (username === 'ferran' && password === '1234') {
        window.location.href = 'futbol/santvi.html';
    } else {
        alert('Invalid username or password.');
    }
});
