from lib.proto import computing_pb2, computing_pb2_grpc

from . import route_optimizer

class RoutePlanningServicer(computing_pb2_grpc.RoutePlanningServicer):
    def optimizeRoutes(self, request, context):

        opti = route_optimizer.optimize(request)

        if opti['success']:
            return computing_pb2.RoutesOptimizationResponse(routes=opti['result']['routes'])
        else:
            return None