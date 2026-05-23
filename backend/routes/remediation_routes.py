from flask import Blueprint
from flask import request

from services.remediation_service import (
    remediate_firewall
)

remediation_bp = Blueprint(
    "remediation",
    __name__
)


@remediation_bp.route(
    "/remediate/firewall",
    methods=["POST"]
)
def firewall_remediation():

    data = request.json

    result = remediate_firewall(
        data["ip"],
        data["username"],
        data["password"]
    )

    return result