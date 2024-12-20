import { useNavigate } from 'react-router-dom';
import closeUpGreenLeavesNature from '../assets/close-up-green-leaves-nature.png';

export const ErrorPage401 = () => {
  const navigate = useNavigate();

  // Navigasi ke halaman login
  const handleGoLogin = () => {
    navigate('/sign-in'); // Arahkan ke halaman login
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-50">
      {/* Background Image Fullscreen */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${closeUpGreenLeavesNature})`,
          filter: 'brightness(0.85)', // Menambahkan filter untuk gelap pada background
        }}
      ></div>

      {/* Content Section */}
      <div className="relative flex flex-col md:flex-row max-w-[1440px] w-full min-h-screen bg-neutral-50 items-center z-10">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 p-10">
          <img className="w-full object-cover max-h-[900px] rounded-lg" alt="Close up green" src={closeUpGreenLeavesNature} />
        </div>

        {/* Error Message Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-12 lg:p-24 space-y-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-red-600">401 - Tidak Diberikan Akses</h1>
            <p className="mt-4 text-xl font-semibold text-[#000000cc]">Anda perlu masuk untuk mengakses halaman ini.</p>
          </div>

          {/* Button to go to login */}
          <button type="button" onClick={handleGoLogin} className="w-full max-w-md h-14 bg-tanamanku-2 hover:bg-tanamanku-3 active:bg-tanamanku-4 rounded-lg font-bold text-black mt-6">
            Masuk Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage401;
