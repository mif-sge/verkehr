import sys
import logging

import geopy.distance
import numpy as np

from lib.database import driver
from lib.navigation import path_evaluator

'''def exec_get_stops(tx, args):
    records = tx.run("MATCH (b:Bus_Stop) RETURN ID(b) as stop_id")
    
    stops = []    
    for record in records:
        stops.append(record["stop_id"])

    return stops

def exec_create_matrix(tx, args):

    result = []

    for ii, i in enumerate(args['stops']):
        for ij, j in enumerate(args['stops']):
            if i == j or i > j:
                continue

            records = tx.run("MATCH (b1:Bus_Stop), (b2:Bus_Stop) WHERE ID(b1) = $ib1 AND ID(b2) = $ib2 WITH head([(p1:Position)-[:LOCATES_ON]-(b1) | p1]) as p1, head([(p2:Position)-[:LOCATES_ON]-(b2) | p2]) as p2 RETURN p1.id, p2.id", {'ib1': i, 'ib2': j})
            dist = 0

            for record in records:
                p1 = record["p1.id"]
                p2 = record["p2.id"]

                path = path_evaluator.shortest_path(p1, p2)

                for idx, step in enumerate(path):
                    if idx == 0: continue

                    prev = path[idx - 1]

                    dist += geopy.distance.distance((prev.lat, prev.lon), (step.lat, step.lon)).m

                    logging.info(dist)
            
            result.append({
                'b1': ii,
                'b2': ij,
                'dist': dist
            })

    return result

def create_matrix():
    stops = driver.exec(exec_get_stops, None)
    result = driver.exec(exec_create_matrix, {'stops': stops})

    logging.info(result)

    matrix = np.full((len(stops), len(stops)), 0)# sys.float_info.max)

    ps = []

    for e in result:

        if e['b1'] not in ps:
            ps.append(e['b1'])
        i = ps.index(e['b1'])

        if e['b2'] not in ps:
            ps.append(e['b2'])
        j = ps.index(e['b2'])

        matrix[i][j] = matrix[j][i] = e['dist']

    return {
        'matrix': matrix.tolist(),
        'stops': stops
    }'''

def exec_count_stops(tx, args):
    records = tx.run("MATCH (b:Bus_Stop) RETURN count(b) as size")

    for record in records:
        return record["size"]

def exec_get_matrix(tx, args):

    records = tx.run("MATCH (b:Bus_Stop) WITH b, head([(p:Position)-[:LOCATES_ON]-(b) | p]) as p WITH collect(p) as s UNWIND s as n UNWIND s as m WITH * WHERE id(n) < id(m) MATCH path = shortestPath((n)-[:CONNECTS*]-(m)) MATCH (bn:Bus_Stop)-[:LOCATES_ON]-(n) MATCH (bm:Bus_Stop)-[:LOCATES_ON]-(m) RETURN path, ID(bn) as bni, ID(bm) as bmi")

    matrix = np.full((args['size'], args['size']), 0)#sys.float_info.max)
    stops = []

    for record in records:
        path = record["path"].nodes
        bn = record["bni"]
        bm = record["bmi"]

        bn_i = -1
        bm_i = -1

        if bn in stops:
            bn_i = stops.index(bn)
        else:
            stops.append(bn)
            bn_i = len(stops) - 1

        if bm in stops:
            bm_i = stops.index(bm)
        else:
            stops.append(bm)
            bm_i = len(stops) - 1

        distance = 0
        street = None
        position = None
        time = 0

        for node in path:

            if "Street" in node.labels:
                street = node

            if "Position" in node.labels:
                if street != None:
                    
                    dist = geopy.distance.distance((position.get('latitude'), position.get('longitude')), (node.get('latitude'), node.get('longitude'))).m
                    
                    maxspeed = street.get('maxspeed')

                    if maxspeed == '':
                        maxspeed = '50'

                    maxspeed = int(maxspeed) / 3.6

                    time += (dist / maxspeed)
                    
                    street = None

                position = node
  
        matrix[bn_i][bm_i] = matrix[bm_i][bn_i] = time

    matrix = np.resize(matrix, (len(stops), len(stops)))

    return {
        'matrix': matrix.tolist(),
        'stops': stops
    }

def get_matrix(): 
    return driver.exec(exec_get_matrix, { 'size': driver.exec(exec_count_stops, None) }) 