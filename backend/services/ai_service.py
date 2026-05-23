def generate_ai_explanation(rule, status):

    explanations = {

        "Firewall Status": {
            "FAIL": {
                "risk":
                "Firewall is disabled which may expose the server to unauthorized inbound traffic.",

                "recommendation":
                "Enable firewall using: sudo ufw enable"
            },

            "PASS": {
                "risk":
                "Firewall protection is active and reducing external attack surface.",

                "recommendation":
                "Continue monitoring firewall policies regularly."
            }
        },


        "SSH Root Login": {
            "FAIL": {
                "risk":
                "Root SSH login may allow attackers to gain full system access through brute-force attacks.",

                "recommendation":
                "Disable root login in /etc/ssh/sshd_config."
            },

            "PASS": {
                "risk":
                "Root login is disabled which improves SSH security posture.",

                "recommendation":
                "Maintain strict SSH authentication policies."
            }
        },


        "Disk Usage": {
            "PASS": {
                "risk":
                "Disk usage appears healthy and system storage is operating normally.",

                "recommendation":
                "Continue monitoring disk utilization trends."
            }
        }
    }

    if (
        rule in explanations and
        status in explanations[rule]
    ):

        return explanations[rule][status]

    return {
        "risk":
        "No AI explanation available.",

        "recommendation":
        "Manual review recommended."
    }