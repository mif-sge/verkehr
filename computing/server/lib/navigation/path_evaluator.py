import logging

from lib.proto import computing_pb2
from lib.database import driver

def exec_shortest_path(tx, args):
    records = tx.run("MATCH (l1:Location { id: $startNodeId }), (l2:Location { id: $endNodeId }), path = shortestPath((l1)-[:ROAD_TO*]-(l2)) RETURN path", args)
    
    result = []
    for record in records:
        nodes = record["path"].nodes
        for node in nodes:
            result.append(computing_pb2.Node(name=str(node["id"]), lon=1, lat=1))

    return result

def shortest_path(n1, n2):
    return driver.exec(exec_shortest_path, {"startNodeId": n1, "endNodeId": n2})