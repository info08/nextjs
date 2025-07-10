import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verificationTokenExpires: new Date(Date.now() + 3600000) // 1 hour expiration
        });

    }catch (error) {
        console.error('Error sending email:', error);
    }
}


// export const sendVerificationEmail = async (user: any) => {
//   try {
//     // Create a transporter object using SMTP
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: parseInt(process.env.SMTP_PORT || '587', 10),
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     // Generate a verification token
//     const verificationToken = await bcrypt.hash(user.email, 10);

//     // Create the email content
//     const mailOptions = {
//       from: `"Your App Name" <${process.env.SMTP_USER}>`,
//       to: user.email,
//       subject: 'Email Verification',
//       text: `Please verify your email by clicking on the following link: 
//              ${process.env.APP_URL}/verify-email?token=${verificationToken}`,
//       html: `<p>Please verify your email by clicking on the following link:</p>
//              <a href="${process.env.APP_URL}/verify-email?token=${verificationToken}">Verify Email</a>`,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log('Verification email sent successfully');
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//   }
// };