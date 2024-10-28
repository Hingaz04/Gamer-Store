from ext import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_image = db.Column(db.String, nullable=False,
                           default='default_image.jpg')
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f"<User {self.email}>"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f'<Admin {self.email}>'

    def save(self):
        db.session.add(self)
        db.session.commit()


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False,
                          default='default_image.jpg')
    title = db.Column(db.String, unique=True)
    genre = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    trailer = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer,  nullable=False)


    def __repr__(self):
        return f"<Game {self.title}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Accessories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False,
                          default='default_image.jpg')
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    brand = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Accessories {self.name}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
