import React from 'react';
import site from './siteContent.json';
import logo from './assets/logo.png';
import './App.css';

export function PageLinks() {
  return <nav className="content-links" aria-label="Explore THE BARLI">{site.pages.map(page => <a key={page.path} href={page.path}>{page.name || 'Home'}</a>)}</nav>;
}

export default function ContentPage({ page }) {
  const isRoom = page.path.startsWith('/rooms/');
  return <div className="barli-app content-page">
    <header className="content-header"><a href="/" aria-label="THE BARLI home"><img src={logo} alt="THE BARLI" /></a><PageLinks /></header>
    <main className="section-shell">
      <p className="section-kicker">THE BARLI · Jabi, Abuja</p>
      <h1>{page.name}</h1>
      <p>{page.description}</p>
      {page.path === '/faq' ? site.faq.map(item => <section key={item.question}><h2>{item.question}</h2><p>{item.answer}</p></section>) : <>
        {!isRoom && <><h2>Thoughtful hospitality in Jabi</h2><p>Private apartments, thoughtful service, and a more personal way to experience Abuja.</p><ul>{site.amenities.map(amenity => <li key={amenity}>{amenity}</li>)}</ul></>}
        <h2>{isRoom ? 'Rates and availability' : 'Plan your stay'}</h2>
        <p>{page.copy || 'Contact our bookings team to confirm current rates, availability and the details of your stay.'}</p>
        <a className="text-link" href={`https://wa.me/2349167000099?text=${encodeURIComponent(`Hello THE BARLI, I would like to enquire about ${page.name}.`)}`}>Enquire on WhatsApp</a>
      </>}
      <section><h2>Find THE BARLI</h2><address>{site.address}, Nigeria</address><p><a href="tel:+2349167000099">{site.phone}</a></p></section>
    </main>
    <footer className="section-shell"><PageLinks /><p>© 2026 THE BARLI</p></footer>
  </div>;
}
