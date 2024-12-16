import { ServiceError, credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { NextResponse } from 'next/server';
import path from 'path';

// Load .proto file
const PROTO_PATH = path.resolve(process.cwd(), 'proto/users.proto');
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = loadPackageDefinition(packageDefinition) as any;

// gRPC Client
const client = new proto.DataService(
  'localhost:50051',
  credentials.createInsecure()
);

const transformJSON = (data: any) => {
  const departmentSummary: Record<string, any> = {};

  data.users.forEach((user: any) => {
    const department = user.company.department;

    if (!departmentSummary[department]) {
      departmentSummary[department] = {
        male: 0,
        female: 0,
        ageRange: null,
        hair: {},
        addressUser: {}
      };
    }

    departmentSummary[department][user.gender]++;

    const hairColor = user.hair.color;
    departmentSummary[department].hair[hairColor] =
      (departmentSummary[department].hair[hairColor] || 0) + 1;

    const fullName = `${user.firstName}${user.lastName}`;
    departmentSummary[department].addressUser[fullName] = user.address.postalCode;
  });


  Object.keys(departmentSummary).forEach((department) => {
    const ages = data.users
      .filter((user: any) => user.company.department === department)
      .map((user: any) => user.age);

    departmentSummary[department].ageRange = `${Math.min(...ages)}-${Math.max(...ages)}`;
  });

  return departmentSummary;
};


export async function GET() {
  return new Promise((resolve) => {
    client.FetchUsers({}, (error: ServiceError | null, response: any) => {
      if (error) {
        resolve(NextResponse.json({ error: 'Failed to fetch users from gRPC server' }, { status: 500 }));
      } else {
        const transformedData = transformJSON(response);
        console.log('transformedData', transformedData);
        
        resolve(NextResponse.json(transformedData, { status: 200 }));
      }
    });
  }) as Promise<Response>;
}
