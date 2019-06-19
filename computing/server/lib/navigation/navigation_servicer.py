from lib.proto import computing_pb2, computing_pb2_grpc

from . import path_evaluator

class NavigationServicer(computing_pb2_grpc.NavigationServicer):
    def shortestPath(self, request, context):

        route = path_evaluator.shortest_path(request.startNode, request.endNode)
        return computing_pb2.NavigationResponse(distance=10, nodes=[computing_pb2.Node(name="1", lon=10, lat=10), computing_pb2.Node(name="2", lon=11, lat=11)])