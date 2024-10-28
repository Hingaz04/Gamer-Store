from flask import Flask
from flask_restx import Api
from config import DevConfig
from models import User, Game, db, Admin, Accessories
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from auth import auth_ns
from games import game_ns
from accessories import accessories_ns
from admin import admin_ns
from flask_cors import CORS


def create_app(config=DevConfig):
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app)
    db.init_app(app)

    migrate = Migrate(app, db)

    JWTManager(app)

    api = Api(app, doc='/docs')

    api.add_namespace(auth_ns, path='/auth')
    api.add_namespace(game_ns, path="/games")
    api.add_namespace(admin_ns, path="/admin")
    api.add_namespace(accessories_ns, path="/accessories")

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db': db,
            'User': User,
            'Game': Game,
            "Admin": Admin,
            "Accessories": Accessories
        }

    return app


if __name__ == '__main__':
    app = create_app(DevConfig)
    app.run(debug=True)
