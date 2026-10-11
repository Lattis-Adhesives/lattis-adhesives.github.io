import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSystems } from './components/ProductSystems';
import { ApplicationVisualisation } from './components/ApplicationVisualisation';
import { ProcessSteps } from './components/ProcessSteps';
import { TechnicalResources } from './components/TechnicalResources';
import { EnquiryForm } from './components/EnquiryForm';
import { TechnicalFAQ } from './components/TechnicalFAQ';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<'tl-513' | 'ts-523'>('tl-513');
  const [rfqInitialProduct, setRfqInitialProduct] = useState<'tl-513' | 'ts-523' | 'both'>('tl-513');
  const [rfqInitialNote, setRfqInitialNote] = useState<string>('');

  const handleEnquireProduct = (productId: 'tl-513' | 'ts-523') => {
    setRfqInitialProduct(productId);
    setRfqInitialNote(`Enquiry for ${productId.toUpperCase()}.`);
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestDoc = (docTitle: string) => {
    setRfqInitialNote(`Requesting technical dossier: ${docTitle}.`);
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProducts = () => {
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToEnquiry = () => {
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B] overflow-x-hidden w-full">
      {/* 3-Zone Sticky Navigation Header */}
      <Header onQuoteClick={handleScrollToEnquiry} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={handleScrollToProducts}
          onEnquireClick={handleScrollToEnquiry}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* 2. Product Systems (TL-513 & TS-523) */}
        <ProductSystems
          selectedProductId={selectedProduct}
          onEnquireProduct={handleEnquireProduct}
        />

        {/* 3. Joint Mechanics Visualisation */}
        <ApplicationVisualisation />

        {/* 4. Directions for Use (4-Step Protocol) */}
        <ProcessSteps />

        {/* 5. Data Sheets & Technical Resources */}
        <TechnicalResources onRequestDoc={handleRequestDoc} />

        {/* 6. Contact & Technical Enquiry Form */}
        <EnquiryForm
          initialProduct={rfqInitialProduct}
          initialNote={rfqInitialNote}
        />

        {/* 7. Technical FAQ — Located Immediately Above Footer */}
        <TechnicalFAQ />
      </main>

      {/* 8. Minimalist Footer */}
      <Footer onEnquireClick={(p) => handleEnquireProduct(p)} />
    </div>
  );
}
