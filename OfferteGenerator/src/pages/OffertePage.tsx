import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { jsPDF } from 'jspdf';
 


interface KeukenbladFormData {
  materiaal: string;
  lengte: number;
  breedte: number;
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

const OffertePage: React.FC = () => {
  const [offerteData, setOfferteData] = useState<KeukenbladFormData>({
    materiaal: '',
    lengte: 0,
    breedte: 0,
    spatrand: false,
    vensterbank: false,
    boorGaten: 0,
    WCD: false,
    randAfwerking: false,
    Wasbak: false,
    zeepDispenser: false,
    achterWand: false,
    prijs: 0
  });

  useEffect(() => {
    const data = localStorage.getItem('offerteData');
    if (data) {
      setOfferteData(JSON.parse(data));
      localStorage.removeItem('offerteData'); // Verwijder offerteData na gebruik
    }
  }, []);

  const formatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  })

  const generatePDF = () => {
    const doc = new jsPDF();


    // Add content to the PDF
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Uw offerte', 10, 10);
    doc.setFontSize(14);
    doc.setFont('Helvetica', 'semibold');
    doc.text( `Materiaal: ${offerteData?.materiaal}`, 10, 20);
    doc.text( `Lengte: ${offerteData?.lengte}`, 10, 30);
    doc.text( `Breedte: ${offerteData?.breedte}`, 10, 40);
    doc.text( `Spatrand: ${offerteData?.spatrand ? "Ja" : "Nee"}`, 10, 50);
    doc.text( `Vensterbank: ${offerteData?.vensterbank ? "Ja" : "Nee"}`, 10, 60);
    doc.text( `Boorgaten: ${offerteData?.boorGaten}`, 10, 70);
    doc.text( `WCD: ${offerteData?.WCD ? "Ja" : "Nee"}`, 10, 80);
    doc.text( `Randafwerking: ${offerteData?.randAfwerking ? "Ja" : "Nee"}`, 10, 90);
    doc.text( `Wasbak: ${offerteData?.Wasbak ? "Ja" : "Nee"}`, 10, 100);
    doc.text( `Zeepdispenser: ${offerteData?.zeepDispenser ? "Ja" : "Nee"}`, 10, 110);
    doc.text( `Achterwand: ${offerteData?.achterWand ? "Ja" : "Nee"}`, 10, 120);
    doc.text( `Prijs: ${formatter.format(offerteData.prijs)}`, 10, 130);


    // Generate the PDF and trigger the download
    doc.save('sample.pdf');
  };

  return (
    <>
    <Header/>
    <div className='h-screen w-full bg-gray-100 mt-20 p-4'>
      <div className="container mx-auto border bg-white min-w-fit w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-4">Uw Offerte</h1>
        {offerteData ? (
          <div className='flex flex-col gap-2'>
            <h2 className="text-xl font-semibold">Offerte details</h2>
            <p>Materiaal: {offerteData.materiaal}</p>
            
            <p  className='flex gap-2' >Spatrand: {offerteData.spatrand ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          }</p>

            <p  className='flex gap-2' >Vensterbank: {offerteData.vensterbank ?           
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          :  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}</p>

            <p  className='flex gap-2' >Boorgaten: {offerteData.boorGaten}</p>

            <p  className='flex gap-2' >WCD: {offerteData.WCD ?           
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}</p>

            <p  className='flex gap-2' >Randafwerking: {offerteData.randAfwerking ?           
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}</p>

            <p  className='flex gap-2' >Wasbak: {offerteData.Wasbak ?           
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}</p>

            <p  className='flex gap-2' >Zeepdispenser: {offerteData.zeepDispenser ?           
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}</p>

            <p  className='flex gap-2' >Achterwand: {offerteData.achterWand ?          
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}</p>

            <h2 className="text-xl font-semibold mt-4">Prijs</h2>
            <p  className='flex gap-2' >{formatter.format(offerteData.prijs)}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => {
                generatePDF();
              }}
            >
              Download Offerte
            </button>
          </div>
        ): <p>Geen offerte beschikbaar.</p>}
      </div>
    </div>

    </>

  );
};

export default OffertePage;
