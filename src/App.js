import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import brandLogo from './assets/logo.png';
import roomImage01 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.40 PM.jpeg';
import roomImage02 from './assets/rooms/generated/room-desktop-02.png';
import roomImage03 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.42 PM.jpeg';
import roomImage04 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.43 PM (1).jpeg';
import roomImage05 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.43 PM (2).jpeg';
import roomImage06 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.43 PM (3).jpeg';
import roomImage07 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.43 PM.jpeg';
import roomImage08 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.44 PM (1).jpeg';
import roomImage09 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.44 PM (2).jpeg';
import roomImage10 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.44 PM.jpeg';
import roomImage11 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.46 PM (1).jpeg';
import roomImage12 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.46 PM (2).jpeg';
import roomImage13 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.46 PM.jpeg';
import roomImage14 from './assets/rooms/generated/room-desktop-14.png';
import roomImage15 from './assets/rooms/generated/room-desktop-15.png';
import roomImage16 from './assets/rooms/WhatsApp Image 2026-09-09 at 1.31.51 PM (3).jpeg';
import roomImage17 from './assets/rooms/generated/room-desktop-17.png';
import heroSlideSixteen from './assets/hero-carousel/WhatsApp Image 2026-08-29 at 1.08.05 AM.jpeg';
import amenityPower from './assets/amenities/power.png';
import amenityKeylessEntry from './assets/amenities/keyless-entry.png';
import amenityAirportTransfer from './assets/amenities/airport-transfer.png';
import amenityDriverAccommodation from './assets/amenities/driver-accommodation.png';
import amenityArrivalSupport from './assets/amenities/arrival-support.png';
import eventsCelebration from './assets/events-celebration.png';
import './App.css';

