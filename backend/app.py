from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from models import db, Product, CartItem, User
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///market.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def seed_database_if_empty():
    """Seeds the database with marketplace products"""
    if Product.query.first() is None:
        print("🌱 Seeding database with all marketplace products...")
        
        products = [
            # === CATEGORY GRID: MAIN CATALOG ITEMS ===
            Product(name="Canon Camera EOS 2000D, Black 18-55mm lens", price="$998.00", category="Electronics", rating="4.7", orders="154 orders", shipping="Free Shipping", image="📷", brand="Canon", is_recommended=False, description="High-quality DSLR camera perfect for beginners and enthusiasts alike."),
            Product(name="GoPro HERO8 4K Action Camera - Black Edition", price="$895.00", category="Electronics", rating="4.6", orders="120 orders", shipping="Free Shipping", image="📹", brand="GoPro", is_recommended=False, description="Capture smooth 4K videos no matter how rugged the adventure gets."),
            Product(name="High-Performance Media Tablet 10.5 Inch", price="$420.00", category="Computer and tech", rating="4.5", orders="85 orders", shipping="Free Shipping", image="📱", brand="Huawei", is_recommended=False, description="Vibrant display tablet built for media streaming and mobile productivity."),

            # === DEALS AND OFFERS ===
            Product(name="Smart watches selection", price="$19.00", category="Deals", rating="4.3", orders="310 orders", shipping="Standard", image="⌚", brand="Generic", is_recommended=False, description="Limited time flash deal on premium multi-sport tracking smartwatches."),
            Product(name="Laptops & Ultra Notebooks", price="$299.00", category="Deals", rating="4.5", orders="95 orders", shipping="Free Shipping", image="💻", brand="Generic", is_recommended=False, description="Compact performance laptop structured for school and workplace productivity."),
            Product(name="GoPro cameras rugged edition", price="$240.00", category="Deals", rating="4.7", orders="140 orders", shipping="Free Shipping", image="📹", brand="GoPro", is_recommended=False, description="Special discount action camera bundle with water-resistant casing."),
            Product(name="Headphones with noise cancellation", price="$35.00", category="Deals", rating="4.4", orders="500 orders", shipping="Standard", image="🎧", brand="Generic", is_recommended=False, description="Immersive bass sound over-ear headphones with custom soft cushions."),
            Product(name="Canon cameras professional body", price="$450.00", category="Deals", rating="4.6", orders="88 orders", shipping="Free Shipping", image="📷", brand="Canon", is_recommended=False, description="Sturdy standalone camera body configured for clean macro and studio photography."),

            # === HOME AND OUTDOOR SECTION ===
            Product(name="Soft chairs for living room", price="$19.00", category="Home interiors", rating="4.2", orders="64 orders", shipping="Standard", image="🪑", brand="Comfort", is_recommended=False, description="Ergonomic minimalist single-seat armchair matching modern interiors."),
            Product(name="Sofa & luxurious chair set", price="$100.00", category="Home interiors", rating="4.6", orders="12 orders", shipping="Freight", image="🛋️", brand="Luxury", is_recommended=False, description="Premium fabric multi-piece couch layout framework for family lounges."),
            Product(name="Kitchen dishes dining set", price="$19.00", category="Home interiors", rating="4.5", orders="180 orders", shipping="Standard", image="🍽️", brand="KitchenPro", is_recommended=False, description="Durable ceramic plates and bowls matching clean classic dinner tables."),
            Product(name="Smart kitchen mixer setup", price="$100.00", category="Home interiors", rating="4.7", orders="45 orders", shipping="Standard", image="🥣", brand="KitchenPro", is_recommended=False, description="High-torque multi-speed kitchen mixer perfect for baking and dough processing."),
            Product(name="High-speed blenders", price="$39.00", category="Home interiors", rating="4.4", orders="210 orders", shipping="Standard", image="🥤", brand="Generic", is_recommended=False, description="Multi-blade processing blender built for nutritional healthy smoothies."),
            Product(name="Home appliances & baskets", price="$19.00", category="Home interiors", rating="4.1", orders="99 orders", shipping="Standard", image="🧺", brand="Generic", is_recommended=False, description="Woven lightweight storage and organizer setups for laundry rooms."),
            Product(name="Coffee maker machine", price="$10.00", category="Home interiors", rating="4.5", orders="430 orders", shipping="Standard", image="☕", brand="BrewMaster", is_recommended=False, description="Compact single-button drip coffee system optimized for quick mornings."),

            # === CONSUMER ELECTRONICS AND GADGETS ===
            Product(name="Gaming set ultimate bundle", price="$19.00", category="Computer and tech", rating="4.8", orders="75 orders", shipping="Standard", image="🎮", brand="RazerX", is_recommended=False, description="Responsive dual-analog precision control layout gamepad matching PC and console lines."),
            Product(name="Laptops & Personal Computers", price="$19.00", category="Computer and tech", rating="4.5", orders="120 orders", shipping="Free Shipping", image="💻", brand="Lenovo", is_recommended=False, description="Standard entry-level desktop station monitor and chassis module configuration."),
            Product(name="Smartphones flagship models", price="$19.00", category="Computer and tech", rating="4.6", orders="540 orders", shipping="Free Shipping", image="📱", brand="Apple", is_recommended=False, description="Vibrant high refresh rate pocket smartphone with advanced camera processing sensors."),
            Product(name="Electric kettle hot tea water", price="$19.00", category="Computer and tech", rating="4.3", orders="215 orders", shipping="Standard", image="🫖", brand="Generic", is_recommended=False, description="Fast-boiling stainless steel auto-shutoff electric kettle reservoir container."),

            # === SPORTS & ENTERTAINMENT SECTION ===
            Product(name="Pro Football Soccer Ball Size 5", price="$24.99", category="Sports", rating="4.6", orders="320 orders", shipping="Standard", image="⚽", brand="Nike", is_recommended=False, description="Premium match-grade aerodynamic soccer ball structured for durable grass field play panels."),
            Product(name="Ergonomic Aluminum Tennis Racket", price="$45.00", category="Sports", rating="4.5", orders="140 orders", shipping="Free Shipping", image="🎾", brand="Wilson", is_recommended=False, description="Lightweight sports frame designed with professional tight web string matrices."),

            # === RECOMMENDED ITEMS GRID ===
            Product(name="T-shirts with multiple colors, for men", price="$10.30", category="Clothes and wear", rating="4.5", orders="50 orders", shipping="Standard", image="👕", brand="Pocco", is_recommended=True, description="Classic combed cotton t-shirt built for casual style."),
            Product(name="Jeans shorts for men blue color", price="$10.30", category="Clothes and wear", rating="4.2", orders="40 orders", shipping="Standard", image="🩳", brand="Lenovo", is_recommended=True, description="Durable blue denim shorts with modern standard pocket lines."),
            Product(name="Brown winter coat medium size", price="$12.50", category="Clothes and wear", rating="4.8", orders="110 orders", shipping="Free Shipping", image="🧥", brand="Apple", is_recommended=True, description="Thick heavy wool blend winter coat optimized for maximum thermal insulation."),
            Product(name="Jeans bag for travel for men", price="$34.00", category="Clothes and wear", rating="4.4", orders="95 orders", shipping="Standard", image="💼", brand="Samsung", is_recommended=True, description="Spacious travel bag constructed from dense, cross-stitched denim fiber threads."),
            Product(name="Leather wallet premium slim slot", price="$99.00", category="Clothes and wear", rating="4.9", orders="30 orders", shipping="Free Shipping", image="👛", brand="Luxury", is_recommended=True, description="Genuine top-grain cowhide bi-fold wallet engineered with secure layered RFID-blocking matrix fabrics."),
            Product(name="Canon camera black, 100x zoom", price="$9.99", category="Electronics", rating="4.1", orders="600 orders", shipping="Standard", image="📷", brand="Canon", is_recommended=True, description="Compact travel point-and-shoot camera framing macro features natively."),
            Product(name="Headset for gaming with mic", price="$8.99", category="Computer and tech", rating="4.5", orders="1200 orders", shipping="Standard", image="🎧", brand="RazerX", is_recommended=True, description="Surround sound wired gaming headpiece system equipped with crystal clear omnidirectional microphones."),
            Product(name="Smartwatch silver color modern", price="$10.30", category="Electronics", rating="4.3", orders="850 orders", shipping="Standard", image="⌚", brand="Generic", is_recommended=True, description="Sleek brushed aluminum wrist smart-capsule processing activity and dynamic calendar notification lines."),
            Product(name="Clay pottery for men leather horizontal", price="$10.30", category="Home interiors", rating="4.6", orders="45 orders", shipping="Standard", image="🏺", brand="Artisan", is_recommended=True, description="Handcrafted terracotta structural vase ornament built for aesthetic tabletop placement setups."),
            Product(name="Jeans bag for travel for men secondary layout", price="$80.95", category="Clothes and wear", rating="4.5", orders="70 orders", shipping="Free Shipping", image="🎒", brand="Samsung", is_recommended=True, description="Heavy-duty double strap denim shoulder backpack constructed with reinforced zip track margins.")
        ]
        
        db.session.add_all(products)
        db.session.commit()
        print("✅ All items seeded into backend successfully!")

