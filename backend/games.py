from flask_restx import Resource, Namespace, fields
from flask import Flask, request, jsonify, render_template
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import Games, db

game_ns = Namespace('games', description="A namespace for our Games")

games_model = game_ns.model(
    "Games", {
        "image": fields.String(required=True),
        "title": fields.String(required=True),
        "genre": fields.String(required=True),
        "rating": fields.Integer(required=True),
        "description": fields.String(required=True),
        "price": fields.Float(required=True),
        "trailer": fields.String(required=True)
    }
)

# Adding/ Getting all the games


@game_ns.route('/games')
class GamesResource(Resource):

    @game_ns.marshal_list_with(games_model)
    def get(self):
        games = Games.query.all()
        return games

    @game_ns.marshal_with(games_model)
    # @jwt_required()
    def post(self):
        data = request.get_json()
        try:
            new_game = Games(
                image=data.get('image'),
                title=data.get('title'),
                genre=data.get('genre'),
                rating=data.get("rating"),
                description=data.get("description"),
                price=data.get("price"),
                trailer=data.get("trailer")
            )
            db.session.add(new_game)
            db.session.commit()
            return new_game, 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

# Route to get a game by ID


@game_ns.route('/game/<int:id>')
class GameResource(Resource):
    @game_ns.marshal_with(games_model)
    def get(self, id):
        game = Games.query.get_or_404(id)
        return game

    @game_ns.marshal_with(games_model)
   # @jwt_required()
    def put(self, id):
        game_update = Games.query.get_or_404(id)
        data = request.get_json()
        try:
            game_update.image = data.get('image', game_update.image)
            game_update.title = data.get('title', game_update.title)
            game_update.genre = data.get('genre', game_update.genre)
            game_update.description = data.get(
                'description', game_update.description)
            game_update.rating = data.get('rating', game_update.rating)
            game_update.price = data.get('price', game_update.price)
            game_update.trailer = data.get('trailer', game_update.trailer)
            db.session.commit()
            return game_update
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    @game_ns.marshal_with(games_model)
    # @jwt_required()
    def delete(self, id):
        game_delete = Games.query.get_or_404(id)
        try:
            db.session.delete(game_delete)
            db.session.commit()
            return game_delete
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500
