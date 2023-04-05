import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const documentClient = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  const userId = event.pathParameters?.userId;
  const page = parseInt(event.queryStringParameters?.page || "0", 10);
  const itemsPerPage = 10;

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "userId is required" }),
    };
  }

  try {
    const result = await documentClient
      .query({
        TableName: process.env.USER_ITEMS_TABLE!,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
        Limit: itemsPerPage,
        ExclusiveStartKey: page ? { userId, itemKey: page * itemsPerPage } : undefined,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
