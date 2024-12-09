import { sendUnaryData, ServerCredentials, ServerUnaryCall, loadPackageDefinition, Server, status } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import fetch from 'node-fetch';

const PROTO_PATH = path.resolve(process.cwd(), 'proto/users.proto');

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = loadPackageDefinition(packageDefinition) as any;

const server = new Server();

server.addService(proto.DataService.service, {
  FetchUsers: async (call: ServerUnaryCall<{}, {}>, callback: sendUnaryData<{ users: any[] }>) => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data: any = await response.json();

      callback(null, { users: data.users });
    } catch (error) {
      console.error('Error fetching users:', error);
      callback({
        code: status.INTERNAL,
        message: 'Failed to fetch users from external API',
      });
    }
  },
});

// Start gRPC server
const PORT = '50051';
server.bindAsync(`0.0.0.0:${PORT}`, ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`gRPC server is running on port ${bindPort}`);
  server.start();
});
