from lib.proto import computing_pb2, computing_pb2_grpc

from . import route_optimizer

class RoutePlanningServicer(computing_pb2_grpc.RoutePlanningServicer):
    def optimizeRoutes(self, request, context):

        routes = route_optimizer.optimize(request.vehicles, request.depot, request.maxDistance)
        return computing_pb2.RoutesOptimizationResponse(routes=routes)