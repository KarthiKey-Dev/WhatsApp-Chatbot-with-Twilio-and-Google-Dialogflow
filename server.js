const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const path = require("path");
const {
  TWILIO_PHONE_NUMBER,
  PROJECT_ID,
  TWILIO_AUTH_TOKEN,
  TWILIO_ACC_SSID,
} = require("./API_KEYS");

const keyFilename = path.join(__dirname, "./service_account.json");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const twilioAccountSid = TWILIO_ACC_SSID;
const twilioAuthToken = TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(twilioAccountSid, twilioAuthToken);

const sessionId = uuid.v4();
const projectId = PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient({ keyFilename });

app.post("/whatsapp", async (req, res) => {
  const incomingMsg = req.body.Body;
  const phoneNumber = req.body.From;

  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: incomingMsg,
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  const responseMessage = result.fulfillmentText;

  twilioClient.messages
    .create({
      body: responseMessage,
      from: TWILIO_PHONE_NUMBER, // Twilio sandbox number
      to: phoneNumber,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.error(err));

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
