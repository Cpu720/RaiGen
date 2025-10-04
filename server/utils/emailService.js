import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS  
    }
  });
};


export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - RaiGen Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #333; margin-bottom: 10px;">Welcome to RaiGen!</h2>
            <p style="color: #666; font-size: 16px;">Please verify your email address to complete your registration.</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 20px;">Your Verification Code</h3>
            <div style="background-color: #fff; border: 2px dashed #007bff; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px;">${otp}</span>
            </div>
            <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              If you didn't request this verification code, please ignore this email.<br>
              This is an automated message, please do not reply.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, message: 'Failed to send OTP email' };
  }
};
