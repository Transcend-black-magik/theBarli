import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BadgePercent, BedDouble, ChevronLeft, ChevronRight, Heart, House, Menu as MenuIcon } from 'lucide-react';
import brandLogo from './assets/logo.png';
import roomSlideOne from './assets/slideshow-images/generated/room-slide-1.png';
import roomSlideTwo from './assets/slideshow-images/generated/room-slide-2.png';
import roomSlideThree from './assets/slideshow-images/generated/room-slide-3.png';
import roomSlideFour from './assets/slideshow-images/generated/room-slide-4.png';
import roomSlideFive from './assets/slideshow-images/generated/room-slide-5.png';
import heroSlideOne from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.56.38 AM.jpeg';
import heroSlideThree from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.56.37 AM (3).jpeg';
import heroSlideFour from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.56.37 AM (2).jpeg';
import heroSlideFive from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.56.37 AM (1).jpeg';
import heroSlideSix from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.56.36 AM.jpeg';
import heroSlideEight from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.30.28 AM.jpeg';
import heroSlideTen from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.30.07 AM.jpeg';
import heroSlideEleven from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.09.36 AM.jpeg';
import heroSlideTwelve from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.09.36 AM (1).jpeg';
import heroSlideFourteen from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 12.09.24 AM.jpeg';
import heroSlideSixteen from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 1.08.05 AM.jpeg';
import heroBedroomRefined from './assets/hero-carousel/generated/hero-bedroom-refined.png';
import heroLoungeRefined from './assets/hero-carousel/generated/hero-lounge-refined.png';
import './App.css';

const viewport = { once: true, amount: 0.18 };
const cookieConsentStorageKey = 'thebarli-cookie-consent-v1';

const fadeUp = {
  hidden: { opacity: 0, y: 52 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 58, clipPath: 'inset(7% 0% 0% 0%)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const keyFeatureListReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const keyFeatureItemReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  },
};

const offerImageReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', scale: 1.08 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    scale: 1,
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
};

const offerCopyReveal = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.34,
      staggerChildren: 0.14,
    },
  },
};

const offerCopyItemReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const roomSlides = [
  {
    image: roomSlideOne,
    title: 'Prestige Room',
  },
  {
    image: roomSlideTwo,
    title: 'Prestige Room',
  },
  {
    image: roomSlideThree,
    title: 'Prestige Room',
  },
  {
    image: roomSlideFour,
    title: 'Deluxe Room',
  },
  {
    image: roomSlideFive,
    title: 'Deluxe Room',
  },
];

const amenityData = [
  {
    title: 'Infrastructure & Access',
    imageClass: 'amenity-card--access',
    features: ['24-Hour Power', 'Smart Keyless Entry', 'Reliable Security'],
  },
  {
    title: 'Logistics & Concierge',
    imageClass: 'amenity-card--concierge',
    features: ['VIP Airport Pickup', 'Driver Accommodation'],
  },
];

const attractions = [
  {
    title: 'Cultural Landmarks',
    imageClass: 'attraction-card--culture',
    credit: 'Zuma Rock photo by Fatima, CC BY-SA 4.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:The_incredible_rock._Zuma_Rock.jpg',
  },
  {
    title: 'Recreation',
    imageClass: 'attraction-card--recreation',
    credit: 'Jabi Lake photo by Turizimpressions, CC BY-SA 4.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Jabi_lake,_Abuja.jpg',
  },
];

const heroSlides = [
  heroSlideOne,
  heroLoungeRefined,
  heroSlideThree,
  heroSlideFour,
  heroSlideFive,
  heroSlideSix,
  heroBedroomRefined,
  heroSlideEight,
  heroSlideTen,
  heroSlideEleven,
  heroSlideTwelve,
  heroSlideFourteen,
  heroSlideSixteen,
];

const keyFeatures = [
  'Sleeps 2, super king bed',
  'Minibar with coffee machine and tea',
  'Complimentary welcome fruit basket',
  'Complimentary breakfast',
  'Access to guest lounge',
  'Balcony and garden dining area',
  'Secured parking',
  'WhatsApp concierge service',
  'VIP Airport Pickup',
  'Driver Accommodation',
  '24-Hour Power',
  'Smart Keyless Entry',
  'Reliable Security',
];

const navItems = [
  { href: '#home', Icon: House, label: 'Home' },
  { href: '#rooms', Icon: BedDouble, label: 'Rooms' },
  { href: '#offers', Icon: BadgePercent, label: 'Offers' },
  { href: '#events', Icon: Heart, label: 'Events' },
  { href: '#about', Icon: MenuIcon, label: 'Menu' },
];

