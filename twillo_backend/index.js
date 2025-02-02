const express = require('express'); 
const twilio = require("twilio");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express(); 
const port = 3000;

app.use(express.urlencoded({ extended: false }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const subaccountSid = process.env.TWILIO_ACCOUNT_SUBACCOUNT_SID;

const client = twilio(accountSid, authToken);


async function sendWhatsAppMessage(to, message) {
    try {
      const response = await client.messages.create({
        body: message,
        from: 'whatsapp:+14**********', // Your Twilio Sandbox Number
        to: `whatsapp:${to}`,
      });
      console.log(`Message sent to ${to}: ${response.sid}`);
    } catch (error) {
      console.error(`Failed to send message: ${error}`);
    }
}

app.post('/incoming', (req, res) => {
  const message = req.body;
  console.log(`Received message from ${message.From}: ${message.Body}`);
  const twiml = new MessagingResponse();
  twiml.message(`You said: ${message.Body}`);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});


app.listen(port, () => { 
    console.log(`Server running on http://localhost:${port}`); 
});

sendWhatsAppMessage('+*******number of sender', 'Hello from Twilio WhatsApp API!'); // Replace with your phone number