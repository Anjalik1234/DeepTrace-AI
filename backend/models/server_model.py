from database.db import (
    servers_collection
)


def create_server(server_data):

    return servers_collection.insert_one(
        server_data
    )


def get_all_servers():

    return list(
        servers_collection.find()
    )