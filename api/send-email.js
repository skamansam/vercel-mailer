const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail({from='anonymous', email='anonymous@unknown.com', subject="My Feedback", text="I don't have any feedback. Great Job!"}) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${from}" <${email}>`, // sender address
    to: "skamansam@gmail.com", // list of receivers
    subject, // Subject line
    text, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  return info;
}

module.exports = async (request, response) => {
  const message = await sendEmail(request.body);
  response.status(200).send(message);
};