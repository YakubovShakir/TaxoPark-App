from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt, check_password_hash
import configparser
from flask import send_file
import json
import datetime

config = configparser.ConfigParser()
config.read('backend/server/config.ini')
username = config['Main']['username']
dbpassword = config['Main']['password']
dbname = config['Main']['dbname']

app = Flask(__name__)

def json_serial(obj):
    if isinstance(obj, (datetime)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))

app.json_encoder = json.JSONEncoder(default=json_serial) 

app.config['SQLALCHEMY_DATABASE_URI']=f'postgresql://{username}:{dbpassword}@localhost/{dbname}'

bcrypt = Bcrypt(app)

db=SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(200))
    password = db.Column(db.String(200))

@app.route('/api/signup', methods=['POST'])
def add_user():
    data = request.get_json()
    user_login = data['login']
    user_password = data['password']

    user_exists = User.query.filter_by(login=user_login).first()
    if user_exists:
        return jsonify({"error":"User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(user_password).decode('utf-8')
    print("genereated hash", hashed_password)
    new_user= User(
        login=user_login,
        password=hashed_password,
    )

    print(user_login)
    print(user_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "login": new_user.login
    }), 200

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user_login = data['login']
    user_password = data['password']

    print(user_login)
    print(user_password)

    user_exists = User.query.filter_by(login=user_login).first()
    
    if not user_exists:
        return jsonify({"error":"User don't exists"}), 409
    
    if check_password_hash(user_exists.password, user_password):
        print("пароли сошлись")
        return jsonify({
            "id": user_exists.id,
        }), 200
    else:
        print("пароли не сошлись")
        return jsonify({"error": "Invalid password"}), 401
 
class Auto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    num = db.Column(db.String(20))
    mark = db.Column(db.String(20))
    color = db.Column(db.String(255))
    personell_id = db.Column(db.Integer)

class Personal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    pather_name = db.Column(db.String(20))


class Routes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))


class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time_out = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(),server_default=("(now() at time zone 'utc')::timestamp with time zone"))
    time_in = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), server_default=("(now() at time zone 'utc')::timestamp with time zone"))
    auto_id = db.Column(db.Integer)
    routes_id = db.Column(db.Integer)

@app.route('/api/get_autos', methods=['GET'])
def get_autos():
    autos = Auto.query.all()
    auto_list = [{'id': auto.id, 'num': auto.num, 'mark': auto.mark, 'color': auto.color, 'personell_id': auto.personell_id} for auto in autos]
    return jsonify({'autos': auto_list})

@app.route('/api/get_personals', methods=['GET'])
def get_personals():
    personals = Personal.query.all()
    personal_list = [{'id': personal.id, 'first_name': personal.first_name, 'last_name': personal.last_name, 'pather_name': personal.pather_name} for personal in personals]
    return jsonify({'personals': personal_list})

@app.route('/api/get_routes', methods=['GET'])
def get_routes():
    routes = Routes.query.all()
    routes_list = [{'id': route.id, 'name': route.name} for route in routes]
    return jsonify({'routes': routes_list})

@app.route('/api/get_journal', methods=['GET'])
def get_journal():
    journal = Journal.query.all()
    journal_list = [{'id': record.id, 'time_out': record.time_out , 'time_in': record.time_in, 'auto_id': record.auto_id, 'routes_id': record.routes_id} for record in journal]
    return jsonify({'journal': journal_list})


@app.route('/api/add_auto', methods=['POST'])
def add_auto():
    data = request.get_json()

    new_auto = Auto(
        num=data.get('num'),
        mark=data.get('mark'),
        color=data.get('color'),
        personell_id=data.get('personell_id')
    )

    db.session.add(new_auto)
    db.session.commit()

    return jsonify({'message': 'Auto added successfully'})

@app.route('/api/add_personal', methods=['POST'])
def add_personal():
    data = request.get_json()

    new_personal= Personal(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        pather_name=data.get('pather_name'),
    )

    db.session.add(new_personal)
    db.session.commit()

    return jsonify({'message': 'Personl added successfully'})

@app.route('/api/add_route', methods=['POST'])
def add_route():
    data = request.get_json()

    new_route = Routes(
        name=data.get('name'),
    )

    db.session.add(new_route)
    db.session.commit()

    return jsonify({'message': 'Personl added successfully'})

@app.route('/api/add_note', methods=['POST'])
def add_note():
    data = request.get_json()

    new_note = Journal(
        time_out=data.get('time_out'),
        time_in=data.get('time_in'),
        auto_id=data.get('auto_id'),
        routes_id=data.get('routes_id'),
    )

    db.session.add(new_note)
    db.session.commit()

    return jsonify({'message': 'Note added successfully'})

@app.route('/api/delete_auto/<int:auto_id>', methods=['DELETE'])
def delete_auto(auto_id):
    auto_to_delete = Auto.query.get(auto_id)
    if auto_to_delete:
        db.session.delete(auto_to_delete)
        db.session.commit()
        return jsonify({'message': 'Auto deleted successfully'})
    else:
        return jsonify({'message': 'Auto not found'})
    
