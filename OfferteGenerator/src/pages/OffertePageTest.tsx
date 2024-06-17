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
  WCD: boolean;
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

const OffertePageTest: React.FC = () => {
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
    prijs: 0,
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string | number | boolean | null>(null);

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
    minimumFractionDigits: 2,
  });

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
      ['Achterwand', offerteData?.achterWand ? 'Ja' : 'Nee'],
    ];

    // Add the table to the PDF
    doc.autoTable({
      startY: 20, // Starting Y position for the table
      head: [['Kenmerk', 'Waarde']],
      body: data,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] }, // Example styling for table header
      styles: { font: 'Helvetica', fontSize: 12 },
    });

    // Add the price below the table
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont('Helvetica', 'bold');
    doc.text(`Prijs: ${formatter.format(offerteData.prijs)}`, 10, finalY);

    // Generate the PDF and trigger the download
    doc.save(`offerte - ${new Date().toLocaleDateString()}.pdf`);
  };

  const editField = (field: string, value: string | number | boolean) => {
    setEditingField(field);
    setTempValue(value);
  };

  const updateField = (field: string) => {
    setOfferteData((prevData) => ({ ...prevData, [field]: tempValue }));
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue(null);
  };

  const renderField = (label: string, field: keyof KeukenbladFormData) => {
    if (editingField === field) {
      return (
        <div className="flex gap-2">
          {typeof offerteData[field] === 'boolean' ? (
            <select
              value={tempValue ? 'Ja' : 'Nee'}
              onChange={(e) =>
                setTempValue(e.target.value === 'Ja')
              }
            >
              <option value="Ja">Ja</option>
              <option value="Nee">Nee</option>
            </select>
          ) : (
            <div>
              <label htmlFor={field}>{label}</label>
              <input
              type={typeof offerteData[field] === 'number' ? 'number' : 'text'}
              value={String(tempValue)}
              onChange={(e) => setTempValue(e.target.value)}
            />
            </div>

          )}
          <button className="p-1" onClick={() => updateField(field)}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2">
          <p>{label}: {typeof offerteData[field] === 'boolean' ? (offerteData[field] ? 'Ja' : 'Nee') : offerteData[field]}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white ml-8 p-1 rounded" onClick={() => editField(field, offerteData[field])}>bewerk</button>
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen w-full mt-20 p-4 bg-gradient-to-b from-white to-blue-100">
        <div className="container mx-auto border bg-white min-w-fit w-1/2 p-8 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-4">Uw Offerte</h1>
          {offerteData ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Offerte details</h2>
              <p>Materiaal: {offerteData.materiaal}</p>
              <p>Oppervlakte : {offerteData.lengte * offerteData.breedte} m&#178;</p>
              {renderField('Spatrand', 'spatrand')}
              {renderField('Vensterbank', 'vensterbank')}
              {renderField('Boorgaten', 'boorGaten')}
              {renderField('WCD', 'WCD')}
              {renderField('Randafwerking', 'randAfwerking')}
              {renderField('Wasbak', 'Wasbak')}
              {renderField('Zeepdispenser', 'zeepDispenser')}
              {renderField('Achterwand', 'achterWand')}
              <h2 className="text-xl font-semibold mt-4">Prijs</h2>
              {renderField('Prijs', 'prijs')}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={generatePDF}
              >
                Download Offerte
              </button>
            </div>
          ) : (
            <p>Geen offerte beschikbaar.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OffertePageTest;