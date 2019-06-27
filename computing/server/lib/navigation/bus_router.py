from lib.proto import computing_pb2
from lib.database import driver

def exec_get_route(tx, args):
    records = tx.run("MATCH (b1:Bus_Stop { id: $b1 }), (b2:Bus_Stop { id: $b2 }), path = shortestPath((b1)-[:SERVES*]-(b2)) RETURN path", args)

    result = []

    for record in records:
        path = record["path"].nodes

        stop = None
        line = None

        for node in path:

            if 'Bus_Stop' in node.labels:

                if stop != None and line != None:

                    recs = tx.run("MATCH (b:Bus_Stop { id: $id }) RETURN b.id as i", {'id': stop.get('id')})
                    for r in recs:
                        n1 = r["i"]

                    recs = tx.run("MATCH (b:Bus_Stop { id: $id }) RETURN b.id as i", {'id': node.get('id')})
                    for r in recs:
                        n2 = r["i"]

                    result.append(computing_pb2.BusNavigationStep(id=line.get('id'), start=n1, end=n2))
                    line = None

                stop = node

            if 'Bus_Line' in node.labels:
                line = node

    return result

def route(b1, b2):
    return driver.exec(exec_get_route, {'b1': b1, 'b2': b2})