with app.app_context():
    db.create_all()
    seed_database_if_empty()


# ==================== AUTHENTICATION API ENDPOINTS ====================

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    
    if not username or not password:
        return jsonify({"error": "Username and password are required fields."}), 400
        
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username is already taken."}), 400
        
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": True, "message": "User registered successfully."}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid username or password credentials."}), 401
        
    return jsonify({"success": True, "username": user.username}), 200


# ==================== PRODUCT API ROUTES ====================

@app.route('/api/products', methods=['GET'])
def get_products():
    category_filter = request.args.get('category')
    search_filter = request.args.get('search')
    is_rec = request.args.get('recommended')
    
    query = Product.query
    
    if is_rec is not None:
        query = query.filter_by(is_recommended=(is_rec.lower() == 'true'))
    elif category_filter or search_filter:
        pass
    else:
        query = query.filter_by(is_recommended=False)
        
    if category_filter:
        query = query.filter(Product.category.ilike(category_filter))
        
    if search_filter:
        query = query.filter(
            (Product.name.ilike(f"%{search_filter}%")) | 
            (Product.description.ilike(f"%{search_filter}%"))
        )
        
    results = query.all()
    return jsonify([{
        "id": p.id, "name": p.name, "price": p.price, "category": p.category,
        "rating": p.rating, "orders": p.orders, "shipping": p.shipping,
        "image": p.image, "description": p.description, "brand": p.brand
    } for p in results])

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_detail(product_id):
    p = Product.query.get_or_404(product_id)
    return jsonify({
        "id": p.id, "name": p.name, "price": p.price, "category": p.category,
        "rating": p.rating, "orders": p.orders, "shipping": p.shipping,
        "image": p.image, "description": p.description, "brand": p.brand
    })


