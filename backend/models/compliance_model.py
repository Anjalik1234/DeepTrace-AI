from database.db import (
    compliance_collection
)


def save_compliance_scan(
    scan_data
):

    return compliance_collection.insert_one(
        scan_data
    )


def get_compliance_history(
    ip
):

    return list(

        compliance_collection.find(
            {
                "server_ip": ip
            }
        )

    )