from models.server_model import (
    create_server,
    get_all_servers
)


def get_servers():

    servers = get_all_servers()

    for server in servers:

        server["_id"] = str(
            server["_id"]
        )

    return servers


def add_server(data):

    new_server = {

        "name": data["name"],

        "ip": data["ip"],

        "status": "Monitoring"
    }

    result = create_server(
        new_server
    )

    new_server["_id"] = str(
        result.inserted_id
    )

    return new_server