import logging
import time

from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

from lib.proto import computing_pb2
from lib.routing import route_matrix

from lib.occupancy import occupancy_predicter

def calculate_routes(data, stops):
    
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
            route.steps.append(stops[manager.IndexToNode(idx)])
            prev_idx = idx
            idx = solution.Value(routing.NextVar(idx))
            route.distance += routing.GetArcCostForVehicle(prev_idx, idx, v)
        
        route.steps.append(stops[manager.IndexToNode(idx)])
        routes.append(computing_pb2.Route(steps=route.steps, distance=route.distance))     
        
    return routes

def optimize(vehicles, depot, max_distance):
    
    rm = route_matrix.get_matrix()

    data = {
        'distances': rm['matrix'],
        'vehicles': vehicles,
        'depot': depot,
        'max_distance': max_distance
    }

    routes = calculate_routes(data, rm['stops'])

    return routes
