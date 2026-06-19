from services.ssh_service import (
    run_ssh_command
)

from services.ai_service import (
    generate_ai_explanation
)

from services.anomaly_service import (
    detect_anomaly
)

from models.compliance_model import (
    save_compliance_scan
)

from models.compliance_model import (
    get_compliance_history
)

from datetime import datetime

# CHECK 1 — Firewall
def check_firewall(ip, username, password):

    result = run_ssh_command(
        ip,
        username,
        password,
        "sudo -S ufw status"
    )

    if result["success"]:

        output = result["output"]
        print(output)

        if "Status: active" in output:

            ai = generate_ai_explanation(
                "Firewall Status",
                "PASS"
            )

            return {
                "rule": "Firewall Status",
                "status": "PASS",
                "details": "Firewall is active",

                "risk": ai["risk"],
                "recommendation": ai["recommendation"]
            }

        ai = generate_ai_explanation(
            "Firewall Status",
            "FAIL"
        )

        return {
            "rule": "Firewall Status",
            "status": "FAIL",
            "details": "Firewall is disabled",

            "risk": ai["risk"],
            "recommendation": ai["recommendation"]
        }

    return {
        "rule": "Firewall Status",
        "status": "ERROR",
        "details": result["error"]
    }


# CHECK 2 — Root SSH Login
def check_root_login(ip, username, password):

    result = run_ssh_command(
        ip,
        username,
        password,
        "cat /etc/ssh/sshd_config"
    )

    if result["success"]:

        output = result["output"]

        if "PermitRootLogin no" in output:

            ai = generate_ai_explanation(
                "SSH Root Login",
                "PASS"
            )

            return {
                "rule": "SSH Root Login",
                "status": "PASS",
                "details": "Root login disabled",

                "risk": ai["risk"],
                "recommendation": ai["recommendation"]
            }

        ai = generate_ai_explanation(
            "SSH Root Login",
            "FAIL"
        )

        return {
            "rule": "SSH Root Login",
            "status": "FAIL",
            "details": "Root login may be enabled",

            "risk": ai["risk"],
            "recommendation": ai["recommendation"]
        }

    return {
        "rule": "SSH Root Login",
        "status": "ERROR",
        "details": result["error"]
    }


# CHECK 3 — Disk Usage
def check_disk_usage(ip, username, password):

    result = run_ssh_command(
        ip,
        username,
        password,
        "df -h /"
    )

    if result["success"]:

        output = result["output"]

        ai = generate_ai_explanation(
            "Disk Usage",
            "PASS"
        )

        return {
            "rule": "Disk Usage",
            "status": "PASS",
            "details": output,

            "risk": ai["risk"],
            "recommendation": ai["recommendation"]
        }

    return {
        "rule": "Disk Usage",
        "status": "ERROR",
        "details": result["error"]
    }


# CHECK 4 — CPU Usage
def check_cpu_usage(ip, username, password):

    result = run_ssh_command(
        ip,
        username,
        password,
        "top -bn1 | grep 'Cpu(s)'"
    )

    if result["success"]:

        output = result["output"]

        try:

            cpu_idle = float(
                output.split(",")[3]
                .replace(" id", "")
                .strip()
            )

            cpu_usage = 100 - cpu_idle

            status = "PASS"

            if cpu_usage > 80:
                status = "FAIL"

            ai = generate_ai_explanation(
                "CPU Usage",
                status
            )

            return {
                "rule": "CPU Usage",
                "status": status,
                "details": f"CPU usage is {cpu_usage:.2f}%",

                "risk": ai["risk"],
                "recommendation": ai["recommendation"]
            }

        except:

            return {
                "rule": "CPU Usage",
                "status": "ERROR",
                "details": "Unable to parse CPU usage"
            }

    return {
        "rule": "CPU Usage",
        "status": "ERROR",
        "details": result["error"]
    }


# CHECK 5 — RAM Usage
def check_ram_usage(ip, username, password):

    result = run_ssh_command(
        ip,
        username,
        password,
        "free -m"
    )

    if result["success"]:

        output = result["output"]

        try:

            lines = output.split("\n")

            memory_line = lines[1].split()

            total_ram = int(memory_line[1])

            used_ram = int(memory_line[2])

            ram_usage = (
                used_ram / total_ram
            ) * 100

            status = "PASS"

            if ram_usage > 80:
                status = "FAIL"

            ai = generate_ai_explanation(
                "RAM Usage",
                status
            )

            return {
                "rule": "RAM Usage",
                "status": status,

                "details":
                f"RAM usage is {ram_usage:.2f}%",

                "risk": ai["risk"],

                "recommendation":
                ai["recommendation"]
            }

        except:

            return {
                "rule": "RAM Usage",
                "status": "ERROR",
                "details":
                "Unable to parse RAM usage"
            }

    return {
        "rule": "RAM Usage",
        "status": "ERROR",
        "details": result["error"]
    }


