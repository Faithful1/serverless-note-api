import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
    // request body is passed in as json encoded string in event.body
    const data = JSON.parse(event.body);

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

    await dynamoDb.put(params);
    return params.Item;
});