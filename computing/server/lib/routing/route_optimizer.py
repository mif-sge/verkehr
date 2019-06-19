import json
import numpy as np
import geopy.distance

from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

from lib.proto import computing_pb2

def calculate_routes(data):
    
    def distance_callback(fi, ti):
        return data['distances'][manager.IndexToNode(fi)][manager.IndexToNode(ti)]

    manager = pywrapcp.RoutingIndexManager(
            len(data['distances']), 
            data['vehicles'], 
            data['depot']
    )
    routing = pywrapcp.RoutingModel(manager)
    
    tc_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(tc_index)
    
    dimension_name = "Distance"
    routing.AddDimension(tc_index, 0, data['max_distance'], True, dimension_name)
    
    distance_dimension = routing.GetDimensionOrDie(dimension_name)
    distance_dimension.SetGlobalSpanCostCoefficient(100)
    
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
    
    solution = routing.SolveWithParameters(search_parameters)
    
    if not solution:
        return None
    
    routes = []
    
    for v in range(data['vehicles']):
        
        idx = routing.Start(v)
        
        route = computing_pb2.Route()
        
        while not routing.IsEnd(idx):
            route.steps.append(manager.IndexToNode(idx))
            prev_idx = idx
            idx = solution.Value(routing.NextVar(idx))
            route.distance += routing.GetArcCostForVehicle(prev_idx, idx, v)
        
        route.steps.append(manager.IndexToNode(idx))
        routes.append(computing_pb2.Route(steps=route.steps, distance=route.distance))     
        
    return routes

def optimize(params):

    nodes = params.nodes
    
    matrix = np.zeros((len(nodes), len(nodes)))
    
    for iindex, irow in enumerate(nodes):
        for jindex, jrow in enumerate(nodes):
            
            dist = geopy.distance.distance((irow.lat, irow.lon), (jrow.lat, jrow.lon)).m
            matrix[iindex][jindex] = matrix[jindex][iindex] = dist
 
    data = {
        'distances': matrix.tolist(),
        'vehicles': params.vehicles,
        'depot': params.depot,
        'max_distance': params.maxDistance
    }
    
    routes = calculate_routes(data)
    
    return {
        'success': True,
        'result': {
            'routes': routes
        }
    }