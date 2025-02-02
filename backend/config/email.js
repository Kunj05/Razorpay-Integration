import emailjs from '@emailjs/nodejs';
// set Public Key as global settings
emailjs.init({
    publicKey: 'public_key',
    privateKey: 'private_key', // optional, highly recommended for security reasons
  });

async function sendEmail() {
  const templateParams = {
    to_name: 'User Name ',            // Recipient's name(User Name )
    from_name: 'MyAwesomeApp',      // Sender's name (can be dynamic)
    subject: 'Welcome to MyAwesomeApp!', // Email subject
    message: 'Thanks for signing up!',   // Email body
    to_email: 'kunjchanda@gmail.com',   // Recipient's email (dynamic)
    reply_to: 'kunj@gmail.com', // Where replies go (optional)
};

try {
    // Sending the email using EmailJS
    const response = await emailjs.send(
      'service_ID',        // Your service ID from EmailJS
      'template_ID',       // Your template ID from EmailJS
      templateParams,      // Parameters you want to send in the email
    );
    
    console.log('SUCCESS!', response.status, response.text); // Log the response on success
  } catch (err) {
    console.log('FAILED...', err);  // Log the error if something goes wrong
  }
}
sendEmail();