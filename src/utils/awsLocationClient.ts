import { LocationClient } from "@aws-sdk/client-location";
import { AWS_ACCESS_KEY, AWS_SECRET_KEY } from "../secret";

const awsLocationClient = new LocationClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY!,
    secretAccessKey: AWS_SECRET_KEY!,
  },
});

export default awsLocationClient;
