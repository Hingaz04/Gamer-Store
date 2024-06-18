from flask import Flask, request, send_from_directory, render_template, redirect, url_for, jsonify
from flask_restx import Api
from models import Consoles, Games, User, db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from games import game_ns
from user import user_ns
from consoles import console_ns
from config import DevConfig
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

# Define the allowed file extensions for uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_app(config_class=DevConfig):
    app = Flask(__name__, static_url_path='/static')
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    # Initialize API
    api = Api(app)
    api.add_namespace(game_ns)
    api.add_namespace(user_ns)
    api.add_namespace(console_ns)

    # Create the upload folder if it doesn't exist
    UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    @app.route('/upload-game', methods=['GET', 'POST'])
    def upload_game():
        if request.method == 'POST':
            # Check if the post request has the file part
            if 'image' not in request.files:
                return jsonify({"error": "No image file part"}), 400

            file = request.files['image']

            if file.filename == '':
                return jsonify({"error": "No selected file"}), 400

            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)

                # Extract other form data
                title = request.form.get('title')
                genre = request.form.get('genre')
                rating = request.form.get('rating')
                description = request.form.get('description')
                price = request.form.get('price')
                trailer = request.form.get('trailer')

                # Save to the database
                new_game = Games(
                    image=file_path,
                    title=title,
                    genre=genre,
                    rating=rating,
                    description=description,
                    price=price,
                    trailer=trailer
                )
                db.session.add(new_game)
                db.session.commit()

                return redirect(url_for('upload_game'))

        # Render the upload form on GET request
        return render_template('game.html')

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "Games": Games,
            "Consoles": Consoles,
            "User": User
        }

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
