from flask import Flask, jsonify, request, make_response
from flask_restx import Namespace, fields, Resource
from models import Admin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity


admin_ns = Namespace('admin', description="Namespace for admin")

admin_model = admin_ns.model(
    "Admin", {
        "email": fields.String(),
        "password": fields.String()
    }
)


@admin_ns.route("/admin-signup")
class AdminResource(Resource):
    @admin_ns.expect(admin_model)
    def post(self):
        data = request.get_json()

        email = data.get('email')
        db_admin = Admin.query.filter_by(email=email).first()

        if db_admin is not None:
            return jsonify({"Message": f"User with email {email} already exists"})

        new_admin = Admin(
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )

        new_admin.save()

        return jsonify({"Message": "Admin created successfully"})


@admin_ns.route('/admin-login')
class AdminLogin(Resource):
    @admin_ns.expect(admin_model)
    def post(self):
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        db_admin = Admin.query.filter_by(email=email).first()

        if db_admin and check_password_hash(db_admin.password, password):
            access_token = create_access_token(identity=db_admin.email)
            refresh_token = create_refresh_token(identity=db_admin.email)

            return jsonify({
                "Access Token": access_token,
                "Refresh Token": refresh_token
            }
            )

        else:
            return jsonify({
                "Message": "Invalid email or password"
            }), 401


@admin_ns.route('/admin-refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_admin = get_jwt_identity()
        new_access_token = create_access_token(identity=current_admin)
        return make_response(jsonify({"access_token": new_access_token}), 200)