const viewport = { once: true, amount: 0.18 };
const cookieConsentStorageKey = 'thebarli-cookie-consent-v1';
const landscapeHeroContext = require.context('./assets/landscape-images', false, /\.jpe?g$/i);
const portraitHeroContext = require.context('./assets/porttrait-images', false, /\.jpe?g$/i);
const createSlides = (context) => context.keys().sort().map((key) => ({ image: context(key) }));
const desktopHeroSlides = createSlides(landscapeHeroContext);
const mobileHeroSlides = [...desktopHeroSlides, ...createSlides(portraitHeroContext)];
const navigationLinks = [
  { href: '#home', label: 'Home' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#amenities', label: 'Features' },
  { href: '#events', label: 'Events' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

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
  roomImage01, roomImage02, roomImage03, roomImage04, roomImage05, roomImage06,
  roomImage07, roomImage08, roomImage09, roomImage10, roomImage11, roomImage12,
  roomImage13, roomImage14, roomImage15, roomImage16, roomImage17,
].map((image) => ({ image, title: 'The Barli Rooms' }));

const amenityData = [
  { title: '24 Hour Power', copy: 'Reliable power throughout your stay.', image: amenityPower, alt: 'Warmly lit apartment living room' },
  { title: 'Secure Keyless Entry', copy: 'Password protected access for easy, discreet entry.', image: amenityKeylessEntry, alt: 'Smart lock at an apartment entrance' },
  { title: 'Private Airport Transfers', copy: 'Airport pickup can be arranged on request.', image: amenityAirportTransfer, alt: 'Private car waiting for an airport transfer' },
  { title: 'Driver Accommodation', copy: 'Dedicated on site accommodation available for drivers.', image: amenityDriverAccommodation, alt: 'Comfortable private driver accommodation' },
  { title: 'Arrival Support', copy: 'Assistance to help make your arrival smooth and straightforward.', image: amenityArrivalSupport, alt: 'Welcome card being presented at arrival' },
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

function App() {
  const [activeRoomSlide, setActiveRoomSlide] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(() => window.matchMedia('(max-width: 760px)').matches);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isCookiePanelVisible, setIsCookiePanelVisible] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);
  const headerRef = useRef(null);
  const eventsSectionRef = useRef(null);
  const eventsMediaRef = useRef(null);
  const breakfastOfferRef = useRef(null);
  const breakfastMediaRef = useRef(null);
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
      root.style.setProperty('--site-header-height', `${headerHeight}px`);
      root.style.setProperty('--bottom-nav-height', '0px');
    };

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateViewportInsets);
    if (headerRef.current) observer?.observe(headerRef.current);
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
    const offer = breakfastOfferRef.current;
    const media = breakfastMediaRef.current;
    if (!offer || !media) return undefined;

    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let isNearViewport = false;

    const applyTransform = () => {
      animationFrame = 0;
      if (!mobileQuery.matches || reducedMotionQuery.matches) {
        media.style.transform = '';
        return;
      }

      const rect = offer.getBoundingClientRect();
      const travel = Math.min(120, Math.max(76, rect.height * 0.16));
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const offset = Math.round((progress - 0.5) * travel * 2);
      media.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
    };

    const scheduleTransform = () => {
      if (!isNearViewport || animationFrame) return;
      animationFrame = window.requestAnimationFrame(applyTransform);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isNearViewport = entry.isIntersecting;
      if (isNearViewport) scheduleTransform();
    }, { rootMargin: '140px 0px' });

    const handleModeChange = () => {
      if (!mobileQuery.matches || reducedMotionQuery.matches) media.style.transform = '';
      scheduleTransform();
    };

    observer.observe(offer);
    window.addEventListener('scroll', scheduleTransform, { passive: true });
    window.addEventListener('resize', scheduleTransform);
    mobileQuery.addEventListener('change', handleModeChange);
    reducedMotionQuery.addEventListener('change', handleModeChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleTransform);
      window.removeEventListener('resize', scheduleTransform);
      mobileQuery.removeEventListener('change', handleModeChange);
      reducedMotionQuery.removeEventListener('change', handleModeChange);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const section = eventsSectionRef.current;
    const media = eventsMediaRef.current;
    if (!section || !media) return undefined;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let isNearViewport = false;

    const applyTransform = () => {
      animationFrame = 0;

      if (reducedMotionQuery.matches) {
        media.style.transform = 'translate3d(0, 0, 0) scale(1.02)';
        return;
      }

      const rect = section.getBoundingClientRect();
      const travel = Math.min(140, Math.max(96, rect.height * 0.18));
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const offset = Math.round((progress - 0.5) * travel * 2);
      media.style.transform = `translate3d(0, ${offset}px, 0) scale(1.02)`;
    };

    const scheduleTransform = () => {
      if (!isNearViewport || animationFrame) return;
      animationFrame = window.requestAnimationFrame(applyTransform);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isNearViewport = entry.isIntersecting;
      if (isNearViewport) scheduleTransform();
    }, { rootMargin: '160px 0px' });

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleTransform);
    observer.observe(section);
    resizeObserver?.observe(section);
    window.addEventListener('scroll', scheduleTransform, { passive: true });
    window.addEventListener('resize', scheduleTransform);
    reducedMotionQuery.addEventListener('change', scheduleTransform);

    return () => {
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', scheduleTransform);
      window.removeEventListener('resize', scheduleTransform);
      reducedMotionQuery.removeEventListener('change', scheduleTransform);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const heroSlides = isMobileViewport ? mobileHeroSlides : desktopHeroSlides;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateViewportMode = (event) => setIsMobileViewport(event.matches);

    mediaQuery.addEventListener('change', updateViewportMode);
    return () => mediaQuery.removeEventListener('change', updateViewportMode);
  }, []);

  useEffect(() => {
    setActiveHeroSlide(0);
  }, [isMobileViewport]);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const slideTimer = window.setInterval(() => {
      setActiveHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(slideTimer);
  }, [heroSlides.length]);

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
      `Phone: ${formData.get('phone') || 'Not specified'}`,
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
        <button
          className="menu-trigger menu-trigger--header"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu aria-hidden="true" strokeWidth={1.35} />
        </button>
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
        <a className="header-booking-link" href="#contact">
          Book now <ChevronDown aria-hidden="true" />
        </a>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              className="navigation-drawer__backdrop"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              className="navigation-drawer"
              aria-label="Site navigation"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="navigation-drawer__top">
                <img src={brandLogo} alt="" />
                <button type="button" className="navigation-drawer__close" aria-label="Close navigation menu" onClick={() => setIsMenuOpen(false)}>
                  <X aria-hidden="true" />
                </button>
              </div>
              <nav>
                {navigationLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.055, duration: 0.3 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>0{index + 1}</span>{link.label}
                  </motion.a>
                ))}
              </nav>
              <a className="navigation-drawer__booking" href="mailto:booking@thebarli.com">Make a booking</a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main id="home">
        <section className="barli-hero" aria-labelledby="hero-title">
          <div className="barli-hero__carousel" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.image}
                className={`barli-hero__slide ${index === activeHeroSlide ? 'is-active' : ''}`}
                src={slide.image}
                alt=""
              />
            ))}
          </div>
          <button
            className="menu-trigger menu-trigger--hero"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu aria-hidden="true" strokeWidth={2.1} />
          </button>
          <a className="hero-booking-link" href="#contact">
            Book now <ChevronDown aria-hidden="true" />
          </a>
          <motion.img
            className="barli-hero__logo"
            src={brandLogo}
            alt="The Barli"
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p
            className="barli-hero__brand-name"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            The Barli
          </motion.p>
          <p className="barli-hero__eyebrow">Boutique Apartments, Jabi, Abuja</p>
          <motion.div
            className="barli-hero__inner"
            initial={{ opacity: 0, y: 28, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.45, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 id="hero-title" className="barli-hero__title">
              <em>Your private</em>
              <span>Space.</span>
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
                Modern living,
                <span>made to linger.</span>
              </h2>
            </motion.div>
            <motion.div className="intro-copy" variants={fadeUp}>
              <p>
                Private apartments, thoughtful service, and a more personal way to experience Abuja.
              </p>
              <p>
                The Barli brings together contemporary design, considered spaces and a thoughtful
                approach to hospitality. From the way you arrive to the way you unwind, the details
                are designed around your stay.
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
            <motion.div className="section-heading rooms-section__heading" variants={fadeUp}>
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
              <p className="section-kicker">Features and Amenities</p>
              <h2 id="amenities-title">Designed for <span>seamless stays.</span></h2>
            </motion.div>

            <motion.div className="amenities-grid" variants={containerReveal}>
              {amenityData.map((amenity) => (
                <motion.article
                  className="amenity-card"
                  key={amenity.title}
                  variants={fadeUp}
                  transition={{ duration: 0.25 }}
                >
                  <img className="amenity-card__image" src={amenity.image} alt={amenity.alt} />
                  <div>
                    <h3>{amenity.title}</h3>
                    <p>{amenity.copy}</p>
                  </div>
                </motion.article>
              ))}
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
              ref={breakfastOfferRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="bed-breakfast-offer__image" variants={offerImageReveal}>
                <img ref={breakfastMediaRef} src={heroSlideSixteen} alt="Breakfast setting at The Barli" />
              </motion.div>
              <motion.div className="bed-breakfast-offer__copy" variants={offerCopyReveal}>
                <motion.p className="section-kicker" variants={offerCopyItemReveal}>The Barli Invitation</motion.p>
                <motion.h2 id="bed-breakfast-title" variants={offerCopyItemReveal}>Mornings, <em>the Barli way.</em></motion.h2>
                <motion.p variants={offerCopyItemReveal}>
                  Breakfast at The Barli is served wherever the morning takes you, in the comfort of your room, on the balcony, or at our garden dining area.
                </motion.p>
                <motion.p variants={offerCopyItemReveal}>
                  Mornings here are made to be savoured.
                </motion.p>
                <motion.a className="text-link bed-breakfast-offer__desktop-booking" href="mailto:booking@thebarli.com" variants={offerCopyItemReveal}>
                  Book Now
                </motion.a>
              </motion.div>
            </motion.article>
            <a className="bed-breakfast-offer__mobile-booking" href="mailto:booking@thebarli.com">Book Now</a>
          </motion.div>
        </motion.section>

        <section
          className="weddings-section"
          id="events"
          aria-labelledby="events-title"
          ref={eventsSectionRef}
        >
          <img
            className="events-parallax-media"
            aria-hidden="true"
            alt=""
            src={eventsCelebration}
            ref={eventsMediaRef}
            decoding="async"
          />
          <motion.div
            className="section-shell wedding-grid"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={containerReveal}
          >
            <motion.div className="wedding-copy" variants={fadeUp}>
              <p className="section-kicker">Events at The Barli</p>
              <h2 id="events-title">For moments that <span>cannot be ordinary.</span></h2>
              <p>
                From intimate celebrations to small private gatherings, The Barli offers a considered
                setting for moments shared with the people who matter.
              </p>
              <p className="events-closing">Your occasion. Your people. Your space.</p>
            </motion.div>
          </motion.div>
        </section>

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
            <motion.p className="section-kicker about-mobile-kicker" variants={fadeUp}>
              About The Barli
            </motion.p>
            <motion.div className="about-images" variants={fadeUp}>
              <div className="about-images__main" />
              <p className="about-images__mobile-title" aria-hidden="true">
                Your private space <em>in Abuja.</em>
              </p>
            </motion.div>
            <motion.div className="about-copy" variants={fadeUp}>
              <p className="section-kicker">About The Barli</p>
              <h2 id="about-title">Your private space <span>in Abuja.</span></h2>
              <p>
                Designed as a private space in Abuja, The Barli brings together contemporary
                design, comfort and thoughtful attention to detail.
              </p>
              <p>
                With secure access, reliable power and considered spaces throughout, everything is
                designed to make your stay feel easy.
              </p>
              <p>
                A place to settle in, switch off and feel at home.
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
              <p className="section-kicker">Beyond The Barli</p>
              <h2 id="attractions-title">Close to everything. <span>Away from the noise.</span></h2>
              <p>
                From cultural landmarks and waterfront escapes to dining, business and leisure, some
                of Abuja&apos;s most sought after destinations are within easy reach.
              </p>
              <p className="attractions-closing">Explore the city. Then come back to somewhere quieter.</p>
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
              <p className="section-kicker">Bookings</p>
              <h2 id="contact-title">Your stay <span>starts here.</span></h2>
              <p>
                Tell us a little about your visit and our bookings team will take care of the details.
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
                  <span>Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" />
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

    </div>
  );
}

export default App;
