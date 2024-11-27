import { Navigate, Routes, Route } from 'react-router-dom';
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
import FormOtherEditSettingAdmin from './pages/FormOtherEditSettingAdmin';
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
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/FetchDataWithAxios';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
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
      <Route path="/sign-in-admin" element={<SignInAdmin />} />
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

      {/* Route Admin */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/forgot-password-admin" element={<ForgotPasswordAdmin />} />
      <Route path="/new-password-admin" element={<NewPasswordAdmin />} />

      {/* Route Artikel */}
      <Route path="/admin/card-artikel" element={<AdminArtikel />} />
      <Route path="/admin/card-artikel/tambah-artikel" element={<TambahArtikel />} />
      <Route path="/admin/isi-artikel" element={<IsiArtikel />} />
      <Route path="/admin/card-artikel/edit-artikel/:id" element={<EditArtikel />} />
      <Route path="/admin/isi-artikel/edit-isi-artikel/:id" element={<EditIsiArtikel />} />
      <Route path="/admin/personal-setting" element={<PersonalSettingAdmin />} />
      <Route path="/admin/password-setting" element={<PasswordSettingAdmin />} />
      <Route path="/admin/other-setting" element={<OtherSettingAdmin />} />
      <Route path="/admin/form-other-setting" element={<FormOtherSettingAdmin />} />
      <Route path="/admin/form-other-edit-setting" element={<FormOtherEditSettingAdmin />} />

      {/* Route Panduan */}
      <Route path="/admin/card-panduan" element={<AdminPanduan />} />
      <Route path="/admin/card-panduan/tambah-panduan" element={<TambahPanduan />} />
      <Route path="/admin/isi-panduan" element={<IsiPanduan />} />
      <Route path="/admin/card-panduan/edit-panduan" element={<EditPanduan />} />
      <Route path="/admin/isi-panduan/edit-isi-panduan" element={<EditIsiPanduan />} />

      {/* Route Tentang Kami */}
      <Route path="/tentang-kami" element={<Tentangkami />} />
      <Route
        path="/tentang-kami-login"
        element={
          <ProtectedRoute>
            <Tentangkamilogin />
          </ProtectedRoute>
        }
      />

      {/* Route Perawatan */}
      <Route
        path="/deteksi-penyakit"
        element={
          <ProtectedRoute>
            <DeteksiPenyakit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/identifikasi-ai"
        element={
          <ProtectedRoute>
            <IdentifikasiAi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/histori-tanaman"
        element={
          <ProtectedRoute>
            <HistoryDeteksi />
          </ProtectedRoute>
        }
      />
      <Route path="/panduan" element={<Panduan />} />
      <Route
        path="/panduan-login"
        element={
          <ProtectedRoute>
            <PanduanLogin />
          </ProtectedRoute>
        }
      />
      <Route path="/tips" element={<Tips />} />
      <Route
        path="/tips-login"
        element={
          <ProtectedRoute>
            <TipsLogin />
          </ProtectedRoute>
        }
      />

      {/* <Route path="*" element={<Navigate to="/sign-in" replace />} /> */}
    </Routes>
  );
}

export default App;
