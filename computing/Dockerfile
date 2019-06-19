FROM python:3.7.3-slim

WORKDIR /opt/traffic/computing

RUN python -m pip install --upgrade pip

COPY ./server/ .
RUN pip install -r ./requirements.txt

COPY ./computing.proto ./lib/proto
RUN python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. ./lib/proto/computing.proto

CMD ["python", "server.py"]