let AWS  = require("aws-sdk");
let awsConfig = {
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "AKIAQOJ5XWDPRWFFHFXX",
  secretAccessKey: "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",
};
AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "User";
const emailId = "nithyaxxy@test.com";
const fetchUsers = (emailId) => {
  let params = {
    TableName: TABLE_NAME,
    Key: {
        "emailId": emailId
    }
  };
  docClient.get(params, function (err, data) {
    if(err) {
        console.log(JSON.stringify(err));
    }
    console.log("Users : " + JSON.stringify(data));
  });
 
};
module.exports = fetchUsers;
