from flask import Blueprint
from flask import request

from services.compliance_service import (
    run_compliance_scan
)

compliance_bp = Blueprint(
    "compliance",
    __name__
)


@compliance_bp.route(
    "/scan/compliance",
    methods=["POST"]
)
def compliance_scan():

    data = request.json

    result = run_compliance_scan(
        data["ip"],
        data["username"],
        data["password"]
    )

    return result