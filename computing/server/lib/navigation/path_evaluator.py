import logging
import numpy as np

from lib.proto import computing_pb2
from lib.database import driver

def exec_shortest_path(tx, args):

    records = tx.run("MATCH (p1:Position { id: $startNodeId }), (p2:Position { id: $endNodeId }), path = shortestPath((p1)-[:CONNECTS*]-(p2)) RETURN path", args)
    
    result = []

    for record in records:
        nodes = record["path"].nodes

        lastPosition = None
        lastStreet = None

        for node in nodes:

            if "Street" in node.labels:

                if lastStreet != None and lastStreet.get('name') != node.get('name'):
                    result.append(computing_pb2.NavigationStep(street=lastStreet.get('name'), intersection=f"{lastStreet.get('name')}/{node.get('name')}", lat=lastPosition.get('latitude'), lon=lastPosition.get('longitude')))

                lastStreet = node

            if "Position" in node.labels:

                if node.get('id') == args['endNodeId']:
                    result.append(computing_pb2.NavigationStep(street=lastStreet.get('name'), lat=node.get('latitude'), lon=node.get('longitude')))

                lastPosition = node

    return result

def shortest_path(n1, n2):
    return driver.exec(exec_shortest_path, {"startNodeId": n1, "endNodeId": n2})