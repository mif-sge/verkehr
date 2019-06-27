import logging

from lib.proto import computing_pb2, computing_pb2_grpc

from . import path_evaluator, bus_router, vehicle_router

class NavigationServicer(computing_pb2_grpc.NavigationServicer):
    def shortestPath(self, request, context):
        route = path_evaluator.shortest_path(request.startNode, request.endNode)
        return computing_pb2.NavigationResponse(steps=route)

    def busRoute(self, request, context):
        route = bus_router.route(request.start, request.end)
        return computing_pb2.BusNavigationResponse(steps=route)

    def vehicleRoute(self, request, context):
        route = vehicle_router.route(request.current, request.hasTargetPosition, request.targetPosition, request.targetLocation)
        return computing_pb2.RouteNavigationResponse(steps=route)