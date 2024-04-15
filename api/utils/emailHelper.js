import nodemailer from 'nodemailer';

const emailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oussama.rahmouni.manager@gmail.com',  // Your email
      pass: 'gqal epff lrxl hjvj',
    },
  });
};

const sendEmail = async (options) => {
  const transporter = emailTransporter();
  try {
    const result = await transporter.sendMail(options);
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
};

export default sendEmail;
