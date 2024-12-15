// middleware/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback', // Sesuaikan URL
      passReqToCallback: true, // Penting untuk mengakses req
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google profile:', profile); // Logging
        let user = await User.findByGoogleId(profile.id);

        if (!user) {
          user = await User.findByEmail(profile.emails[0].value);

          if (user) {
            await User.update(user.id, { googleId: profile.id, isVerified: true });
          } else {
            user = await User.create({
              email: profile.emails[0].value,
              name: profile.displayName,
              googleId: profile.id,
              isVerified: true,
              password: null, // Atur password ke null
            });
          }
        }

        // Hapus pemanggilan generateTokenAndSetCookie dari sini
        // generateTokenAndSetCookie(req.res, user.id);

        return done(null, user);
      } catch (error) {
        console.error('Error in GoogleStrategy:', error); // Logging error
        return done(error, null);
      }
    }
  )
);

// Serialize dan Deserialize (Opsional jika menggunakan session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
