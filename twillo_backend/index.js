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


      const response = await client.messages.create({
        body: message,
        from: 'whatsapp:+14**********', // Your Twilio Sandbox Number
        to: `whatsapp:${to}`,
      });
      console.log(`Message sent to ${to}: ${response.sid}`);


//when using message service 

        const response = await client.messages.create({
            body: message,
            messagingServiceSid: 'MGXXXXXXXXXXXXXXX', // Your Twilio Messaging Service SID
            to: `whatsapp:${to}`,
        });

        console.log(`Message sent to ${to}: ${response.sid}`);


//When having template and using the message service 

        const response = await client.messages.create({
            messagingServiceSid: 'MGXXXXXXXXXXXXXXX', // Your Twilio Messaging Service SID
            contentSid: 'HXXXXXXXXXXXXXXX', // Your pre-approved Twilio Template SID
            contentVariables: JSON.stringify({ 1: "John Doe" }), // Variables for the template
            to: `whatsapp:${to}`,
        });

        console.log(`Template message sent to ${to}: ${response.sid}`);



