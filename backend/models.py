from flask_sqlalchemy import SQLAlchemy

# Initialize the database extension wrapper
db = SQLAlchemy()

class Product(db.Model):
    """Database layout table for storing our Figma marketplace products"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.String(10), nullable=False)
    orders = db.Column(db.String(50), nullable=False)
    shipping = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    is_recommended = db.Column(db.Boolean, default=False)

class CartItem(db.Model):
    """Database layout table tracking active products inside a user's checkout basket"""
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1, nullable=False)
    
    product = db.relationship('Product', backref='cart_entries')

class User(db.Model):
    """Database layout table for securely storing user credentials"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)