# CHECK 6 — Open Port Scan
def check_open_ports(ip, username, password):

    result = run_ssh_command(
        ip,
        username,
        password,
        "ss -tuln"
    )

    dangerous_ports = [
        "21",
        "23",
        "3306",
        "6379",
        "27017"
    ]

    if result["success"]:

        output = result["output"]

        found_ports = []

        for port in dangerous_ports:

            if f":{port}" in output:

                found_ports.append(port)

        status = "PASS"

        details = "No dangerous ports detected."

        if found_ports:

            status = "FAIL"

            details = (
                "Dangerous open ports detected: "
                + ", ".join(found_ports)
            )

        ai = generate_ai_explanation(
            "Open Ports",
            status
        )

        return {
            "rule": "Open Ports",
            "status": status,
            "details": details,

            "risk": ai["risk"],

            "recommendation":
            ai["recommendation"]
        }

    return {
        "rule": "Open Ports",
        "status": "ERROR",
        "details": result["error"]
    }


# CHECK 7 — Suspicious Processes
def check_suspicious_processes(
    ip,
    username,
    password
):

    result = run_ssh_command(
        ip,
        username,
        password,
        "ps aux"
    )

    suspicious_keywords = [
        "nc",
        "netcat",
        "nmap",
        "hydra",
        "xmrig",
        "john"
    ]

    if result["success"]:

        output = result["output"].lower()

        found = []

        for keyword in suspicious_keywords:

            if keyword in output:

                found.append(keyword)

        status = "PASS"

        details = (
            "No suspicious processes detected."
        )

        if found:

            status = "FAIL"

            details = (
                "Suspicious processes detected: "
                + ", ".join(found)
            )

        ai = generate_ai_explanation(
            "Suspicious Processes",
            status
        )

        return {
            "rule":
            "Suspicious Processes",

            "status": status,

            "details": details,

            "risk": ai["risk"],

            "recommendation":
            ai["recommendation"]
        }

    return {
        "rule":
        "Suspicious Processes",

        "status": "ERROR",

        "details":
        result["error"]
    }


# CHECK 8 — Failed Login Attempts
def check_failed_logins(
    ip,
    username,
    password
):

    result = run_ssh_command(
        ip,
        username,
        password,
        "lastb | head"
    )

    if result["success"]:

        output = result["output"]

        status = "PASS"

        details = (
            "No suspicious failed logins detected."
        )

        if output.strip():

            status = "FAIL"

            details = (
                "Failed login attempts detected."
            )

        ai = generate_ai_explanation(
            "Failed Logins",
            status
        )

        return {
            "rule":
            "Failed Logins",

            "status": status,

            "details": details,

            "risk": ai["risk"],

            "recommendation":
            ai["recommendation"]
        }

    return {
        "rule":
        "Failed Logins",

        "status": "ERROR",

        "details":
        result["error"]
    }





# MAIN COMPLIANCE ENGINE
def run_compliance_scan(
    ip,
    username,
    password
):

    results = []

    firewall = check_firewall(
        ip,
        username,
        password
    )

    root_login = check_root_login(
        ip,
        username,
        password
    )

    disk = check_disk_usage(
        ip,
        username,
        password
    )

    cpu = check_cpu_usage(
        ip,
        username,
        password
    )

    ram = check_ram_usage(
        ip,
        username,
        password
    )

    ports = check_open_ports(
        ip,
        username,
        password
    )

    processes = check_suspicious_processes(
        ip,
        username,
        password
    )

    failed_logins = check_failed_logins(
        ip,
        username,
        password
    )

    results.append(firewall)
    results.append(root_login)
    results.append(disk)
    results.append(cpu)
    results.append(ram)
    results.append(ports)
    results.append(processes)
    results.append(failed_logins)

    passed = 0
    failed = 0

    for result in results:

        if result["status"] == "PASS":
            passed += 1

        elif result["status"] == "FAIL":
            failed += 1

    total = len(results)

    compliance_score = int(
        (passed / total) * 100
    )

    anomaly = {
        "status": "NORMAL",
        "message": "Anomaly detection moved to monitoring module."
    }

    results.append({

        "rule":
        "AI Anomaly Detection",

        "status":
        anomaly["status"],

        "details":
        anomaly["message"],

        "risk":
        "AI-based infrastructure anomaly analysis.",

        "recommendation":
        "Investigate unusual system behavior if anomaly persists."

    })

    save_compliance_scan({

        "server_ip": ip,

        "score": compliance_score,

        "passed": passed,

        "failed": failed,

        "timestamp": datetime.utcnow()

    })

    return {
        "compliance_score": compliance_score,
        "passed": passed,
        "failed": failed,
        "results": results
    }


def fetch_compliance_history(ip):

    history = get_compliance_history(ip)

    result = []

    for scan in history:

        result.append({

            "score": scan["score"],

            "passed": scan["passed"],

            "failed": scan["failed"],

            "timestamp": scan["timestamp"]

        })

    return result