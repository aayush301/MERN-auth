const nodemailer = require("nodemailer");


exports.sendActivationEmail = async (to, url) => {
  try
  {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_SERVICE_EMAIL,
        pass: process.env.MAIL_SERVICE_PASSWORD
      }
    });
    
    const mailOptions = {
      from: process.env.MAIL_SERVICE_EMAIL,
      to,
      subject: "Email Activation",
      text: "Please activate your email",
      html: `
        <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; font-family: Arial, Helvetica, sans-serif;">
          <h2 style="text-align: center; text-transform: uppercase; color: teal;">Account Activation</h2>
          <p>You're almost set to start using our service. Just click the button below to validate your email address.</p>
          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your Email Address</a>
          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          <div>${url}</div>
        </div>
      `
    };
    
    const resp = await transport.sendMail(mailOptions);
    return Promise.resolve(resp);
  }
  catch(err) {
    return Promise.reject(err);
  }

}

exports.sendResetPasswordEmail = async (to, url) => {
  try
  {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_SERVICE_EMAIL,
        pass: process.env.MAIL_SERVICE_PASSWORD
      }
    });
    
    const mailOptions = {
      from: process.env.MAIL_SERVICE_EMAIL,
      to,
      subject: "Reset Password",
      text: "Please reset your password",
      html: `
        <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; font-family: Arial, Helvetica, sans-serif;">
          <h2 style="text-align: center; text-transform: uppercase; color: teal;">Password reset</h2>
          <p>Forgotten your password? Don't worry!! Just click the button below to reset your password.</p>
          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Reset password</a>
          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          <div>${url}</div>
        </div>
      `
    };
    
    const resp = await transport.sendMail(mailOptions);
    return Promise.resolve(resp);
  }
  catch(err) {
    return Promise.reject(err);
  }

}

