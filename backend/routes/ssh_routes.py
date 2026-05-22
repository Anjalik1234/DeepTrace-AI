from flask import Blueprint
from flask import request

from services.ssh_service import (
    run_ssh_command
)

ssh_bp = Blueprint(
    "ssh",
    __name__
)


@ssh_bp.route(
    "/ssh/test",
    methods=["POST"]
)
def ssh_test():

    data = request.json

    result = run_ssh_command(
        data["ip"],
        data["username"],
        data["password"],
        data["command"]
    )

    return result