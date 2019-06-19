const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + './../../../computing.proto';

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

let protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

let proto = protoDescriptor.computing;

module.exports = proto;