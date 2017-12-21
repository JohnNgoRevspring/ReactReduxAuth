import nodemailer from "nodemailer";

const from = '"Note" <xxxx@gmail.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmail(user) {
  // const tranport = setup();
  // const email = {
  //   from,
  //   to: user.email,
  //   subject: "Welcome to Note",
  //   text: `
  //   Welcome to Note. Please, confirm your email.

  //   ${user.generateConfirmationUrl()}
  //   `
  // };

  // tranport.sendMail(email);
  let text = `
     Welcome to Note. Please, confirm your email.

     ${user.generateConfirmationUrl()}
     `;
  contact('xxxxx@gmail.com', "Welcome to Note",text);
}

export function sendResetPasswordEmail(user) {
  // console.log('sendResetPasswordEmail');
  // const tranport = setup();
  // const email = {
  //   from,
  //   to: user.email,
  //   subject: "Reset Password",
  //   text: `
  //   To reset password follow this link

  //   ${user.generateResetPasswordLink()}
  //   `
  // };

  // tranport.sendMail(email);
  let text = `
    To reset password follow this link

     ${user.generateResetPasswordLink()}
     `
  contact('xxxx@gmail.com', "Reset Password",text);
}

function contact(from, subject, message ){
  var to = 'xxxx@gmail.com';
  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
          user: "xx@gmail.com",
          pass: "xxxxxx"
      }
  });
  var mailOptions = {
      from: from,
      to: to, 
      subject: subject +' | dev test !',
      text: message
  }
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }
  });
}
