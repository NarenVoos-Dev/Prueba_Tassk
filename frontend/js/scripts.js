$(document).ready(function () {
    session()
    const API_URL = 'http://localhost:5000/tasks';
   
    //Iniciar sesion 

    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            url: API_URL,
            type: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            },
            success: function () {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                window.location = 'task.html';
            },
            error: function () {
                $('#login-error').text('Credenciales incorrectas. Inténtalo de nuevo.');
            }
        });
    });

});

function session() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    // Verifica que el username y password no sean null o vacíos
    if (username && password) {
        window.location = 'task.html';
    } 
}