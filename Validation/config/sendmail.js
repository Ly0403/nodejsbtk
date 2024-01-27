const sendGridMail = require("@sendgrid/mail");

const sendMail = async (to, from, subject, html) => {
  try {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
      to,
      from,
      subject,
      html,
    };
    await sendGridMail.send(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
