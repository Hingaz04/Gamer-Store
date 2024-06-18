from flask_restx import Resource, Namespace, fields
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Consoles


console_ns = Namespace('consoles', description="A namespace for our Consoles")

consoles_model = console_ns.model(
    "Consoles", {
        "image": fields.String(required=True),
        "name": fields.String(required=True),
        "description": fields.String(required=True),
        "category": fields.String(required=True),
        "price": fields.Float(required=True)
    }
)

# Adding/ Getting all the consoles


@console_ns.route('/consoles')
class ConsolesResource(Resource):

    @console_ns.marshal_list_with(consoles_model)
    def get(self):
        consoles = Consoles.query.all()
        return consoles

    @console_ns.marshal_with(consoles_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        try:
            new_console = Consoles(
                image=data.get('image'),
                name=data.get('name'),
                description=data.get("description"),
                category=data.get('category'),
                price=data.get("price")
            )
            db.session.add(new_console)
            db.session.commit()
            return new_console, 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500


# Route to get a console by ID

@console_ns.route('/game/<int:id>')
class ConsolesResource(Resource):
    @console_ns.marshal_with(consoles_model)
    def get(self, id):
        console = Consoles.query.get_or_404(id)
        return console

    @console_ns.marshal_with(consoles_model)
    @jwt_required()
    def put(self, id):
        console_update = Consoles.query.get_or_404(id)
        data = request.get_json()
        try:
            console_update.image = data.get('image', console_update.image)
            console_update.name = data.get('name', console_update.name)
            console_update.genre = data.get('genre', console_update.genre)
            console_update.description = data.get(
                'description', console_update.description)
            console_update.rating = data.get('rating', console_update.rating)
            console_update.price = data.get('price', console_update.price)
            db.session.commit()
            return console_update
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    @console_ns.marshal_with(consoles_model)
    @jwt_required()
    def delete(self, id):
        console_delete = Consoles.query.get_or_404(id)
        try:
            db.session.delete(console_delete)
            db.session.commit()
            return console_delete
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500
