import React from 'react';
import site from './siteContent.json';
import logo from './assets/logo.png';
import executiveImage from './assets/rooms/generated/room-desktop-02.png';
import prestigeImage from './assets/rooms/generated/room-desktop-14.png';
import deluxeImage from './assets/rooms/generated/room-desktop-15.png';
import comfortImage from './assets/rooms/generated/room-desktop-17.png';
import './App.css';

export function PageLinks() {
  return <nav className="content-links" aria-label="Explore THE BARLI">{site.pages.filter(page => page.path !== '/').map(page => <a key={page.path} href={page.path}>{page.name}</a>)}</nav>;
}

export function RoomCards() {
  const rooms = [
    { path: '/rooms/executive-suite', title: 'Executive Suite', image: executiveImage },
    { path: '/rooms/prestige-room', title: 'Prestige Room', image: prestigeImage },
    { path: '/rooms/deluxe-room', title: 'Deluxe Room', image: deluxeImage },
    { path: '/rooms/comfort-room', title: 'Comfort Room', image: comfortImage },
  ];
  return <div className="stay-grid">{rooms.map((room, index) => <a className="stay-card" href={room.path} key={room.path}>
    <img src={room.image} alt={`${room.title} at The Barli, Abuja`} loading="lazy" />
    <span className="stay-card__number">0{index + 1}</span>
    <span className="stay-card__title">{room.title}</span>
    <span className="stay-card__action">Explore room <span aria-hidden="true">↗</span></span>
  </a>)}</div>;
}

export default function ContentPage({ page }) {
  const isRoom = page.path.startsWith('/rooms/');
  return <div className="barli-app content-page">
    <header className="content-header"><a className="content-brand" href="/" aria-label="THE BARLI home"><img src={logo} alt="" /><span>THE BARLI<small>JABI, ABUJA</small></span></a><a className="content-booking" href="https://wa.me/2349167000099">Book your stay <span aria-hidden="true">↗</span></a></header>
    <main className="content-main">
      <section className="content-hero">
        <img src={executiveImage} alt={`${page.name} at The Barli Hotel & Apartments`} />
        <div className="content-hero__scrim" />
        <div className="content-hero__copy"><p className="section-kicker">THE BARLI · JABI, ABUJA</p><h1>{page.name}</h1><p>{page.description}</p></div>
      </section>
      <div className="section-shell content-body">
      {page.path === '/faq' ? site.faq.map(item => <section key={item.question}><h2>{item.question}</h2><p>{item.answer}</p></section>) : <>
        {!isRoom && <><h2>Thoughtful hospitality in Jabi</h2><p>Private apartments, thoughtful service, and a more personal way to experience Abuja.</p><ul>{site.amenities.map(amenity => <li key={amenity}>{amenity}</li>)}</ul></>}
        <h2>{isRoom ? 'Rates and availability' : 'Plan your stay'}</h2>
        <p>{page.copy || 'Contact our bookings team to confirm current rates, availability and the details of your stay.'}</p>
        <a className="text-link" href={`https://wa.me/2349167000099?text=${encodeURIComponent(`Hello THE BARLI, I would like to enquire about ${page.name}.`)}`}>Enquire on WhatsApp</a>
      </>}
      <section><h2>Find THE BARLI</h2><address>{site.address}, Nigeria</address><p><a href="tel:+2349167000099">{site.phone}</a></p></section>
      <section className="content-related"><p className="section-kicker">DISCOVER MORE</p><h2>Find your stay</h2><RoomCards /></section>
      <PageLinks />
      </div>
    </main>
    <footer className="content-footer"><span>© 2026 THE BARLI</span><span>29 ASHEIK JARMA STREET · JABI, ABUJA</span></footer>
  </div>;
}
