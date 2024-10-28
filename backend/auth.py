from flask import Flask, request, jsonify, make_response, send_from_directory
from flask_restx import Resource, Namespace, fields
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from models import User
import os


auth_ns = Namespace('auth', description="Namespace for authentication")

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = ['png', 'jpeg', 'jpg', 'gif']

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@auth_ns.route('/uploads/<filename>')
class UploadedFileResource(Resource):
    def post(self, filename):
        return send_from_directory(UPLOAD_FOLDER, filename)


signup_model = auth_ns.model(
    "SignUp", {
        "user_image": fields.String(),
        "username": fields.String(),
        "email": fields.String(),
        'password': fields.String()
    }
)

login_model = auth_ns.model(
    "Login", {
        'email': fields.String(),
        "password": fields.String()
    }
)


@auth_ns.route("/signup")
class Signup(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        if 'user_image' not in request.files:
            return {"message": "Image file required"}, 400

        image_file = request.files("user_image")

        if image_file and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            image_file.save(file_path)
            image_url = f"/uploads/{filename}"
        else:
            return {"message": "Invalid image file type"}, 400

        username = request.form.get('username')
        email = request.form.get('email')
        password = generate_password_hash(request.form.get('password'))

        db_user = User.query.filter_by(email=email).first()

        if db_user is not None:
            return jsonify({"message": f'User email {email} already exists'})

        new_user = User(
            user_image=image_url,
            username=username,
            email=email,
            password=password
        )

        new_user.save()

        return jsonify({"Message": "User created successfully"})


@auth_ns.route("/login")
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        db_user = User.query.filter_by(email=email).first()

        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.email)
            refresh_token = create_refresh_token(identity=db_user.email)
            return jsonify({
                'access_token': access_token,
                "refresh_token": refresh_token
            })
        else:
            return jsonify({"Message": "Invalid email or password"}), 401


@auth_ns.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token": new_access_token}), 200)
