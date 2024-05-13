import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const OffertePage: React.FC = () => {
  const [offerteData, setOfferteData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('offerteData');
    console.log(data);
    if (data) {
      setOfferteData(JSON.parse(data));
      localStorage.removeItem('offerteData'); // Verwijder offerteData na gebruik
    }
  }, []);

  return (
    <>
    <Header/>
    <div className="container mx-auto mt-20 border-4 bg-gray-50 max-w-fit p-8">
      <h1 className="text-3xl font-bold mb-4">Uw Offerte</h1>
      {offerteData && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Gekozen materiaal : {offerteData.product}</h2>
          <ul>
            {offerteData.stappen.map((stap: string, index: number) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{stap}: </span>
                {offerteData.selectedOptions[index]}
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              // Simuleer het downloaden van de offerte
              alert('Offerte wordt gedownload...');
            }}
          >
            Download Offerte
          </button>
        </div>
      )}
      {!offerteData && <p>Geen offerte beschikbaar.</p>}
    </div>
    </>

  );
};

export default OffertePage;
