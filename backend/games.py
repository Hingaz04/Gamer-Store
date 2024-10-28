from flask import Flask, request, jsonify, send_from_directory
from flask_restx import Resource, fields, Namespace
from models import Game
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
import os

game_ns = Namespace("games", description="Namespace for our game")

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

if not os.path.exists(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)


@game_ns.route('/uploads/<filename>')
class UploadedPictureResource(Resource):
    def get(self, filename):
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        if os.path.exists(filepath):
            return send_from_directory(UPLOAD_FOLDER, filename)
        else:
            return {"message": "File not found"}, 404


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


game_model = game_ns.model(
    "Game_model", {
        "id": fields.Integer(),
        "image_url": fields.String(),
        "title": fields.String(),
        "genre": fields.String(),
        "description": fields.String(),
        "rating": fields.String(),
        "price": fields.String(),
    }
)


@game_ns.route('/games')
class GamesResource(Resource):
    @game_ns.marshal_list_with(game_model)
    def get(self):
        games = Game.query.all()

        return games

    @game_ns.marshal_list_with(game_model)
    @game_ns.expect(game_model)
    @jwt_required()
    def post(self):
        if 'image_url' not in request.files:
            return {"message": "Game image url required"}, 400

        image_url = request.files['image_url']
        title = request.form.get('title')
        genre = request.form.get('genre')
        description = request.form.get('description')
        rating = request.form.get('rating')
        price = request.form.get('price')

        if image_url and allowed_file(image_url.filename):
            image_url_filename = secure_filename(image_url.filename)
            image_url_path = os.path.join(
                UPLOAD_FOLDER, image_url_filename
            )
            image_url.save(image_url_path)
        else:
            return {"message": "Invalid file for the game"}, 400

        new_game = Game(
            image_url=f"uploads/{image_url_filename}",
            title=title,
            genre=genre,
            description=description,
            rating=rating,
            price=price
        )

        new_game.save()

        return new_game, 201


@game_ns.route('/game/<int:id>')
class RecipeResource(Resource):
    @game_ns.marshal_with(game_model)
    def get(self, id):
        game = Game.query.get_or_404(id)

        return game

    @game_ns.marshal_with(game_model)
    @jwt_required()
    def delete(self, id):
        print(f"Received DELETE request for ID: {id}")
        game_to_delete = Game.query.get_or_404(id)
        game_to_delete.delete()
        return {"message": "Game deleted successfully"}, 200
