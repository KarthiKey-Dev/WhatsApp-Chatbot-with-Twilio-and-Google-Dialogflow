import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";
import dialogflow from "@google-cloud/dialogflow";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import {
  TWILIO_PHONE_NUMBER,
  PROJECT_ID,
  TWILIO_AUTH_TOKEN,
  TWILIO_ACC_SSID,
} from "./API_KEYS.js";

const keyFilename = "./service_account.json";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const twilioAccountSid = TWILIO_ACC_SSID;
const twilioAuthToken = TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(twilioAccountSid, twilioAuthToken);

const sessionId = uuidv4();
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
