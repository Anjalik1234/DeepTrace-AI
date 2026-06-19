import pandas as pd

from sklearn.ensemble import (
    IsolationForest
)

from services.ssh_service import (
    run_ssh_command
)

from models.metrics_model import (
    get_recent_metrics
)


# REAL CPU USAGE THROUGH SSH
def get_cpu_usage(
    ip,
    username,
    password
):

    command = (
        "top -bn1 | grep 'Cpu(s)'"
    )

    result = run_ssh_command(
        ip,
        username,
        password,
        command
    )

    if result["success"]:

        output = result["output"]

        print(output)

        try:

            idle_part = output.split(",")[3]

            cpu_idle = float(
                idle_part.strip().split()[0]
            )

            cpu_usage = 100 - cpu_idle

            return round(cpu_usage, 2)

        except:

            return 0

    return 0


# REAL RAM USAGE THROUGH SSH
def get_ram_usage(
    ip,
    username,
    password
):

    command = (
        "free | grep Mem"
    )

    result = run_ssh_command(
        ip,
        username,
        password,
        command
    )

    if result["success"]:

        output = result["output"]

        try:

            values = output.split()

            total_ram = float(values[1])

            used_ram = float(values[2])

            ram_usage = (
                used_ram / total_ram
            ) * 100

            return round(ram_usage, 2)

        except:

            return 0

    return 0


# REAL DISK USAGE THROUGH SSH
def get_disk_usage(
    ip,
    username,
    password
):

    command = (
        "df / | tail -1"
    )

    result = run_ssh_command(
        ip,
        username,
        password,
        command
    )

    if result["success"]:

        output = result["output"]

        try:

            values = output.split()

            disk_percent = (
                values[4]
                .replace("%", "")
            )

            return float(disk_percent)

        except:

            return 0

    return 0


# ML ANOMALY DETECTION
def detect_anomaly(
    ip,
    cpu_usage,
    ram_usage,
    disk_usage
):

    history = get_recent_metrics(ip)

    if len(history) < 20:

        return {
            "status": "NORMAL",
            "message":
            "Not enough historical data yet."
        }
    

    training_data = []

    for metric in history:

        training_data.append({

            "cpu": metric["cpu"],

            "ram": metric["ram"],

            "disk": metric["disk"]

        })

    data = pd.DataFrame(training_data)

    model = IsolationForest(
        contamination=0.1,
        random_state=42
    )

    model.fit(data)

    prediction = model.predict(data)

    latest_prediction = prediction[-1]

    if latest_prediction == -1:

        return {
            "status": "ANOMALY",
            "message":
            "Abnormal system behavior detected."
        }

    return {
        "status": "NORMAL",
        "message":
        "System behavior appears normal."
    }


def fetch_metrics_history(ip):

    history = get_recent_metrics(ip)

    result = []

    for metric in history:

        result.append({

            "cpu": metric["cpu"],

            "ram": metric["ram"],

            "disk": metric["disk"],

            "timestamp": metric["timestamp"]

        })

    return result