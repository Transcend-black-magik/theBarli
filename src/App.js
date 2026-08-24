import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BadgePercent, BedDouble, ChevronLeft, ChevronRight, Heart, House, Menu as MenuIcon } from 'lucide-react';
import brandLogo from './assets/logo.png';
import roomSlideOne from './assets/slideshow-images/WhatsApp Image 2026-08-22 at 9.02.38 PM.jpeg';
import roomSlideTwo from './assets/slideshow-images/WhatsApp Image 2026-08-22 at 9.02.38 PM (1).jpeg';
import roomSlideThree from './assets/slideshow-images/WhatsApp Image 2026-08-22 at 9.02.39 PM.jpeg';
import roomSlideFour from './assets/slideshow-images/WhatsApp Image 2026-08-22 at 9.02.39 PM (1).jpeg';
import './App.css';

const viewport = { once: true, amount: 0.18 };

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

const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.16,
      staggerChildren: 0.16,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
];

const amenityData = [
  {
    title: 'Culinary Experience',
    imageClass: 'amenity-card--dining',
    copy: 'Complimentary bespoke breakfast, private chef service, western dishes, local specialties, and dietitian-supported requests.',
  },
  {
    title: 'Wellness',
    imageClass: 'amenity-card--wellness',
    copy: 'Personalised wellness services, massage therapists, fitness amenities, and curated exercise bags for private routines.',
  },
  {
    title: 'Infrastructure & Access',
    imageClass: 'amenity-card--access',
    copy: '24-hour uninterrupted power and state-of-the-art password key locks for discreet, secure entry.',
  },
  {
    title: 'Logistics & Concierge',
    imageClass: 'amenity-card--concierge',
    copy: 'Complimentary VIP airport pickup, seamless arrival support, and dedicated on-site accommodation for drivers.',
  },
];

const attractions = [
  { title: 'Cultural Landmarks', imageClass: 'attraction-card--culture' },
  { title: 'Recreation', imageClass: 'attraction-card--city' },
];

const navItems = [
  { href: '#home', Icon: House, label: 'Home' },
  { href: '#rooms', Icon: BedDouble, label: 'Rooms' },
  { href: '#offers', Icon: BadgePercent, label: 'Offers' },
  { href: '#weddings', Icon: Heart, label: 'Weddings' },
  { href: '#about', Icon: MenuIcon, label: 'Menu' },
];

function App() {
  const [activeRoomSlide, setActiveRoomSlide] = useState(0);
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

  const showPreviousRoomSlide = () => {
    setActiveRoomSlide((currentSlide) => (currentSlide - 1 + roomSlides.length) % roomSlides.length);
  };

  const showNextRoomSlide = () => {
    setActiveRoomSlide((currentSlide) => (currentSlide + 1) % roomSlides.length);
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
      `Preferred dates: ${formData.get('dates') || 'Not specified'}`,
      `Guests: ${formData.get('guests')}`,
      '',
      'Stay details:',
      formData.get('message') || 'Not specified',
    ].join('\n');
    const params = new URLSearchParams({ subject: 'Booking enquiry — The Barli', body: emailBody });

    window.location.href = `mailto:bookings@thebarli.com?${params.toString()}`;
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

  return (
    <div className="barli-app">
      <motion.header
        ref={headerRef}
        className="site-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
        <section className="hero" aria-labelledby="hero-title">
          <motion.div className="section-shell hero__content" variants={heroStagger} initial="hidden" animate="visible">
            <motion.p className="eyebrow" variants={heroItem}>
              BOUTIQUE APARTMENTS, JABI, ABUJA
            </motion.p>
            <motion.h1 id="hero-title" variants={heroItem}>
              A Quieter Way To Stay
            </motion.h1>
            <motion.p className="hero__summary" variants={heroItem}>
              Private apartments. Thoughtful service. More space to settle in, right in the heart of Abuja.
            </motion.p>
          </motion.div>

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
                <p className="section-kicker">The Residence</p>
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
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
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
                    <p>{amenity.copy}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="weddings-section"
          id="weddings"
          aria-labelledby="weddings-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionReveal}
        >
          <motion.div className="section-shell wedding-grid wedding-grid--copy-only" variants={containerReveal}>
            <motion.div className="wedding-copy" variants={fadeUp}>
              <p className="quote-large">More than just a venue, Where Luxury meets Exclusivity.</p>
              <h2 id="weddings-title">Weddings at The Barli</h2>
              <p>
                A sophisticated backdrop for your most important moments. We provide tailored packages
                for intimate events, exclusive gatherings, and luxurious bridal preparations.
              </p>
              <a className="primary-link" href="mailto:Bookings@thebarli.com">
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
                  <span>Preferred Date</span>
                  <input name="dates" type="date" />
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
          <a href="https://www.instagram.com/thebarlia.abuja?igsi=MXBwNHV1N2NnMXcxZQ==" target="_blank" rel="noopener noreferrer" aria-label="Follow The Barli on Instagram">
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
      </motion.footer>

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
