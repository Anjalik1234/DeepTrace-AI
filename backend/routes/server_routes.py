from flask import Blueprint
from flask import request

from services.server_service import (
    get_servers,
    add_server
)

server_bp = Blueprint(
    "servers",
    __name__
)


@server_bp.route("/servers", methods=["GET"])
def servers():

    return get_servers()


@server_bp.route("/servers", methods=["POST"])
def create_server():

    data = request.json

    new_server = add_server(data)

    return {
        "message": "Server added successfully",
        "server": new_server
    }