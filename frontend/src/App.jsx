import { Navigate, Routes, Route } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';
import ErrorPage400 from './pages/ErrorPage400';
import ErrorPage401 from './pages/ErrorPage401';
import ErrorPage403 from './pages/ErrorPage403';
import ErrorPage404 from './pages/ErrorPage404';
import ErrorPage405 from './pages/ErrorPage405';
import ErrorPage500 from './pages/ErrorPage500';
import ErrorPage502 from './pages/ErrorPage502';
import ErrorPage503 from './pages/ErrorPage503';
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
import SplashScreenAdmin from './pages/SplashScreenAdmin';
import SplashScreenLogin from './pages/SplashScreenLogin';
import SplashScreenLoginAdmin from './pages/SplashScreenLoginAdmin';
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
import { useAuthStore } from './store/FetchDataWithAxios';
import ProtectedAdminRoute from './store/ProtectedAdminRoute'; // Import ProtectedAdminRoute
import RedirectAuthenticatedAdmin from './store/RedirectAuthenticatedAdmin'; // Import RedirectAuthenticatedAdmin

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/error-page-401" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validasi children harus ada
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/splash-login" replace />;
  }

  return children;
};

RedirectAuthenticatedUser.propTypes = {
  children: PropTypes.node.isRequired, // Validasi children harus ada
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/splash-admin" element={<SplashScreenAdmin />} />
      <Route
        path="/splash-login-admin"
        element={
          <ProtectedAdminRoute>
            <SplashScreenLoginAdmin />
          </ProtectedAdminRoute>
        }
      />
      <Route path="/error-page-400" element={<ErrorPage400 />} />
      <Route path="/error-page-401" element={<ErrorPage401 />} />
      <Route path="/error-page-403" element={<ErrorPage403 />} />
      <Route path="/error-page-404" element={<ErrorPage404 />} />
      <Route path="/error-page-405" element={<ErrorPage405 />} />
      <Route path="/error-page-500" element={<ErrorPage500 />} />
      <Route path="/error-page-502" element={<ErrorPage502 />} />
      <Route path="/error-page-503" element={<ErrorPage503 />} />
      <Route
        path="/create-with-email"
        element={
          <RedirectAuthenticatedUser>
            <EmailCreate />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/email-code"
        element={
          <RedirectAuthenticatedUser>
            <EmailCode />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/sign-in"
        element={
          <RedirectAuthenticatedUser>
            <SignIn />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/sign-in-admin"
        element={
          <RedirectAuthenticatedAdmin>
            <SignInAdmin />
          </RedirectAuthenticatedAdmin>
        }
      />
      <Route
        path="/sign-up"
        element={
          <RedirectAuthenticatedUser>
            <SignUp />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <RedirectAuthenticatedUser>
            <ForgotPassword />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/new-password"
        element={
          <RedirectAuthenticatedUser>
            <NewPassword />
          </RedirectAuthenticatedUser>
        }
      />
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
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        }
      />
      <Route path="/forgot-password-admin" element={<ForgotPasswordAdmin />} />
      <Route path="/new-password-admin" element={<NewPasswordAdmin />} />

      {/* Route Artikel */}
      <Route
        path="/admin/card-artikel"
        element={
          <ProtectedAdminRoute>
            <AdminArtikel />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/card-artikel/tambah-artikel"
        element={
          <ProtectedAdminRoute>
            <TambahArtikel />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/isi-artikel"
        element={
          <ProtectedAdminRoute>
            <IsiArtikel />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/card-artikel/edit-artikel/:id"
        element={
          <ProtectedAdminRoute>
            <EditArtikel />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/isi-artikel/edit-isi-artikel/:id"
        element={
          <ProtectedAdminRoute>
            <EditIsiArtikel />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/personal-setting"
        element={
          <ProtectedAdminRoute>
            <PersonalSettingAdmin />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/password-setting"
        element={
          <ProtectedAdminRoute>
            <PasswordSettingAdmin />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/other-setting"
        element={
          <ProtectedAdminRoute>
            <OtherSettingAdmin />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/form-other-setting"
        element={
          <ProtectedAdminRoute>
            <FormOtherSettingAdmin />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/form-other-edit-setting"
        element={
          <ProtectedAdminRoute>
            <FormOtherEditSettingAdmin />
          </ProtectedAdminRoute>
        }
      />

      {/* Route Panduan */}
      <Route
        path="/admin/card-panduan"
        element={
          <ProtectedAdminRoute>
            <AdminPanduan />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/card-panduan/tambah-panduan"
        element={
          <ProtectedAdminRoute>
            <TambahPanduan />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/card-panduan/edit-panduan/:id"
        element={
          <ProtectedAdminRoute>
            <EditPanduan />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/isi-panduan/edit-isi-panduan:id"
        element={
          <ProtectedAdminRoute>
            <EditIsiPanduan />
          </ProtectedAdminRoute>
        }
      />

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
      <Route path="/tips/:id" element={<Tips />} />
      <Route
        path="/tips-login/:id"
        element={
          <ProtectedRoute>
            <TipsLogin />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/error-page-404" replace />} />
    </Routes>
  );
}

export default App;
