$(document).ready(function(){
    loadTasks()
    
})
const API_URL = 'http://localhost:5000/tasks';
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

function Session(username,password){
    if(username =='' && password ==''){
        window.location='index.html'
    }
}
//Listar Tareas
function loadTasks() {
    $.ajax({
        url: API_URL,
        type: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        success: function (tasks) {
            console.log(tasks)
            // Limpia la tabla antes de llenarla
            $('#tbl-task').DataTable().clear().destroy();

            // Llena la tabla con los datos
            tasks.forEach(task => {
                $('#tbl-task tbody').append(
                    `
                    <tr>
                        <td class="text-center"> ${task.title_task}</td>
                        <td class="text-center"> ${task.description_task}</td>
                        <td class="text-center">
                            <select class="form-control" id="EstadoTask_${task.id_task}" name="EstadoTask_${task.id_task}" onchange="changeEstado(${task.id_task}, this.value)">
                                <option value="0" ${task.estado_task === "0" ? "selected" : ""} id="Pendiente">Pendiente</option>
                                <option value="1" ${task.estado_task === "1" ? "selected" : ""} id="Completado">Completado</option>
                            </select>
                        </td>
                        <td class="text-center">${task.fecha_creacion_task}</td>
                        <td class="text-center">
                            <button class="btn btn-outline-success" onclick="UpdateTask(${task.id_task})"><i class="far fa fa-edit"></i></button>
                            <button class="btn btn-outline-danger" onclick="deleteTask(${task.id_task})"><i class="far fa fa-trash"></i></button>
                        </td>
                     </tr>
                `);
            });
            $('#tbl-task').DataTable({
                responsive: true,  // Habilitar responsive
            });
        },
        error: function () {
            window.location = 'index.html'
        }
    });
}

// Crear Tarea
$('#create-task').on('click', function (e) {
    e.preventDefault();
    var Titulo = $('#Titulo').val();
    var Descripcion = $('#Descripcion').val();
    var Estado = $('#Estado').val();
    var fchTask = $('#fcha-creacion').val();

    var DataTask = {
        title_task:Titulo,
        description_task:Descripcion,
        estado_task:Estado,
        fecha_creacion_task:fchTask
    }

    $.ajax({
        url: API_URL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(DataTask),
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        success: function (response) {
            alert('Tarea creada con exito');
            $('#ModalTask').modal('hide');
            loadTasks()
        },
        error: function () {
            alert('Error al crear la tarea');
        }
    });


});

//Funcion para obtener solo una tarea
function UpdateTask(taskId){
    $.ajax({
        url: API_URL+'/'+taskId,
        type: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        success: function (tasks) {
            console.log(tasks)
            $('#tituloFormulario').html('Actualizar')
            $('#create-task').hide();
            $('.modal-footer').show();
            $('#idTask').val(tasks.id_task)
            $('#Titulo').val(tasks.title_task);
            $('#Descripcion').val(tasks.description_task);
            $('#Estado').val(tasks.estado_task);
            $('#fcha-creacion').val(tasks.fecha_creacion_task);
            $('#ModalTask').modal('show');
        },
        error: function () {
            alert('Error al obtener tareas');
        }
    });

    
}

//Guardar cambios
$('#update-task').on('click', function (e) {
    e.preventDefault();

    var idTask = $('#idTask').val()
    var Titulo = $('#Titulo').val();
    var Descripcion = $('#Descripcion').val();
    var Estado = $('#Estado').val();
    var fchTask = $('#fcha-creacion').val();

    var DataTask = {
        id_task:idTask,
        title_task:Titulo,
        description_task:Descripcion,
        estado_task:Estado,
        fecha_creacion_task:fchTask
    }

    $.ajax({
        url: API_URL+'/'+idTask,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(DataTask),
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        success: function (response) {
            alert('Tarea actualizada con exito');
            $('#ModalTask').modal('hide');
            loadTasks()
        },
        error: function () {
            alert('Error al crear la tarea');
        }
    });


});

// Función para eliminar una tarea
function deleteTask(taskId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        $.ajax({
            url: API_URL + '/' + taskId,
            type: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            },
            success: function () {
                loadTasks(); // Recargar las tareas después de eliminar
            },
            error: function () {
                alert('Error al eliminar la tarea');
            }
        });
    }
}

//funcion cambiar estado por select
function changeEstado(taskId, NuevoEstado){
    var DataEstado = {
        estado_task:NuevoEstado,
    }
    $.ajax({
        url: API_URL + '/' +taskId,
        type:'PUT',
        contentType: 'application/json',
        data: JSON.stringify(DataEstado),
        headers:{
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        success: function () {
            alert('El estado de la tarea ha sido actualizado');
            loadTasks()
        },
        error: function () {
            alert('Error al actualizar el estado de la tarea');
        }
    })
}

//Cerrar Session
$('#log-out').on('click', function(e){
    localStorage.clear();
    window.location='index.html'
})
//Cerrar modal y resetear cambios
$('#ModalTask').on('hidden.bs.modal', function () {
    $('#tituloFormulario').html('Nueva');
    $('.modal-footer').hide();
    $('#create-task').show();
    $('#frm-task')[0].reset();
});



