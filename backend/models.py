from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    profile_pic = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Games(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255))
    title = db.Column(db.String(100))
    genre = db.Column(db.String(50))
    rating = db.Column(db.Integer)
    description = db.Column(db.Text)
    price = db.Column(db.Float)
    trailer = db.Column(db.String(255))

    def __init__(self, image, title, genre, rating, description, price, trailer):
        self.image = image
        self.title = title
        self.genre = genre
        self.rating = rating
        self.description = description
        self.price = price
        self.trailer = trailer

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, image, title, genre, rating, description, price, trailer):
        self.image = image
        self.name = title
        self.genre = genre
        self.rating = rating
        self.description = description
        self.price = price
        self.trailer = trailer
        db.session.commit()


class Consoles(db.Model):
    __tablename__ = 'consoles'
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __init__(self, image, name, description, category, price):
        self.image = image
        self.name = name
        self.description = description
        self.category = category
        self.price = price

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, image, name, description, category, price):
        self.image = image
        self.name = name
        self.description = description
        self.category = category
        self.price = price
        db.session.commit()
