import os

import time
import logging
from concurrent import futures

from dotenv import load_dotenv

import grpc

from lib.proto import computing_pb2_grpc
from lib.routing import route_planning_servicer
from lib.navigation import navigation_servicer
from lib.occupancy import occupancy_prediction_servicer

def setupServer():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    computing_pb2_grpc.add_RoutePlanningServicer_to_server(route_planning_servicer.RoutePlanningServicer(), server)
    computing_pb2_grpc.add_NavigationServicer_to_server(navigation_servicer.NavigationServicer(), server)
    computing_pb2_grpc.add_OccupancyPredictionServicer_to_server(occupancy_prediction_servicer.OccupancyPredictionServicer(), server)

    # with open('cred/server.key', 'rb') as f:
    #     private_key = f.read()
    # with open('cred/server.crt', 'rb') as f:
    #     certificate_chain = f.read()
    # 
    # credentials = grpc.ssl_server_credentials(((private_key, certificate_chain),))
    # server.add_secure_port(os.getenv('GRPC_SERVER_ENDPOINT'), credentials)

    server.add_insecure_port(os.getenv('GRPC_SERVER_ENDPOINT'))
    server.start()

    logging.info("Server listening on '%s'.", os.getenv('GRPC_SERVER_ENDPOINT'))

    try:
        while True:
            time.sleep(60 * 60 * 24)
    except KeyboardInterrupt:
        server.stop(0)

def startup():

    # Setup logging.
    logging.basicConfig(level=logging.INFO)
    logging.info("Logging enabled.")

    # Loading environment file.
    load_dotenv()
    logging.info("Environment enabled.")

    # Setup gRPC server.
    setupServer()

if __name__ == '__main__':
    startup()