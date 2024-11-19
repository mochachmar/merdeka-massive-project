import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/emails.js';
import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    // Check if the user already exists
    const userAlreadyExists = await User.findByEmail(email);

    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a new user
    const userId = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    // Fetch the created user
    const newUser = await User.findById(userId);

    // Generate JWT and set cookie
    generateTokenAndSetCookie(res, newUser.id);

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isVerified: newUser.isVerified,
        verificationToken: newUser.verificationToken,
        verificationTokenExpiresAt: newUser.verificationTokenExpiresAt,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    // Prepare the update data, ensuring undefined fields are replaced with null
    const updateData = {
      isVerified: true,
      verificationToken: null, // Set null instead of undefined
      verificationTokenExpiresAt: null, // Set null instead of undefined
    };

    // Update the user using the correct method (User.update instead of User.updateOne)
    await User.update(user.id, updateData);

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      user: {
        ...user, // Return the user object with updated data
        password: undefined, // Hide password
      },
    });
  } catch (error) {
    console.log('error in verifyEmail ', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT and set cookie
    generateTokenAndSetCookie(res, user.id);

    // Update the lastLogin timestamp using the correct update method
    const updateData = { lastLogin: new Date() };
    await User.update(user.id, updateData); // Use User.update instead of updateOne

    // Send response with user data, excluding the password
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        ...user, // Return the user object with updated data
        password: undefined, // Hide password
      },
    });
  } catch (error) {
    console.log('Error in login ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  res.send('login Admin route');
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logout successful' });
};

export const logoutAdmin = async (req, res) => {
  res.send('logout admin route');
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Use User.findByEmail to properly query the database for the email
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex'); // Generate a unique reset token
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Set expiration to 1 hour from now

    // Ensure reset token and expiration date are valid before saving
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt; // Set the expiration time

    // Save user with updated reset password token and expiration
    await User.update(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: new Date(resetPasswordExpiresAt),
    });

    console.log('Reset password token updated:', resetToken, resetPasswordExpiresAt);

    // Send password reset email with the reset token URL
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}new-password/${resetToken}`);

    res.status(200).json({ success: true, message: 'Password reset link sent to your email' });
  } catch (error) {
    console.log('Error in forgotPassword ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.log('Error in resetPassword ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Exclude the password field before sending the response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.log('Error in checkAuth ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};