@app.route('/api/delete_personal/<int:personal_id>', methods=['DELETE'])
def delete_personal(personal_id):
    personal_to_delete = Personal.query.get(personal_id)
    if personal_to_delete:
        db.session.delete(personal_to_delete)
        db.session.commit()
        return jsonify({'message': 'Personal deleted successfully'})
    else:
        return jsonify({'message': 'Personal not found'})
    
    
@app.route('/api/delete_route/<int:route_id>', methods=['DELETE'])
def delete_route(route_id):
    route_to_delete = Routes.query.get(route_id)
    if route_to_delete:
        db.session.delete(route_to_delete)
        db.session.commit()
        return jsonify({'message': 'Route deleted successfully'})
    else:
        return jsonify({'message': 'Route not found'})

@app.route('/api/delete_note/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    note_to_delete = Journal.query.get(note_id)
    if note_to_delete:
        db.session.delete(note_to_delete)
        db.session.commit()
        return jsonify({'message': 'Note deleted successfully'})
    else:
        return jsonify({'message': 'Note not found'})

@app.route('/api/edit_auto/<int:auto_id>', methods=['POST'])
def edit_auto(auto_id):
    auto = Auto.query.get_or_404(auto_id)
    print("До ", auto.color)
    try:
        data = request.get_json()
        
        auto.num = data.get('num')
        auto.mark = data.get('mark')
        auto.color = data.get('color')
        auto.personell_id = data.get('personell_id')
        print("После ", auto.color)
        db.session.commit()

        return jsonify({'message': 'Данные успешно изменены'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Ошибка при изменении данных: {str(e)}'}), 500
    
@app.route('/api/edit_personal/<int:personal_id>', methods=['POST'])
def edit_personal(personal_id):
    personal = Personal.query.get_or_404(personal_id)
    try:
        data = request.get_json()
        
        personal.first_name = data.get('first_name')
        personal.last_name = data.get('last_name')
        personal.pather_name = data.get('pather_name')

        db.session.commit()

        return jsonify({'message': 'Данные успешно изменены'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Ошибка при изменении данных: {str(e)}'}), 500

@app.route('/api/edit_route/<int:route_id>', methods=['POST'])
def edit_route(route_id):
    route = Routes.query.get_or_404(route_id)
    try:
        data = request.get_json()
        
        route.name = data.get('name')
        db.session.commit()

        return jsonify({'message': 'Данные успешно изменены'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Ошибка при изменении данных: {str(e)}'}), 500

@app.route('/api/edit_note/<int:note_id>', methods=['POST'])
def edit_note(note_id):
    note = Journal.query.get_or_404(note_id)
    try:
        data = request.get_json()
        
        note.time_out = data.get('time_out')
        note.time_in = data.get('time_in')
        note.auto_id = data.get('auto_id')
        note.routes_id = data.get('routes_id')

        db.session.commit()

        return jsonify({'message': 'Данные успешно изменены'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Ошибка при изменении данных: {str(e)}'}), 500


@app.route('/api/get_auto/<int:auto_id>', methods=['GET'])
def get_auto(auto_id):
    auto = Auto.query.get_or_404(auto_id)
    auto_data = {
        'id': auto.id,
        'num': auto.num,
        'mark': auto.mark,
        'color': auto.color,
        'personell_id': auto.personell_id
    }
    return jsonify({'auto': auto_data}), 200

@app.route('/api/get_personal/<int:personal_id>', methods=['GET'])
def get_personal(personal_id):
    personal = Personal.query.get_or_404(personal_id)
    personal_data = {
        'id': personal.id,
        'first_name': personal.first_name,
        'last_name': personal.last_name,
        'pather_name': personal.pather_name,
    }
    return jsonify({'personal': personal_data}), 200

@app.route('/api/get_route/<int:route_id>', methods=['GET'])
def get_route(route_id):
    route = Routes.query.get_or_404(route_id)
    route_data = {
        'id': route.id,
        'name': route.name,
    }
    return jsonify({'route': route_data}), 200

@app.route('/api/get_note/<int:note_id>', methods=['GET'])
def get_note(note_id):
    note = Journal.query.get_or_404(note_id)
    note_data = {
        'id': note.id,
        'time_out': note.time_out,
        'time_in': note.time_in,
        'auto_id': note.auto_id,
        'routes_id': note.routes_id
    }
    return jsonify({'note': note_data}), 200

@app.route('/api/download_data', methods=['GET'])
def download_data():
    autos = Auto.query.all()
    personals = Personal.query.all()
    routes = Routes.query.all()
    journal = Journal.query.all()

    data = {
        'autos': [{'id': auto.id, 'num': auto.num, 'mark': auto.mark, 'color': auto.color, 'personell_id': auto.personell_id} for auto in autos],
        'personals': [{'id': personal.id, 'first_name': personal.first_name, 'last_name': personal.last_name, 'pather_name': personal.pather_name} for personal in personals],
        'routes': [{'id': route.id, 'name': route.name} for route in routes],
        'journal': [{'id': record.id, 'time_out': record.time_out.strftime("%Y-%m-%d"), 'time_in': record.time_in.strftime("%Y-%m-%d"), 'auto_id': record.auto_id, 'routes_id': record.routes_id} for record in journal]
    }

    with open('data.json', 'w') as json_file:
        json.dump(data, json_file)

    return send_file('data.json', as_attachment=True)

#auto = db.session.query(auto);
if __name__ == '__main__':
    app.run(port=8002, debug=True)
