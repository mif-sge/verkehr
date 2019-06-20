import os
from neo4j import GraphDatabase

def exec(handler, *args):
    driver = GraphDatabase.driver(os.getenv('NEO4J_URI'), auth=(os.getenv('NEO4J_USERNAME'), os.getenv('NEO4J_PASSWORD')))

    val = None

    with driver.session() as session:
        val = session.write_transaction(handler, *args)

    driver.close()

    return val