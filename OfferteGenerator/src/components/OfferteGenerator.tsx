import React, { useState } from 'react';

interface Product {
  stappen: string[];
  prijsPerStap: number[];
}

const products: { [key: string]: Product } = {
  stoel: {
    stappen: ['Kies type stoel', 'Kies bekleding', 'Kies kleur'],
    prijsPerStap: [50, 10, 5], // Prijs per stap voor stoel
  },
  tafel: {
    stappen: ['Kies aantal poten', 'Kies lengte', 'Kies breedte', 'Kies houtsoort'],
    prijsPerStap: [25, 5, 5, 7], // Prijs per stap voor tafel
  },
};

const OfferteGenerator: React.FC = () => {
  const [product, setProduct] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(e.target.value);
    setCurrentStep(0);
    setSelectedOptions([]);
  };

  const handleNextStep = () => {
    if (currentStep < products[product].stappen.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateOfferte();
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOptions([...selectedOptions, option]);
    handleNextStep();
  };

  const generateOfferte = () => {
    // Bereken totale prijs op basis van geselecteerde opties
    const totalPrice = selectedOptions.reduce((acc, option, index) => {
      return acc + products[product].prijsPerStap[index];
    }, 0);

    alert(`Uw offerte voor de ${product} bedraagt €${totalPrice}.`);
    window.location.reload();
  };

  return (
    <div className=' bg-gray-600 text-white p-4 w-3/5 h-1/2'>
      <h1 className='text-lg  font-bold text-center'>Offerte Generator</h1>

      {!product && (
        <div className="product_container flex gap-2 justify-center pt-2 cursor-pointer">
          <label>Kies een product:</label>
          <select className='text-black' value={product} onChange={handleProductChange}>
            <option value="">Selecteer...</option>
            <option value="stoel">Stoel</option>
            <option value="tafel">Tafel</option>
          </select>
        </div>
      )}

      {product && (
        <div className='flex items-center flex-col pt-2'>
          <h3 className='font-bold '>{products[product].stappen[currentStep]}</h3>
          <ul className='cursor-pointer'>
            {product === 'stoel' && currentStep === 0 && (
              <li onClick={() => handleOptionSelect('Bureaustoel ')}>Bureaustoel</li>
            )}
            {product === 'stoel' && currentStep === 0 && (
              <li onClick={() => handleOptionSelect('Eetstoel')}>Eetstoel</li>
            )}
            {product === 'stoel' && currentStep === 1 && (
              <li onClick={() => handleOptionSelect('Leer')}>Leer</li>
            )}
            {product === 'stoel' && currentStep === 1 && (
              <li onClick={() => handleOptionSelect('Stof')}>Stof</li>
            )}
            {product === 'stoel' && currentStep === 2 && (
              <li onClick={() => handleOptionSelect('Wit')}>Wit</li>
            )}
            {product === 'stoel' && currentStep === 2 && (
              <li onClick={() => handleOptionSelect('Grijs')}>Grijs</li>
            )}
            {product === 'tafel' && currentStep === 0 && (
              <li onClick={() => handleOptionSelect('2')}>2</li>
            )}
            {product === 'tafel' && currentStep === 0 && (
              <li onClick={() => handleOptionSelect('4')}>4</li>
            )}
            {product === 'tafel' && currentStep === 1 && (
              <li onClick={() => handleOptionSelect('100')}>100 cm</li>
            )}
            {product === 'tafel' && currentStep === 1 && (
              <li onClick={() => handleOptionSelect('150')}>150 cm</li>
            )}
            {product === 'tafel' && currentStep === 2 && (
              <li onClick={() => handleOptionSelect('50')}>50 cm</li>
            )}
            {product === 'tafel' && currentStep === 2 && (
              <li onClick={() => handleOptionSelect('75')}>75 cm</li>
            )}
            {product === 'tafel' && currentStep === 3 && (
              <li onClick={() => handleOptionSelect('Eiken')}>Eiken</li>
            )}
            {product === 'tafel' && currentStep === 3 && (
              <li onClick={() => handleOptionSelect('Beuken')}>Beuken</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OfferteGenerator;
