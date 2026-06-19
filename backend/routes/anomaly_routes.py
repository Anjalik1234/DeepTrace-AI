from flask import Blueprint
from flask import request

from datetime import datetime

from models.metrics_model import (
    save_metrics
)

from services.anomaly_service import (
    detect_anomaly,
    get_cpu_usage,
    get_ram_usage,
    get_disk_usage,
    fetch_metrics_history
)

anomaly_bp = Blueprint(
    "anomaly",
    __name__
)


@anomaly_bp.route(
    "/anomalies",
    methods=["POST"]
)
def get_anomalies():

    data = request.json

    ip = data["ip"]
    username = data["username"]
    password = data["password"]


    # REAL CPU USAGE
    cpu_usage = get_cpu_usage(
        ip,
        username,
        password
    )

    ram_usage = get_ram_usage(
        ip,
        username,
        password
    )

    disk_usage = get_disk_usage(
        ip,
        username,
        password
    )

    save_metrics({

        "server_ip": ip,

        "cpu": cpu_usage,

        "ram": ram_usage,

        "disk": disk_usage,

        "timestamp": datetime.utcnow()

    })


    anomaly = detect_anomaly(
        ip,
        cpu_usage,
        ram_usage,
        disk_usage
    )

    return {

        "cpu": cpu_usage,
        "ram": ram_usage,
        "disk": disk_usage,

        "status":
        anomaly["status"],

        "message":
        anomaly["message"],

        "severity":
        (
            "HIGH"
            if anomaly["status"] == "ANOMALY"
            else "LOW"
        )
    }


@anomaly_bp.route(
    "/metrics/history/<ip>",
    methods=["GET"]
)
def metrics_history(ip):

    return fetch_metrics_history(ip)