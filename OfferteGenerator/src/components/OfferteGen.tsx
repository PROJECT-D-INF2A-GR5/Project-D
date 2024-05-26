import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from './Switch';

interface KeukenbladFormData {
  materiaal: string;
  lengte: number,
  breedte: number,
  spatrand: boolean;
  vensterbank: boolean;
  boorGaten: number;
  WCD: boolean
  randAfwerking: boolean;
  Wasbak: boolean;
  zeepDispenser: boolean;
  achterWand: boolean;
  prijs: number;
}

const OfferteGen: React.FC = () => {

  const initialState = {
    materiaal: 'Graniet',
    lengte: 1,
    breedte: 1,
    spatrand: false,
    vensterbank: false,
    boorGaten: 0,
    WCD: false,
    randAfwerking: false,
    Wasbak: false,
    zeepDispenser: false,
    achterWand: false,
    prijs: 0
  };

  const [formData, setFormData] = useState<KeukenbladFormData>(initialState);
  const [currForm, setCurrForm] = useState<number>(0);
  const maxForm = 9;
  const navigate = useNavigate();
  

  const generatePrice = (data: KeukenbladFormData) => {
    let price = 0;
    price += data.boorGaten * 5;
    if (data.WCD) price += 13.50;
    if (data.Wasbak) price += 97.50 + 70 + 10.70 + 151.50;
    if (data.zeepDispenser) price += 10.70;
    if (data.randAfwerking) price += data.lengte * 28;
    if (data.spatrand) price += 300;
    if (data.vensterbank) price += 300;

    if(data.materiaal === 'Noble Desiree Grey Matt'){
      price += data.lengte * data.breedte * 247.52;
      if (data.achterWand) price += data.lengte * 309.40;
      
    }
    else if(data.materiaal === 'Noble Carrara Verzoet'){
      price += data.lengte * data.breedte * 258.4;
      if (data.achterWand) price += data.lengte * 258.4;
    }
    else if(data.materiaal === 'Taurus Terazzo White Verzoet'){
      price += data.lengte * data.breedte * 239.4;
      if (data.achterWand) price += data.lengte * 298.5;
    }
    else if(data.materiaal === 'Taurus Terazzo Black'){
      price += data.lengte * data.breedte *228.5;
      if (data.achterWand) price += data.lengte * 289.5;
      setFormData({ ...data, prijs: price });
    }
    else if(data.materiaal === 'Glencoe Verzoet'){
      price += data.lengte * data.breedte * 305.5;
      if (data.achterWand) price += data.lengte * 315.6;
    }

    setFormData({ ...data, prijs: price });

  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-100 gap-10'>
      <h1 className='text-lg font-semibold text-center'>Offerte Generator</h1>

      <form onSubmit={(e) => {
            e.preventDefault(); 
            console.log(formData); 
            localStorage.setItem('offerteData', JSON.stringify(formData));
            navigate('/offerte')
      }}
      className='flex h-1/3 flex-col justify-between w-1/3 p-4 bg-white rounded-md shadow-md text-lg'
      >

      {currForm === 0 && (
        <div className='flex-col flex gap-4'>
          <h2 className='text-lg font-semibold' >Van welk materiaal wilt u het keukenblad?</h2>
          <label>
            Materiaal:
            <select className='border-2' value={formData.materiaal} onChange={(e) => setFormData({ ...formData, materiaal: e.target.value })}>
              <option value="Noble Desiree Grey Matt">Noble Desiree Grey Matt</option>
              <option value="Noble Carrara Verzoet">Noble Carrara Verzoet</option>
              <option value="Taurus Terazzo White Verzoet">Taurus Terazzo White Verzoet</option>
              <option value="Taurus Terazzo Black">Taurus Terazzo Black</option>
              <option value="Glencoe Verzoet">Glencoe Verzoet</option>
            </select>
          </label>

            <label className='flex gap-2'>
              Lengte totaal in meter:
              <input type='number' className='border-2' value={formData.lengte} onChange={(e) => setFormData({ ...formData, lengte: Number(e.target.value) })} />
            </label>
            
            <label className='flex gap-2'>
              Breedte totaal in meter :
              <input type='number' className='border-2' value={formData.breedte} onChange={(e) => setFormData({ ...formData, breedte: Number(e.target.value) })} />
            </label>
        </div>

      )}

      {currForm === 1 && (
        <div className='flex-col flex gap-4'>
          <h2 className='text-lg font-semibold'>Wilt u een spatrand toevoegen?</h2>
          <label className='flex gap-2 items-center'>
          <Switch spanText='Een spatrand toegevoegd aan het keukenblad.' toggleValue={formData.spatrand} onToggle={() => setFormData({ ...formData, spatrand: !formData.spatrand })} />
          </label>
        </div>

      )}

            
      {currForm === 2 && (
            <div className='flex-col flex gap-4'>
              <h2 className='text-lg font-semibold'>Wilt u een vensterbank toevoegen?</h2>
              <label className='flex gap-2 items-center'>

              <Switch spanText='Een vensterbank toegevoegd aan het keukenblad.' toggleValue={formData.vensterbank} onToggle={() => setFormData({ ...formData, vensterbank: !formData.vensterbank })} />
              </label>
          </div>
      )}

      {currForm === 3 && (

        <div className='flex-col flex gap-4'>
        <h2 className='text-lg font-semibold'>Hoeveel boor gaten heeft het keukenblad nodig?</h2>
            <label>
              Boor Gaten:
              <select value={formData.boorGaten} onChange={(e) => setFormData({ ...formData, boorGaten: Number(e.target.value) })}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>
        </div>

      )}

      {currForm === 4 && (

        <div className='flex-col flex gap-4'>
        <h2 className='text-lg font-semibold'>Wilt u een contactdoos toevoegen?</h2>
              <label className='flex gap-2 items-center'>

                <Switch spanText='Een WCD toegevoegd aan het keukenblad.' toggleValue={formData.WCD} onToggle={() => setFormData({ ...formData, WCD: !formData.WCD })} />
              </label>
        </div>

      )}

      {currForm === 5 && (
          <div className='flex-col flex gap-4'>
            <h2 className='text-lg font-semibold'>Wilt u randafwerking toevoegen aan het keukenblad?</h2>
            <label className='flex gap-2 items-center'>

            <Switch spanText='Keukenblad randafwerking toegevoegd.' toggleValue={formData.randAfwerking} onToggle={() => setFormData({ ...formData, randAfwerking: !formData.randAfwerking })} />
            </label>
          </div>

      )}

      {currForm === 6 && (
          <div className='flex-col flex gap-4'>
            <h2 className='text-lg font-semibold'>Wilt u een wasbak in het keukenblad?</h2>
            <label className='flex gap-2 items-center'>

              <Switch spanText='Wasbak toegevoegd aan het keukenblad.' toggleValue={formData.Wasbak} onToggle={() => setFormData({ ...formData, Wasbak: !formData.Wasbak })} />
            </label>
        </div>
      )}

      {currForm === 7 && (
          <div className='flex-col flex gap-4'>
          <h2 className='text-lg font-semibold'>Wilt u een zeepdispenser toevoegen aan het keukenblad?</h2>
          <label className='flex gap-2 items-center'>
                  <Switch spanText='Zeepdispenser toegevoegd aan het keukenblad.' toggleValue={formData.zeepDispenser} onToggle={() => setFormData({ ...formData, zeepDispenser: !formData.zeepDispenser })} />
                </label>
          </div>
      )}

    {currForm === 8 && (

      <div className='flex-col flex gap-4'>
        <h2 className='text-lg font-semibold'>Wilt u een achterwand bij het keukenblad?</h2>
        <label className='flex gap-2 items-center'>
          Achterwand:
          <Switch spanText='Achterwand toegevoegd aan het keukenblad.' toggleValue={formData.achterWand} onToggle={() => setFormData({ ...formData, achterWand: !formData.achterWand })} />
        </label>
      </div>

      )}

    <div className="border-t-0">
            {currForm === maxForm ? (
              <div className="flex w-full justify-between">
                <button
                  onClick={() => currForm > 0 && setCurrForm(currForm - 1)}
                  type="button"
                  className=" "

                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                </button>

                <button
                  type="submit"
                  
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="flex  w-full justify-between">
                {currForm != 0 ? <button
                  onClick={() => currForm > 0 && setCurrForm(currForm - 1)}
                  type="button"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                </button>: <div></div>}

                <button
                  onClick={() => {
                      if(currForm == maxForm - 1) generatePrice(formData);
                      setCurrForm(currForm + 1);
                  }}
                  type="button"

                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            )}
    </div>

      </form>
    </div>
  )
};




export default OfferteGen;
