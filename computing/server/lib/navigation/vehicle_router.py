from lib.database import driver
from . import path_evaluator

def get_record_id(records):
    for record in records:
        return record["p"].get('id')

def exec_find_hospital(tx, args):
    records = tx.run("MATCH (h:Hospital), (h)-[:LOCATES_ON]-(p:Position) RETURN collect(p)[0] as p")
    return get_record_id(records)

def exec_find_mall(tx, args):
    records = tx.run("MATCH (h:Shop), (h)-[:LOCATES_ON]-(p:Position) RETURN collect(p)[0] as p")
    return get_record_id(records)

def exec_nearest_position(tx, args):
    records = tx.run("MATCH (p:Position) WITH DISTINCT p WITH p, point({ latitude: p.latitude, longitude: p.longitude }) as c, point({ latitude: $lat, longitude: $lon }) as t ORDER BY distance(c, t) ASC RETURN p LIMIT 1", args)
    return get_record_id(records)

def route(current, has_target_position, target_position, target_location):

    pos_current = driver.exec(exec_nearest_position, { 'lat': current.lat, 'lon': current.lon })

    if has_target_position:
        pos_target = driver.exec(exec_nearest_position, { 'lat': target_position.lat, 'lon': target_position.lon })
    else:
        if target_location == 'HOSPITAL':
            pos_target = driver.exec(exec_find_hospital, {})
        elif target_location == 'SHOPPING_MALL':
            pos_target = driver.exec(exec_find_mall, {})

    if pos_current == pos_target:
        return []

    return path_evaluator.shortest_path(pos_current, pos_target)