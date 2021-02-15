import * as uuid from "uuid";
import aws from "aws-sdk";

const dynamoDb = new aws.DynamoDB.DocumentClient();

export async function main(event, context) {
    // request body is passed in as json encoded string in event.body
    console.log(event);
    const data = JSON.parse(event.body);
    console.log(data);

    const params = {
        TableName: process.env.tableName,
        Item: {
            // The attributes of the item to be created
            userId: "123", // The id of the author
            noteId: uuid.v1(), // A unique uuid
            content: data.content, // parsed from request body
            attachment: data.attachment, // parsed from request body
            createdAt: Date.now(), // current unix timestamp
        },
    };

    try {
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message })
        };
    }
}