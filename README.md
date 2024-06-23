## Prerequisites
- **Twilio Account**: [Sign up for Twilio](https://www.twilio.com/).
- **Google Cloud Account**: [Sign up for Google Cloud](https://cloud.google.com/).

---

## Step 1: Twilio WhatsApp Sandbox Setup

### 1.1 Join the Twilio Sandbox
1. **Log in to the Twilio Console**: Go to [Twilio Console](https://www.twilio.com/console).
2. **Navigate to the WhatsApp Sandbox**:
   - In the Console, go to "Messaging".
   - Click on "Try it out" under "Send a WhatsApp message".
3. **Join the Sandbox**:
   - Follow the instructions to join the sandbox using the provided code and Twilio sandbox number.

### 1.2 Configure Webhook URL
1. **Set the Webhook URL**:
   - In the Twilio Console, under "Sandbox Configuration", set the "When a message comes in" webhook URL to your server endpoint (e.g., `http://your-ngrok-url.ngrok.io/whatsapp`).

---

## Step 2: Google Dialogflow Setup

### 2.1 Create a Dialogflow Agent
1. **Create a New Agent**:
   - Go to the [Dialogflow Console](https://dialogflow.cloud.google.com/).
   - Create a new agent.

### 2.2 Enable Dialogflow API and Create Service Account
1. **Enable the API**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Select your project and enable the Dialogflow API.
2. **Create a Service Account**:
   - Go to "IAM & Admin" > "Service Accounts".
   - Create a new service account with the roles `Dialogflow API Client` and `Dialogflow API Admin`.
   - Generate a JSON key file and download it.

---

## Step 3: Set Up Your Server

### 3.1 Install Dependencies
```bash
npm install express twilio body-parser dialogflow
```

### 3.2 Install Dependencies
1. Download service key fron google cloud and paste it in the root folder
2. create API_KEYS.js file and add all the keys

## Step 4: Expose Your Server Using ngrok

### 4.1 Install and Run ngrok
1. **Download ngrok**: [ngrok Download Page](https://ngrok.com/download).
2. **Run ngrok**:
   ```bash
   ngrok http 3000
   ```
3. **Copy the ngrok URL**: Copy the forwarding URL provided by ngrok (e.g., `http://abcdef1234.ngrok.io`).

### 4.2 Configure Webhook URL in Twilio Console
1. **Set the Webhook URL**:
   - In the Twilio Console, update the "When a message comes in" URL to the ngrok URL followed by `/whatsapp` (e.g., `http://abcdef1234.ngrok.io/whatsapp`).

---

## Step 5: Test Your Chatbot

1. **Start Your Server**:
   ```bash
   node server.js
   ```

2. **Send a WhatsApp Message**:
   - Send a message to the Twilio sandbox number from your WhatsApp.

3. **Verify the Response**:
   - Ensure that your server processes the message, communicates with Dialogflow, and sends back an appropriate response.

---

 
