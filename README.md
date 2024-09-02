##Gestión de Tareas - API Backend y Frontend##
Este proyecto incluye una API RESTful construida en Flask para la gestión de tareas y un frontend para interactuar con la API. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre las tareas, mientras que el frontend ofrece una interfaz de usuario para administrar estas tareas.

##Características principales##
*Backend con Flask: Proporciona la lógica de la API y la gestión de la base de datos.
*Frontend con HTML, CSS, Bootstrap y jQuery: Proporciona una interfaz de usuario para interactuar con la API.
*Autenticación básica: Implementada en el backend para proteger las rutas.
*Operaciones CRUD: Crear, Leer, Actualizar y Eliminar tareas desde el frontend.
*Base de datos MySQL: Las tareas se almacenan en una base de datos MySQL.
*Marshmallow: Para la serialización/deserialización de datos.
*CORS: Habilitado para permitir el acceso desde diferentes orígenes.

##Tecnologías utilizadas##
##Backend##
-Python 3.12.5
-Flask: Framework para construir la API.
-Flask SQLAlchemy: ORM para interactuar con la base de datos MySQL.
-Flask Marshmallow: Para la serialización de modelos.
-MySQL: Sistema de gestión de bases de datos.
-Flask CORS: Para permitir solicitudes entre dominios.

##Frontend##
-HTML/CSS: Para la estructura y el diseño de la interfaz de usuario.
-Bootstrap: Para el diseño responsivo.
-jQuery: Para la interacción con la API.
-DataTables: Para mostrar las tareas en tablas con paginación y búsqueda.

##Requisitos previos##
Python 3.12.5 instalado.
MySQL instalado y configurado.
Librerías requeridas en el archivo requirements.txt.

##Instalación
*Backend
Clonar el repositorio:

bash
Copiar código
git clone https://github.com/NarenVoos-Dev/Prueba_Tassk.git
cd tu-repositorio
Crear y activar un entorno virtual (opcional, pero recomendado):
-python3 -m venv venv
-source venv/bin/activate   # En Windows: venv\Scripts\activate

#Instalar las dependencias:
-pip install -r requirements.txt

#Configurar la base de datos MySQL:
Asegúrate de tener MySQL corriendo en tu máquina.
-Crea una base de datos llamada tbl_prueba_tasks.
-Configura las credenciales de la base de datos en la línea correspondiente del código:
*python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/tbl_prueba_tasks'
en el aparatdo de root va el usuario de tu base de datos y luego de los dos puntos la contraseña en caso de tener

Iniciar la aplicación:
ejemplo: python src/app.py
flask run

##Frontend
El frontend se sirve como una aplicación web estática. Puedes abrir el archivo index.html en tu navegador o utilizar una herramienta como Live Server en Visual Studio Code para servir el sitio localmente.

Configurar el archivo task.html:

Este archivo es el frontend principal para gestionar las tareas.
Asegúrate de configurar las URLs de la API en los scripts de JavaScript donde sea necesario.
Abrir el archivo index.html:

Puedes abrir el archivo directamente en tu navegador o servirlo con una herramienta de servidor local como Live Server.
Rutas de la API
Autenticación
La autenticación se maneja con el encabezado Authorization utilizando Basic Auth. Ejemplo en Postman:

makefile
Copiar código
Username: admin
Password: password123
Crear tarea
Endpoint: /tasks
Método: POST
Autenticación: Requerida
Cuerpo del request (JSON):
json
Copiar código
{
    "title_task": "Nueva Tarea",
    "description_task": "Descripción de la tarea",
    "estado_task": "Pendiente",
    "fecha_creacion_task": "2023-08-31",
    "id_user_task": 1
}
Respuesta: Tarea creada en formato JSON.
Listar todas las tareas
Endpoint: /tasks
Método: GET
Autenticación: Requerida
Respuesta: Listado de todas las tareas en formato JSON.
Obtener tarea por ID
Endpoint: /tasks/<id>
Método: GET
Autenticación: Requerida
Respuesta: Tarea correspondiente al ID en formato JSON.
Actualizar tarea
Endpoint: /tasks/<id>
Método: PUT
Autenticación: Requerida
Cuerpo del request (JSON):
json
Copiar código
{
    "title_task": "Tarea actualizada",
    "description_task": "Descripción actualizada",
    "estado_task": "Completado",
    "fecha_creacion_task": "2023-08-31",
    "id_user_task": 1
}
Respuesta: Tarea actualizada en formato JSON.
Eliminar tarea
Endpoint: /tasks/<id>
Método: DELETE
Autenticación: Requerida
Respuesta: Tarea eliminada en formato JSON.

##Interacción con el Frontend##
El frontend permite a los usuarios:

Crear tareas: A través de un formulario.
Visualizar tareas: Listadas en una tabla con paginación y opciones de búsqueda (usando DataTables).
Editar tareas: Haciendo clic en el botón de editar, que carga los datos en un modal.
Eliminar tareas: A través del botón de eliminar.
Estilos personalizados
El frontend utiliza Bootstrap para la responsividad, pero también incluye estilos personalizados en custom.css. Algunas interacciones específicas, como cambiar los colores de los estados de las tareas, se manejan con jQuery.

Configuración de DataTables
El archivo task.html incluye la inicialización de DataTables para gestionar la tabla de tareas con paginación, búsqueda y ordenamiento. Asegúrate de incluir los archivos necesarios de DataTables y de configurar correctamente el idioma de la tabla si lo necesitas.

Configuración adicional
Si estás desplegando esta aplicación en un servidor de producción, asegúrate de desactivar el modo de depuración y configurar correctamente tu entorno de producción.
