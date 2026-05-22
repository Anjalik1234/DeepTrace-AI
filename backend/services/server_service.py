servers = [
    {
        "id": 1,
        "name": "Production-1",
        "ip": "192.168.1.10",
        "status": "Secure"
    }
]


def get_servers():
    return servers


def add_server(data):

    new_server = {
        "id": len(servers) + 1,
        "name": data["name"],
        "ip": data["ip"],
        "status": "Monitoring"
    }

    servers.append(new_server)

    return new_server