from lib.proto import computing_pb2
from lib.database import driver

def exec_get_route(tx, args):
    records = tx.run("MATCH (p1:Position { id: $b1 }), (p2:Position { id: $b2 }), (p1)-[:LOCATES_ON]-(b1:Bus_Stop), (p2)-[:LOCATES_ON]-(b2:Bus_Stop), path = shortestPath((b1)-[:STOPS_ON*]-(b2)) RETURN path", args)

    result = []

    for record in records:
        path = record["path"].nodes

        stop = None
        line = None

        for node in path:

            if 'Bus_Stop' in node.labels:

                if stop != None and line != None:

                    recs = tx.run("MATCH (b:Bus_Stop { name: $n }), (p:Position)-[:LOCATES_ON]-(b) RETURN collect(p)[0] as i", {'n': stop.get('name')})
                    for r in recs:
                        n1 = r["i"].get('id')

                    recs = tx.run("MATCH (b:Bus_Stop { name: $n }), (p:Position)-[:LOCATES_ON]-(b) RETURN collect(p)[0] as i", {'n': node.get('name')})
                    for r in recs:
                        n2 = r["i"].get('id')

                    result.append(computing_pb2.BusNavigationStep(id=line.get('id'), start=n1, end=n2))
                    line = None

                stop = node

            if 'Bus_Line' in node.labels:
                line = node

    return result

def route(b1, b2):
    return driver.exec(exec_get_route, {'b1': b1, 'b2': b2})