function App() {
  const [activeRoomSlide, setActiveRoomSlide] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isCookiePanelVisible, setIsCookiePanelVisible] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);
  const headerRef = useRef(null);
  const bottomNavRef = useRef(null);
  const roomSlideshowTouchStart = useRef(null);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveRoomSlide((currentSlide) => (currentSlide + 1) % roomSlides.length);
    }, 5000);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const updateViewportInsets = () => {
      const headerHeight = Math.ceil(headerRef.current?.getBoundingClientRect().height ?? 0);
      const bottomNavHeight = Math.ceil(bottomNavRef.current?.getBoundingClientRect().height ?? 0);

      root.style.setProperty('--site-header-height', `${headerHeight}px`);
      root.style.setProperty('--bottom-nav-height', `${bottomNavHeight}px`);
    };

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateViewportInsets);
    if (headerRef.current) observer?.observe(headerRef.current);
    if (bottomNavRef.current) observer?.observe(bottomNavRef.current);
    window.addEventListener('resize', updateViewportInsets);
    updateViewportInsets();

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateViewportInsets);
      root.style.removeProperty('--site-header-height');
      root.style.removeProperty('--bottom-nav-height');
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const slideTimer = window.setInterval(() => {
      setActiveHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const updateHeaderVisibility = () => setIsHeaderVisible(window.scrollY > 24);

    updateHeaderVisibility();
    window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateHeaderVisibility);
  }, []);

  useEffect(() => {
    try {
      const savedConsent = window.localStorage.getItem(cookieConsentStorageKey);
      if (savedConsent) {
        const { analytics = false } = JSON.parse(savedConsent);
        setIsAnalyticsEnabled(Boolean(analytics));
        return;
      }
    } catch {
      // If local storage is unavailable, keep the notice available for this visit.
    }

    setIsCookiePanelVisible(true);
  }, []);

  const showPreviousRoomSlide = () => {
    setActiveRoomSlide((currentSlide) => (currentSlide - 1 + roomSlides.length) % roomSlides.length);
  };

  const showNextRoomSlide = () => {
    setActiveRoomSlide((currentSlide) => (currentSlide + 1) % roomSlides.length);
  };

  const showPreviousHeroSlide = () => {
    setActiveHeroSlide((currentSlide) => (currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const showNextHeroSlide = () => {
    setActiveHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
  };

  const handleRoomSlideshowTouchStart = (event) => {
    roomSlideshowTouchStart.current = event.touches[0].clientX;
  };

  const handleRoomSlideshowTouchEnd = (event) => {
    if (roomSlideshowTouchStart.current === null) return;

    const horizontalDistance = event.changedTouches[0].clientX - roomSlideshowTouchStart.current;
    if (Math.abs(horizontalDistance) > 40) {
      horizontalDistance < 0 ? showNextRoomSlide() : showPreviousRoomSlide();
    }
    roomSlideshowTouchStart.current = null;
  };

  const handleBookingRequest = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const emailBody = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Check-in date: ${formData.get('checkIn') || 'Not specified'}`,
      `Check-out date: ${formData.get('checkOut') || 'Not specified'}`,
      `Guests: ${formData.get('guests')}`,
      '',
      'Stay details:',
      formData.get('message') || 'Not specified',
    ].join('\n');
    const params = new URLSearchParams({ subject: 'Booking enquiry — The Barli', body: emailBody });

    window.location.href = `mailto:booking@thebarli.com?${params.toString()}`;
  };

  const handleNewsletterSignup = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('newsletter-email');
    const params = new URLSearchParams({
      subject: 'Newsletter subscription — The Barli',
      body: `Please add ${email} to The Barli newsletter.`,
    });

    window.location.href = `mailto:admin@thebarli.com?${params.toString()}`;
  };

  const saveCookieConsent = (analytics) => {
    const consent = {
      necessary: true,
      analytics: Boolean(analytics),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    try {
      window.localStorage.setItem(cookieConsentStorageKey, JSON.stringify(consent));
    } catch {
      // The selection still applies for the current visit when storage is unavailable.
    }

    setIsAnalyticsEnabled(consent.analytics);
    setIsCookieSettingsOpen(false);
    setIsCookiePanelVisible(false);
  };

  const reopenCookieSettings = () => {
    setIsCookieSettingsOpen(true);
    setIsCookiePanelVisible(true);
  };

  return (
    <div className="barli-app">
      <motion.header
        ref={headerRef}
        className="site-header"
        aria-hidden={!isHeaderVisible}
        animate={{ opacity: isHeaderVisible ? 1 : 0, y: isHeaderVisible ? 0 : -20 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isHeaderVisible ? 'auto' : 'none' }}
      >
        <a className="brand-lockup" href="#home" aria-label="The Barli home">
          <motion.img
            src={brandLogo}
            className="brand-mark"
            alt=""
            initial={{ opacity: 0, rotate: -14, scale: 0.82 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.24, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            THE BARLI
          </motion.span>
        </a>
      </motion.header>

      <main id="home">
        <section className="barli-hero" aria-labelledby="hero-title">
          <div className="barli-hero__carousel" aria-hidden="true">
            {heroSlides.map((image, index) => (
              <img
                key={image}
                className={`barli-hero__slide ${index === activeHeroSlide ? 'is-active' : ''}`}
                src={image}
                alt=""
              />
            ))}
          </div>
          <motion.img
            className="barli-hero__logo"
            src={brandLogo}
            alt="The Barli"
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="barli-hero__inner"
            initial={{ opacity: 0, y: 28, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.45, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 id="hero-title" className="barli-hero__title">
              <span>Your space</span>
              <span>Your privacy</span>
            </h1>
          </motion.div>
          <div className="barli-hero__controls">
            <button type="button" onClick={showPreviousHeroSlide} aria-label="Show previous hero image">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={showNextHeroSlide} aria-label="Show next hero image">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <motion.section
          className="intro-section"
          id="offers"
          aria-labelledby="intro-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionReveal}
        >
          <motion.div className="section-shell intro-grid" variants={containerReveal}>
            <motion.div variants={fadeUp}>
              <p className="section-kicker">The Barli Experience</p>
              <h2 id="intro-title">
                Urban &
                <span>Modern Luxury</span>
              </h2>
            </motion.div>
            <motion.div className="intro-copy" variants={fadeUp}>
              <p>
                The Barli was designed with the thoughtful intention to merge the dynamic urban
                landscape of Abuja with fine luxury, sophisticated minimalism, and modern design for a
                stay unlike anything you've experienced before.
              </p>
              <a className="text-link" href="#amenities">
                See all features
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="rooms-section"
          id="rooms"
          aria-labelledby="rooms-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionReveal}
        >
          <motion.div className="section-shell" variants={containerReveal}>
            <motion.div className="section-heading" variants={fadeUp}>
              <div>
                <h2 id="rooms-title">The Rooms</h2>
              </div>
            </motion.div>

            <motion.div
              className="rooms-slideshow"
              variants={fadeUp}
              aria-roledescription="carousel"
              aria-label="The Barli room slideshow"
              onTouchStart={handleRoomSlideshowTouchStart}
              onTouchEnd={handleRoomSlideshowTouchEnd}
            >
              <motion.img
                key={roomSlides[activeRoomSlide].image}
                className="rooms-slideshow__image"
                src={roomSlides[activeRoomSlide].image}
                alt={`${roomSlides[activeRoomSlide].title} at The Barli, Abuja`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="rooms-slideshow__scrim" aria-hidden="true" />
              <div className="rooms-slideshow__caption">
                <h3>{roomSlides[activeRoomSlide].title}</h3>
              </div>
              <button className="rooms-slideshow__arrow rooms-slideshow__arrow--previous" type="button" onClick={showPreviousRoomSlide} aria-label="Show previous room image">
                <ChevronLeft aria-hidden="true" />
              </button>
              <button className="rooms-slideshow__arrow rooms-slideshow__arrow--next" type="button" onClick={showNextRoomSlide} aria-label="Show next room image">
                <ChevronRight aria-hidden="true" />
              </button>
              <div className="rooms-slideshow__dots" aria-label="Choose a room image">
                {roomSlides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.image}
                    className={index === activeRoomSlide ? 'is-active' : ''}
                    onClick={() => setActiveRoomSlide(index)}
                    aria-label={`Show room image ${index + 1}`}
                    aria-current={index === activeRoomSlide ? 'true' : undefined}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="amenities-section"
          id="amenities"
          aria-labelledby="amenities-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionReveal}
        >
          <motion.div className="section-shell" variants={containerReveal}>
            <motion.div className="section-heading section-heading--center" variants={fadeUp}>
              <p className="section-kicker">Features</p>
              <h2 id="amenities-title">Designed For Seamless Stays</h2>
            </motion.div>

            <motion.div className="amenities-grid" variants={containerReveal}>
              {amenityData.map((amenity) => (
                <motion.article
                  className={`amenity-card ${amenity.imageClass}`}
                  key={amenity.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  <div>
                    <h3>{amenity.title}</h3>
                    <ul className="amenity-card__features">
                      {amenity.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div className="amenity-highlights" variants={fadeUp}>
              <p className="section-kicker">Key Features</p>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={keyFeatureListReveal}
              >
                {keyFeatures.map((feature) => (
                  <motion.li key={feature} variants={keyFeatureItemReveal}>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="bed-breakfast-section"
          aria-labelledby="bed-breakfast-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionReveal}
        >
          <motion.div className="section-shell" variants={containerReveal}>
            <motion.article
              className="bed-breakfast-offer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="bed-breakfast-offer__image" variants={offerImageReveal}>
                <img src={heroSlideSixteen} alt="Breakfast setting at The Barli" />
              </motion.div>
              <motion.div className="bed-breakfast-offer__copy" variants={offerCopyReveal}>
                <motion.p className="section-kicker" variants={offerCopyItemReveal}>An Exclusive Stay</motion.p>
                <motion.h2 id="bed-breakfast-title" variants={offerCopyItemReveal}>Bed &amp; Breakfast Offer</motion.h2>
                <motion.p variants={offerCopyItemReveal}>
                  Enjoy a weekend escape or a quiet staycation in Abuja, with breakfast served on The Barli’s private balcony and garden dining area.
                </motion.p>
                <motion.a className="text-link" href="mailto:booking@thebarli.com" variants={offerCopyItemReveal}>
                  Book Now
                </motion.a>
              </motion.div>
            </motion.article>
          </motion.div>
        </motion.section>

        <motion.section
          className="weddings-section"
          id="events"
          aria-labelledby="events-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionReveal}
        >
          <motion.div className="section-shell wedding-grid wedding-grid--copy-only" variants={containerReveal}>
            <motion.div className="wedding-copy" variants={fadeUp}>
              <h2 id="events-title">Events at The Barli</h2>
              <p className="quote-large">More than just a venue, where meaningful moments come together.</p>
              <p>
                An elegant setting for intimate celebrations, private gatherings, and moments worth
                making memorable.
              </p>
              <a className="primary-link" href="mailto:booking@thebarli.com">
                Enquire Now
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionReveal}
        >
          <motion.div className="section-shell about-grid" variants={containerReveal}>
            <motion.div className="about-images" aria-hidden="true" variants={fadeUp}>
              <div className="about-images__main" />
            </motion.div>
            <motion.div className="about-copy" variants={fadeUp}>
              <p className="section-kicker">A Private Abuja Address</p>
              <h2 id="about-title">About Us</h2>
              <p>
                Every part of The Barli is composed for privacy, comfort, and calm. From secure access
                and uninterrupted power to thoughtful dining and concierge support, the residence is
                prepared for guests who expect the details to simply work.
              </p>
              <a className="text-link" href="#rooms">
                Explore the rooms
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="attractions-section"
          id="attractions"
          aria-labelledby="attractions-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionReveal}
        >
          <motion.div className="section-shell attractions-grid" variants={containerReveal}>
            <motion.div className="attractions-copy" variants={fadeUp}>
              <p className="section-kicker">Attractions</p>
              <h2 id="attractions-title">Abuja Within Reach</h2>
              <p>
                The Barli is conveniently located near popular attractions, offering guests a blend of
                cultural, natural, and recreational experiences right in the heart of the city.
              </p>
            </motion.div>
            <motion.div className="attractions-list" variants={containerReveal}>
              {attractions.map((attraction) => (
                <motion.article
                  className={`attraction-card ${attraction.imageClass}`}
                  key={attraction.title}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3>{attraction.title}</h3>
                  {attraction.credit && (
                    <a className="attraction-card__credit" href={attraction.creditUrl} target="_blank" rel="noopener noreferrer">
                      {attraction.credit}
                    </a>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionReveal}
        >
          <motion.div className="section-shell contact-grid" variants={containerReveal}>
            <motion.div className="contact-intro" variants={fadeUp}>
              <p className="section-kicker">Private Stays, Thoughtfully Planned</p>
              <h2 id="contact-title">Plan Your Stay</h2>
              <p>
                Tell us a little about your visit and our bookings team will help curate your stay at The Barli.
              </p>
            </motion.div>

            <motion.form className="booking-request-form" onSubmit={handleBookingRequest} variants={fadeUp}>
              <div className="booking-request-form__fields">
                <label>
                  <span>Full Name</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label>
                  <span>Email Address</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Check-in Date</span>
                  <input name="checkIn" type="date" required />
                </label>
                <label>
                  <span>Check-out Date</span>
                  <input name="checkOut" type="date" required />
                </label>
                <label>
                  <span>Guests</span>
                  <select name="guests" defaultValue="2">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3–4">3–4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </label>
              </div>
              <label className="booking-request-form__message">
                <span>How can we help?</span>
                <textarea name="message" rows="4" placeholder="Tell us about your stay, celebration, or special request." />
              </label>
              <button type="submit">Send Booking Request</button>
            </motion.form>

            <motion.aside className="contact-aside" variants={fadeUp}>
              <div>
                <p className="section-kicker">Stay In The Know</p>
                <h3>Newsletter</h3>
                <p>Receive updates from The Barli, including new experiences and curated offers.</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSignup}>
                  <label className="visually-hidden" htmlFor="newsletter-email">Email Address</label>
                  <input id="newsletter-email" name="newsletter-email" type="email" placeholder="Your email address" autoComplete="email" required />
                  <button type="submit">Join</button>
                </form>
              </div>
              <div className="support-card">
                <p className="section-kicker">Need Assistance?</p>
                <h3>Contact Support</h3>
                <a href="mailto:admin@thebarli.com">admin@thebarli.com</a>
              </div>
            </motion.aside>
          </motion.div>
        </motion.section>
      </main>

      <motion.footer
        className="site-footer"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <img src={brandLogo} className="site-footer__mark" alt="" />
        <span>Copyright 2026 THE BARLI. ABUJA. ALL RIGHTS RESERVED.</span>
        <div className="site-footer__socials" aria-label="Social media">
          <a href="https://www.instagram.com/thebarli.abuja?utm_source=qr&igsi=MXBwNHV1N2NnMXcxZQ==" target="_blank" rel="noopener noreferrer" aria-label="Follow The Barli on Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm8.75 4.25h.01M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/share/1JHVX1qVWv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Follow The Barli on Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.8v3h2.7v8h3.2Z" />
            </svg>
          </a>
        </div>
        <button type="button" className="site-footer__privacy-button" onClick={reopenCookieSettings}>
          Privacy choices
        </button>
      </motion.footer>

      {isCookiePanelVisible && (
        <motion.aside
          className="cookie-consent"
          aria-labelledby="cookie-consent-title"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="cookie-consent__eyebrow">Privacy preferences</p>
          <h2 id="cookie-consent-title">Privacy, your way.</h2>
          <p>
            We use essential storage to remember your choices and support secure, reliable site functions. Optional analytics help us understand how the site is used, but remain off unless you choose to enable them.
          </p>

          {isCookieSettingsOpen && (
            <motion.label
              className="cookie-consent__option"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <input
                type="checkbox"
                checked={isAnalyticsEnabled}
                onChange={(event) => setIsAnalyticsEnabled(event.target.checked)}
              />
              <span>
                <strong>Optional analytics</strong>
                <small>Helps us improve the experience. It is never required to use the site.</small>
              </span>
            </motion.label>
          )}

          <div className="cookie-consent__actions">
            {isCookieSettingsOpen ? (
              <button type="button" className="cookie-consent__primary" onClick={() => saveCookieConsent(isAnalyticsEnabled)}>
                Save preferences
              </button>
            ) : (
              <button type="button" className="cookie-consent__primary" onClick={() => saveCookieConsent(true)}>
                Accept all
              </button>
            )}
            <button type="button" className="cookie-consent__secondary" onClick={() => saveCookieConsent(false)}>
              Essential only
            </button>
            {!isCookieSettingsOpen && (
              <button type="button" className="cookie-consent__text-button" onClick={() => setIsCookieSettingsOpen(true)}>
                Customize
              </button>
            )}
          </div>
        </motion.aside>
      )}

      <motion.a
        href="https://wa.me/2349167000099"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact The Barli on WhatsApp"
        animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.96 }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
          aria-hidden="true"
        />
      </motion.a>

      <motion.nav
        ref={bottomNavRef}
        className="sticky-bottom-nav"
        aria-label="Primary"
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-icons">
          {navItems.map((item, index) => (
            <motion.a
              href={item.href}
              className="nav-item"
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.82 + index * 0.06,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="nav-item__icon" aria-hidden="true">
                <item.Icon size={18} strokeWidth={1.9} />
              </span>
              <span>{item.label}</span>
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}

export default App;
