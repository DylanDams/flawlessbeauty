export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-left" data-reveal data-delay="1">
          <h3>Contact</h3>
          <p>
            <a
              className="instagram-icon"
              href="mailto:flawlessbeauty@kpnmail.nl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/mail.svg" alt="Mail" className="social-icon" />
            </a>
            Email: flawlessbeauty@kpnmail.nl
          </p>
          <p>
            <a
              className="instagram-icon"
              href="https://wa.me/31683524241"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/whatsapp.svg"
                alt="Whatsapp"
                className="social-icon"
              />
            </a>
            Telefoon: 06 83524241
          </p>
          <p>
            <a
              className="instagram-icon"
              href="https://g.co/kgs/ufyRsAV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/pin.svg" alt="Pin" className="social-icon" />
            </a>
            Adres: Warmelo 5, 8103HT, Raalte
          </p>
        </div>
        <div className="footer-center" data-reveal data-delay="2">
          <h3>Sociale media</h3>
          <div className="social-media">
            <a
              className="instagram-icon"
              href="https://www.instagram.com/flawlessbeauty.nl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/instagram.svg"
                alt="Instagram"
                className="social-icon"
              />
            </a>
            <a
              className="instagram-icon"
              href="https://www.facebook.com/profile.php?id=61564057466537&locale=nl_NL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/facebook.svg"
                alt="facebook"
                className="social-icon"
              />
            </a>
          </div>
        </div>
        <div className="footer-right" data-reveal data-delay="3">
          <h3>Openingstijden</h3>
          <p>
            <span>Maandag:</span>
            <span className="time">09:00 - 21:00</span>
          </p>
          <p>
            <span>Dinsdag:</span>
            <span className="time">09:00 - 21:00</span>
          </p>
          <p>
            <span>Woensdag:</span>
            <span className="time">09:00 - 21:00</span>
          </p>
          <p>
            <span>Donderdag:</span>
            <span className="time">13:00 - 18:00</span>
          </p>
          <p>
            <span>Vrijdag:</span>
            <span className="time">09:00 - 17:00</span>
          </p>
          <p>
            <span>Zaterdag:</span>
            <span className="time">Gesloten</span>
          </p>
          <p>
            <span>Zondag:</span>
            <span className="time">Gesloten</span>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Flawlessbeauty. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}
