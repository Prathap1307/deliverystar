import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  isAlcohol: boolean;
}

export async function getProducts(): Promise<Product[]> {
  const params = { TableName: 'products' };
  const data = await dynamo.scan(params).promise();
  return data.Items as Product[];
}
