from flask import Flask, request, jsonify, make_response
from flask_restx import Resource, Namespace,  fields
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required, create_access_token, create_refresh_token

user_ns = Namespace("user", description="A namespace for our users")


signup_model = user_ns.model(
    "Signup", {
        "profile_pic": fields.String(required=True),
        "first_name": fields.String(required=True),
        "last_name": fields.String(required=True),
        "email": fields.String(required=True),
        "password": fields.String(required=True),

    }
)


login_model = user_ns.model(
    "Login", {
        "username": fields.String(required=True),
        "email": fields.String(required=True),
        "password": fields.String(required=True),
    }
)


@user_ns.route('/signup')
class Signup(Resource):

    @user_ns.expect(signup_model)
    def post(self):
        data = request.get_json()

        email = data.get('email')
        db_user = User.query.filter_by(email=email).first()

        if db_user is not None:
            return jsonify({"message": f"user with email {email} already exists"})

        new_user = User(
            profile_pic=data.get("profile_pic"),
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))

        )

        new_user.save()

        return jsonify({"Message": "User created succesfully"})


@user_ns.route('/login')
class Login(Resource):
    @user_ns.expect(login_model)
    def post(self):
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        db_user = User.query.filter_by(email=email).first()

        if db_user and check_password_hash(db_user.password, password):

            access_token = create_access_token(identity=db_user.email)
            refresh_token = create_refresh_token(identity=db_user.email)

            return jsonify(
                {"access token": access_token, "refresh_token": refresh_token}
            )


@user_ns.route('/refresh')
class RefreshRosource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access_token": new_access_token}), 200)
