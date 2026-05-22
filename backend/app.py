from flask import Flask
from flask_cors import CORS

from routes.dashboard_routes import dashboard_bp
from routes.server_routes import server_bp
from routes.ssh_routes import ssh_bp
from routes.compliance_routes import compliance_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(dashboard_bp)
app.register_blueprint(server_bp)
app.register_blueprint(ssh_bp)
app.register_blueprint(compliance_bp)


@app.route("/")
def home():

    return {
        "message": "DeepTrace AI Backend Running"
    }


if __name__ == "__main__":
    app.run(debug=True)