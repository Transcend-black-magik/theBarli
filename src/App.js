import { motion } from 'framer-motion';
import { BadgePercent, BedDouble, Heart, House, Menu as MenuIcon } from 'lucide-react';
import brandLogo from './assets/logo.png';
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

const roomData = [
  {
    title: 'Signature En-Suite Residence',
    imageClass: 'room-card__image--suite',
    details: ['13 Bedrooms', 'En-suite privacy', 'Open-plan layouts'],
    copy: 'Meticulously designed rooms tailored for exclusivity, scale, and quiet comfort in the heart of Abuja.',
  },
  {
    title: 'Private Lounge Sanctuary',
    imageClass: 'room-card__image--lounge',
    details: ['2 Private lounges', 'Guest-only access', 'Ergonomic workspaces'],
    copy: 'Minimalist indoor living areas create a seamless rhythm between focused work and restorative rest.',
  },
  {
    title: 'Exclusive Event Residence',
    imageClass: 'room-card__image--event',
    details: ['Private gatherings', 'Bridal preparation', 'Tailored packages'],
    copy: 'An elegant backdrop for intimate weddings, refined events, and moments that deserve privacy.',
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

const galleryTiles = [
  { className: 'wedding-gallery__tile--one', label: 'Ceremony setting' },
  { className: 'wedding-gallery__tile--two', label: 'Reception table' },
  { className: 'wedding-gallery__tile--three', label: 'Bridal suite' },
  { className: 'wedding-gallery__tile--four', label: 'Private dining' },
  { className: 'wedding-gallery__tile--five', label: 'Evening gathering' },
  { className: 'wedding-gallery__tile--six', label: 'Arrival moment' },
];

const attractions = [
  { title: 'Cultural Landmarks', imageClass: 'attraction-card--culture' },
  { title: 'City Dining', imageClass: 'attraction-card--dining' },
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
  return (
    <div className="barli-app">
      <motion.header
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
              ABUJA / PRIVATE RESIDENCE
            </motion.p>
            <motion.p className="hero__residence-label" variants={heroItem}>
              ABUJA / RESIDENCE
            </motion.p>
            <motion.h1 id="hero-title" variants={heroItem}>
              Refined Urban Living
            </motion.h1>
            <motion.p className="hero__summary" variants={heroItem}>
              A private luxury residence for discerning stays, intimate celebrations, and seamless
              Abuja arrivals.
            </motion.p>
          </motion.div>

          <motion.form
            className="booking-panel"
            aria-label="Check availability"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <label>
              <span>Arrival</span>
              <input type="date" aria-label="Arrival date" />
            </label>
            <label>
              <span>Departure</span>
              <input type="date" aria-label="Departure date" />
            </label>
            <label>
              <span>Guests</span>
              <select aria-label="Guests">
                <option>1 Person</option>
                <option>2 People</option>
                <option>4 People</option>
                <option>8 People</option>
                <option>12+ People</option>
              </select>
            </label>
            <label>
              <span>Promo Code</span>
              <input type="text" placeholder="Optional" aria-label="Promo code" />
            </label>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Check Availability
            </motion.button>
          </motion.form>
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

            <motion.div className="rooms-grid" variants={containerReveal}>
              {roomData.map((room) => (
                <motion.article
                  className="room-card"
                  key={room.title}
                  variants={fadeUp}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={`room-card__image ${room.imageClass}`} aria-hidden="true" />
                  <div className="room-card__body">
                    <h3>{room.title}</h3>
                    <ul>
                      {room.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    <p>{room.copy}</p>
                    <div className="room-card__actions">
                      <a href="#about">View Details</a>
                      <a href="#home">Book</a>
                    </div>
                  </div>
                </motion.article>
              ))}
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
          <motion.div className="section-shell wedding-grid" variants={containerReveal}>
            <motion.div className="wedding-copy" variants={fadeUp}>
              <p className="quote-large">More than just a venue, Where Luxury meets Exclusivity.</p>
              <h2 id="weddings-title">Weddings at The Barli</h2>
              <p>
                A sophisticated backdrop for your most important moments. We provide tailored packages
                for intimate events, exclusive gatherings, and luxurious bridal preparations.
              </p>
              <a className="primary-link" href="https://wa.me/234XXXXXXXXXX">
                Enquire Now
              </a>
            </motion.div>
            <motion.div className="wedding-gallery" aria-label="Wedding moments" variants={containerReveal}>
              {galleryTiles.map((tile) => (
                <motion.div
                  className={`wedding-gallery__tile ${tile.className}`}
                  key={tile.label}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <span>{tile.label}</span>
                </motion.div>
              ))}
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
              <div className="about-images__small" />
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
      </motion.footer>

      <motion.a
        href="https://wa.me/234XXXXXXXXXX"
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
        className="sticky-bottom-nav"
        aria-label="Primary"
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#weddings" className="check-availability-bar">
          Check Availability &gt;
        </a>
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
