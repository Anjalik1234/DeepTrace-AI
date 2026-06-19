from database.db import (
    metrics_collection
)


def save_metrics(metric_data):

    return metrics_collection.insert_one(
        metric_data
    )


def get_metrics_by_server(ip):

    return list(
        metrics_collection.find(
            {"server_ip": ip}
        )
    )

def get_recent_metrics(
    ip,
    limit=50
):

    return list(

        metrics_collection.find(
            {"server_ip": ip}
        )
        .sort("timestamp", -1)
        .limit(limit)

    )