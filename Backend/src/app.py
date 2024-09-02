from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS  # Importa CORS
from functools import wraps

app = Flask(__name__) #Inicializar app

# Configuracion CORS
CORS(app) # Permite solicitudes desde cualquier direccion

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/tbl_prueba_tasks' #conexion a la bd de mysql
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Credenciales predefinidas
USERNAME = 'admin'
PASSWORD = 'password123'

# Decorador para autenticación básica
def auth_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.authorization
        if auth and auth.username == USERNAME and auth.password == PASSWORD:
            return f(*args, **kwargs)
        return jsonify({"message": "No Autorizado"}), 401
    return wrapper
#Clase para crear tabla en BD
class Tasks(db.Model):
    id_task = db.Column(db.Integer, primary_key=True)
    title_task = db.Column(db.String(70), unique=True)
    description_task = db.Column(db.String(200))
    estado_task = db.Column(db.String(15))
    fecha_creacion_task = db.Column(db.Date)
    id_user_task = db.Column(db.Integer)

    def __init__(self, title_task, description_task, estado_task, fecha_creacion_task, id_user_task):
        self.title_task = title_task
        self.description_task = description_task
        self.estado_task = estado_task
        self.fecha_creacion_task = fecha_creacion_task
        self.id_user_task = id_user_task

with app.app_context():
    db.create_all()

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tasks

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

# Crear Tarea
@app.route('/tasks', methods=['POST'])
@auth_required
def create_task():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No ingresaron datos'}), 400

        new_task = Tasks(
            title_task=data.get('title_task'),
            description_task=data.get('description_task'),
            estado_task=data.get('estado_task'),
            fecha_creacion_task=data.get('fecha_creacion_task'),
            id_user_task=data.get('id_user_task')
        )
        db.session.add(new_task)
        db.session.commit()
        return task_schema.jsonify(new_task), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error creando tarea'}), 500

# Listar todas las tareas
@app.route('/tasks', methods=['GET'])
@auth_required
def list_tasks():
    try:
        all_tasks = Tasks.query.all()
        result = tasks_schema.dump(all_tasks)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error al listar tareas'}), 500

# Listar por ID
@app.route('/tasks/<id>', methods=['GET'])
@auth_required
def one_task(id):
    try:
        task = Tasks.query.get(id)
        if task is None:
            return jsonify({'message': 'Tarea no encontrada'}), 404
        return task_schema.jsonify(task)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error al obtener tarea'}), 500
 
# Actualizar Tarea
@app.route('/tasks/<id>', methods=['PUT'])
@auth_required
def update_task(id):
    try:
        task = Tasks.query.get(id)
        if task is None:
            return jsonify({'message': 'Tarea no encontrada'}), 404
        
        data = request.get_json()
        task.title_task = data.get('title_task')
        task.description_task = data.get('description_task')
        task.estado_task = data.get('estado_task')
        task.fecha_creacion_task = data.get('fecha_creacion_task')
        task.id_user_task = data.get('id_user_task')

        db.session.commit()
        return task_schema.jsonify(task)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error al actualizar tarea'}), 500

# Eliminar Tarea
@app.route('/tasks/<id>', methods=['DELETE'])
@auth_required
def delete_task(id):
    try:
        task = Tasks.query.get(id)
        if task is None:
            return jsonify({'message': 'Tarea no encontrada'}), 404
        
        db.session.delete(task)
        db.session.commit()
        return task_schema.jsonify(task)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error al eliminar tarea'}), 500

if __name__ == "__main__":
    app.run(debug=True)
