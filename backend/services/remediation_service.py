from services.ssh_service import (
    run_ssh_command
)


def remediate_firewall(
    ip,
    username,
    password
):

    command = "sudo -S ufw --force enable"

    result = run_ssh_command(
        ip,
        username,
        password,
        command
    )

    if result["success"]:

        return {
            "status": "SUCCESS",
            "message":
            "Firewall remediation executed successfully.",

            "output":
            result["output"]
        }

    return {
        "status": "FAILED",
        "message":
        "Firewall remediation failed.",

        "error":
        result["error"]
    }