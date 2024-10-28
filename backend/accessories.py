from flask import Flask, request, jsonify, send_from_directory
from flask_restx import Namespace, fields, Resource
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from models import Accessories
import os

accessories_ns = Namespace(
    'accessories', description="Namespace for accessories")


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'jpg', 'png', 'gif', 'jpeg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@accessories_ns.route('/uploads/<filename>')
class UploadedPhotoResource(Resource):
    def post(self, filename):
        return send_from_directory(UPLOAD_FOLDER, filename)


accessories_model = accessories_ns.model(
    "Accessories Model", {
        'image_url': fields.String(),
        'name': fields.String(),
        'category': fields.String(),
        'brand': fields.String(),
        'description': fields.String(),
        'price': fields.String(),
    }
)


@accessories_ns.route("/accessories")
class AccessoriesResource(Resource):
    @accessories_ns.marshal_list_with(accessories_model)
    def get(self):
        accessories = Accessories.query.all()
        return accessories

    @accessories_ns.marshal_with(accessories_model)
    @accessories_ns.expect(accessories_model)
    @jwt_required()
    def post(self):
        if 'image_url' not in request.files:
            return {"message": "Image file is required"}, 400

        image_file = request.files['image_url']

        if image_file and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            image_file.save(file_path)
            image_url = f"/uploads/{filename}"
        else:
            return {"message": "Invalid image file type"}, 400

        name = request.form.get('name')
        category = request.form.get('category')
        brand = request.form.get('brand')
        description = request.form.get('description')
        price = request.form.get('price')

        if not name or not category or not brand or not description or not price:
            return {"message": "name, category, brand, description ad price are required"}, 400

        new_accessory = Accessories(
            image_url=image_url,
            name=name,
            category=category,
            brand=brand,
            description=description,
            price=price
        )

        new_accessory.save()
        return new_accessory, 201


@accessories_ns.route('/accessory/<int:id>')
class RecipeResource(Resource):
    @accessories_ns.marshal_with(accessories_model)
    def get(self, id):
        accessory = Accessories.query.get_or_404(id)

        return accessory

    @accessories_ns.marshal_with(accessories_model)
    @jwt_required()
    def delete(self, id):
        print(f"Received DELETE request for ID: {id}")
        accessory_to_delete = Accessories.query.get_or_404(id)
        accessory_to_delete.delete()
        return {"message": "Accessory deleted successfully"}, 200
