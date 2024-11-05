import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import EmailCreate from './pages/EmailCreate';
import EmailCode from './pages/EmailCode';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordCode from './pages/ForgotPasswordCode';
import Beranda from './pages/Beranda';
import PersonalSetting from './pages/PersonalSetting';
import PasswordSetting from './pages/PasswordSetting';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/create-with-email" element={<EmailCreate />} />
      <Route path="/email-code" element={<EmailCode />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password-code" element={<ForgotPasswordCode />} />
      <Route path="/Beranda" element={<Beranda />} />
      <Route path="/personal-setting" element={<PersonalSetting />} />
      <Route path="/password-setting" element={<PasswordSetting />} />
    </Routes>
  );
}

export default App;
