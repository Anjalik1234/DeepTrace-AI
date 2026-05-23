from services.ssh_service import (
    run_ssh_command
)

from services.ai_service import (
    generate_ai_explanation
)

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

    results.append(firewall)
    results.append(root_login)
    results.append(disk)

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

    return {
        "compliance_score": compliance_score,
        "passed": passed,
        "failed": failed,
        "results": results
    }