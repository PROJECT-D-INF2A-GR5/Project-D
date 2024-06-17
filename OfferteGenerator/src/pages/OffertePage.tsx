import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

declare module 'jspdf' {
  interface jsPDF {
      autoTable: (options: any) => void;
      lastAutoTable: {
          finalY: number;
      };
  }
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
  
    // Add title to the PDF
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Uw offerte', 10, 10);
  
    // Prepare the data for the table
    const data = [
      ['Materiaal', offerteData?.materiaal || ''],
      ['Lengte', offerteData?.lengte || ''],
      ['Breedte', offerteData?.breedte || ''],
      ['Spatrand', offerteData?.spatrand ? 'Ja' : 'Nee'],
      ['Vensterbank', offerteData?.vensterbank ? 'Ja' : 'Nee'],
      ['Boorgaten', offerteData?.boorGaten || '0'],
      ['WCD', offerteData?.WCD ? 'Ja' : 'Nee'],
      ['Randafwerking', offerteData?.randAfwerking ? 'Ja' : 'Nee'],
      ['Wasbak', offerteData?.Wasbak ? 'Ja' : 'Nee'],
      ['Zeepdispenser', offerteData?.zeepDispenser ? 'Ja' : 'Nee'],
      ['Achterwand', offerteData?.achterWand ? 'Ja' : 'Nee']
    ];
  
    // Add the table to the PDF
    doc.autoTable({
      startY: 20, // Starting Y position for the table
      head: [['Kenmerk', 'Waarde']],
      body: data,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] }, // Example styling for table header
      styles: { font: 'Helvetica', fontSize: 12 }
    });
  
    // Add the price below the table
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont('Helvetica', 'bold');
    doc.text(`Prijs: ${formatter.format(offerteData.prijs)}`, 10, finalY);
  
    // Generate the PDF and trigger the download
    doc.save(`offerte - ${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <>
    <Header/>
    <div className='h-screen w-full mt-20 p-4 bg-gradient-to-b from-white to-blue-100'>
      <div className="container mx-auto border bg-white min-w-fit w-1/2 p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">Uw Offerte</h1>
        {offerteData ? (
          <div className='flex flex-col gap-2'>
            <h2 className="text-xl font-semibold">Offerte details</h2>
            <p>Materiaal: {offerteData.materiaal}</p>
            <p>Oppervlakte : {offerteData.lengte * offerteData.breedte} m&#178;</p>
            
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