# ==================== ADMIN PRODUCT MANAGEMENT API ROUTES ====================

@app.route('/api/admin/products', methods=['POST'])
def admin_add_product():
    data = request.get_json() or {}
    name = data.get('name')
    price = data.get('price')
    category = data.get('category')
    image = data.get('image', '📦')
    description = data.get('description', '')
    brand = data.get('brand', 'Generic')

    if not name or not price or not category:
        return jsonify({"error": "Name, price, and category are required fields."}), 400

    new_product = Product(
        name=name, price=price, category=category, rating="5.0", 
        orders="0 orders", shipping="Standard", image=image, 
        brand=brand, is_recommended=False, description=description
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"success": True, "message": "Product created successfully."}), 201

@app.route('/api/admin/products/<int:product_id>', methods=['PUT'])
def admin_edit_product(product_id):
    p = Product.query.get_or_404(product_id)
    data = request.get_json() or {}

    p.name = data.get('name', p.name)
    p.price = data.get('price', p.price)
    p.category = data.get('category', p.category)
    p.image = data.get('image', p.image)
    p.description = data.get('description', p.description)
    p.brand = data.get('brand', p.brand)

    db.session.commit()
    return jsonify({"success": True, "message": "Product updated successfully."})

@app.route('/api/admin/products/<int:product_id>', methods=['DELETE'])
def admin_delete_product(product_id):
    p = Product.query.get_or_404(product_id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({"success": True, "message": "Product deleted successfully."})


# ==================== CART API ROUTES ====================

@app.route('/api/cart', methods=['GET', 'POST'])
def handle_cart():
    if request.method == 'GET':
        cart_entries = CartItem.query.all()
        return jsonify([{
            "id": entry.id, "product_id": entry.product_id, "name": entry.product.name,
            "price": entry.product.price, "image": entry.product.image,
            "category": entry.product.category, "quantity": entry.quantity
        } for entry in cart_entries])
        
    elif request.method == 'POST':
        data = request.get_json() or {}
        p_id = data.get('product_id')
        if not p_id:
            return jsonify({"error": "Missing item target"}), 400
        existing = CartItem.query.filter_by(product_id=p_id).first()
        if existing:
            existing.quantity += 1
        else:
            db.session.add(CartItem(product_id=p_id, quantity=1))
        db.session.commit()
        return jsonify({"success": True})

@app.route('/api/cart/<int:item_id>', methods=['DELETE'])
def delete_cart_item(item_id):
    entry = CartItem.query.get_or_404(item_id)
    db.session.delete(entry)
    db.session.commit()
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True, port=5000)