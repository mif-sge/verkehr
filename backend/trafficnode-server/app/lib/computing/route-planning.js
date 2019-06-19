const grpc = require('grpc');
const proto = require('./proto');

let stub = new proto.RoutePlanning(process.env.COMPUTING_HOST, grpc.credentials.createInsecure());

module.exports = stub;