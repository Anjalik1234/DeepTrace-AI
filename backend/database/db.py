from pymongo import MongoClient

MONGO_URI = "mongodb+srv://anjalikale9876_db_user:Bl0sbSg7ZrRb4bqT@cluster0.pjzeo1b.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URI)

db = client["deeptrace_ai"]

servers_collection = db["servers"]

metrics_collection = db["metrics"]

compliance_collection = db["compliance_scans"]