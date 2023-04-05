import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const documentClient = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event:any) => {
  const userId = event.pathParameters?.userId;

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "userId is required" }),
    };
  }

  try {
    const result = await documentClient
      .query({
        TableName: process.env.USER_CATEGORIES_TABLE!,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
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
