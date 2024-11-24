import { Navigate, Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './App.css';
import SignUp from './pages/SignUp';
import EmailCreate from './pages/EmailCreate';
import EmailCode from './pages/EmailCode';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordAdmin from './pages/ForgotPasswordAdmin';
import NewPassword from './pages/NewPassword';
import NewPasswordAdmin from './pages/NewPasswordAdmin';
import Beranda from './pages/Beranda';
import SplashScreen from './pages/SplashScreen';
import SplashScreenLogin from './pages/SplashScreenLogin';
import BerandaLogin from './pages/BerandaLogin';
import SignInAdmin from './pages/SignInAdmin';
import Admin from './pages/Admin';
import AdminPanduan from './pages/AdminPanduan';
import AdminArtikel from './pages/AdminArtikel';
import PersonalSetting from './pages/PersonalSetting';
import PasswordSetting from './pages/PasswordSetting';
import TambahArtikel from './pages/TambahArtikel';
import TambahPanduan from './pages/TambahPanduan';
import IsiArtikel from './pages/IsiArtikel';
import IsiPanduan from './pages/IsiPanduan';
import EditArtikel from './pages/EditArtikel';
import EditIsiArtikel from './pages/EditIsiArtikel';
import AppearanceSettings from './pages/AppearanceSettings';
import OtherSettings from './pages/OtherSettings';
import EditPanduan from './pages/EditPanduan';
import EditIsiPanduan from './pages/EditIsiPanduan';
import PersonalSettingAdmin from './pages/PersonalSettingAdmin';
import PasswordSettingAdmin from './pages/PasswordSettingAdmin';
import OtherSettingAdmin from './pages/OtherSettingAdmin';
import FormOtherSettingAdmin from './pages/FormOtherSettingAdmin';
import ArticlesPage from './pages/ArticlesPage';
import ArticlesPageLogin from './pages/ArticlesPageLogin';
import Article from './pages/Article';
import ArticleLogin from './pages/ArticleLogin';
import Tentangkami from './pages/Tentangkami';
import Tentangkamilogin from './pages/Tentangkamilogin';
import DeteksiPenyakit from './pages/DeteksiPenyakit';
import IdentifikasiAi from './pages/IdentifikasiAi';
import HistoryDeteksi from './pages/HistoryDeteksi';
import Panduan from './pages/Panduan';
import PanduanLogin from './pages/Panduan-Login';
import Tips from './pages/Tips';
import TipsLogin from './pages/Tips-Login';
import { useAuthStore } from './store/FetchDataWithAxios';

// Modifikasi ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'warning',
      title: 'Harus login dulu! Anda akan dialihkan!',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return <Navigate to="/sign-in" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/create-with-email" element={<EmailCreate />} />
      <Route path="/email-code" element={<EmailCode />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/beranda" element={<Beranda />} />
      <Route path="/artikel-penyakit-tanaman" element={<ArticlesPage />} />
      <Route
        path="/artikel-penyakit-tanaman-login"
        element={
          <ProtectedRoute>
            <ArticlesPageLogin />
          </ProtectedRoute>
        }
      />
      <Route path="/article/:id" element={<Article />} />
      <Route
        path="/article-login/:id"
        element={
          <ProtectedRoute>
            <ArticleLogin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/splash-login"
        element={
          <ProtectedRoute>
            <SplashScreenLogin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/beranda-login"
        element={
          <ProtectedRoute>
            <BerandaLogin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/personal-setting"
        element={
          <ProtectedRoute>
            <PersonalSetting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/password-setting"
        element={
          <ProtectedRoute>
            <PasswordSetting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appearance-setting"
        element={
          <ProtectedRoute>
            <AppearanceSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/other-setting"
        element={
          <ProtectedRoute>
            <OtherSettings />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}

export default App;
