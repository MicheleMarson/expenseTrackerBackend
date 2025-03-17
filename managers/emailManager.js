const nodemailer = require("nodemailer")

const emailManager = async (to, text, html, subject) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b7f996def17b5e",
      pass: "d0307a9dfce627",
    },
  });

  await transport.sendMail({
    from: "info@expence tracker.com",
    to,
    text,
    html,
    subject,
  });
};

module.exports = emailManager;
