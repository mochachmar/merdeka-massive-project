import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CardPanduan({ plants = [] }) {
  const navigate = useNavigate();

  // Fungsi untuk scroll ke atas sebelum navigasi
  const handleNavigate = () => {
    window.scrollTo(0, 0);
    navigate('/tips');
  };

  return (
    <div className="flex flex-wrap justify-center">
      {plants.map((plant, index) => (
        <div key={index} className="m-4">
          <div className="w-80 h-96 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 border" style={{ borderColor: '#91A079', borderWidth: '1px' }}>
            <img className="w-full h-40 object-cover" src={plant.image || 'https://via.placeholder.com/150'} alt={plant.name || 'Plant'} />
            <div className="p-6 flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-black text-center">{plant.name || 'Unknown Plant'}</h2>
              <p className="mt-2 text-gray-600 text-sm h-20 overflow-hidden">{plant.careInstructions || 'No care instructions available.'}</p>
              <div className="flex justify-end">
                {plant.name === 'Tomat' ? (
                  <button
                    onClick={handleNavigate}
                    className="mt-4 font-bold py-2 px-4 rounded transition duration-300"
                    style={{
                      backgroundColor: '#6D7E5E',
                      borderRadius: '10px',
                      border: '2px #91A079 solid',
                      color: 'white',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#91A079')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6D7E5E')}
                  >
                    Selengkapnya
                  </button>
                ) : (
                  <button
                    className="mt-4 font-bold py-2 px-4 rounded transition duration-300"
                    style={{
                      backgroundColor: '#6D7E5E',
                      borderRadius: '10px',
                      border: '2px #91A079 solid',
                      color: 'white',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#91A079')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6D7E5E')}
                  >
                    Selengkapnya
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardPanduan;
