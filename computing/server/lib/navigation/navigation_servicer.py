import logging

from lib.proto import computing_pb2, computing_pb2_grpc

from . import path_evaluator

class NavigationServicer(computing_pb2_grpc.NavigationServicer):
    def shortestPath(self, request, context):
        route = path_evaluator.shortest_path(request.startNode, request.endNode)
        return computing_pb2.NavigationResponse(distance=10, nodes=route)