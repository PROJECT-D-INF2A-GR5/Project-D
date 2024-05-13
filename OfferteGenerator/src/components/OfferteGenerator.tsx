import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface Product {
  stappen: string[];
  prijsPerStap: number[];
}

const products: { [key: string]: Product } = {
  Graniet: {
    stappen: ['Kies vorm', 'Kies afmetingen', 'Kies kleur', 'Kies afwerking'],
    prijsPerStap: [30, 15, 10, 20], // Prijs per stap voor granieten blad
  },
  Marmer: {
    stappen: ['Kies vorm', 'Kies afmetingen', 'Kies kleur', 'Kies afwerking'],
    prijsPerStap: [40, 20, 15, 25], // Prijs per stap voor marmeren blad
  },
  Hout: {
    stappen: ['Kies vorm', 'Kies afmetingen', 'Kies houtsoort', 'Kies afwerking'],
    prijsPerStap: [20, 10, 30, 15], // Prijs per stap voor houten blad
  },
};

const OfferteGenerator: React.FC = () => {
  const [product, setProduct] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(e.target.value);
    setCurrentStep(0);
    setSelectedOptions([]);
  };
  
  useEffect(() => {
    if(selectedOptions.length < 1) return;
    if(selectedOptions.length == products[product].stappen.length){

      const offerteData = {
        product,
        stappen: products[product].stappen,
        selectedOptions,
      };
      localStorage.setItem('offerteData', JSON.stringify(offerteData));
      navigate('/offerte');

    }

  }, [selectedOptions]);

  

  const handleOptionSelect = (option: string) => {
    // Voeg de geselecteerde optie toe aan selectedOptions
    setSelectedOptions([...selectedOptions, option]);
  
    // Controleer of we bij de laatste stap zijn
    if (currentStep === products[product].stappen.length - 1) {
      // Als dit de laatste stap is, stop hier
      return;
    }
  
    // Ga naar de volgende stap
    setCurrentStep(currentStep + 1);
  }
  


  return (
    <div className='bg-gray-600 text-white p-4 w-3/5 h-1/2 rounded-md'>
      <h1 className='text-lg font-bold text-center underline'>Offerte Generator</h1>
  
      {!product && (
        <div className="product_container flex gap-2 justify-center pt-2 cursor-pointer mt-8">
          <label>Kies een keukenblad:</label>
          <select className='text-white border-white border bg-gray-600' value={product} onChange={handleProductChange}>
            <option >Selecteer...</option>
            {Object.keys(products).map((key) => (
              <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
            ))}
          </select>
        </div>
      )}
  
      {product && (
        <div className='flex items-center flex-col pt-2 mt-8'>
          <h3 className='font-bold'>{products[product].stappen[currentStep]}</h3>
          <ul className='cursor-pointer'>
            {currentStep === 0 && (
              <li className='list-disc' onClick={() => handleOptionSelect('Rechthoekig')}>Rechthoekig</li>
            )}
            {currentStep === 0 && (
              <li className='list-disc' onClick={() => handleOptionSelect('Rond')}>Rond</li>
            )}
            {currentStep === 1 && (
              <li className='list-disc' onClick={() => handleOptionSelect('60x60')}>60x60 cm</li>
            )}
            {currentStep === 1 && (
              <li className='list-disc' onClick={() => handleOptionSelect('80x80')}>80x80 cm</li>
            )}
            {currentStep === 2 && (
              <li className='list-disc' onClick={() => handleOptionSelect('Zwart')}>Zwart</li>
            )}
            {currentStep === 2 && (
              <li className='list-disc' onClick={() => handleOptionSelect('Wit')}>Wit</li>
            )}
            {currentStep === 2 && (
              <li className='list-disc' onClick={() => handleOptionSelect('Bruin')}>Bruin</li>
            )}
            {currentStep === 3 && (
              <li className='list-disc' onClick={() => handleOptionSelect('Gepolijst')}>Gepolijst</li>
            )}
            {currentStep === 3 && (
              <li className='list-disc' onClick={() => handleOptionSelect('Gezoet')}>Gezoet</li>
            )}
            {currentStep === 3 && (
              <li className='list-disc' onClick={() => handleOptionSelect('Gebrand')}>Gebrand</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )};


  

export default OfferteGenerator;
