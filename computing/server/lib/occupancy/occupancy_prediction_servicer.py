from lib.proto import computing_pb2, computing_pb2_grpc

from . import occupancy_predicter

class OccupancyPredictionServicer(computing_pb2_grpc.OccupancyPredictionServicer):
    def predict(self, request, context):

        result = occupancy_predicter.predict(request.routeId, request.stopId, request.timestamp)
        return computing_pb2.OccupancyPredictionResponse(boardings=result)