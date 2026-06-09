"use client";

import Reveal from "@/components/motion/Reveal";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fb-footer" id="contact">
      <div className="fb-container fb-footer__grid">
        <Reveal>
          <h3>Contact</h3>
          <p>
            <a href="mailto:flawlessbeauty@kpnmail.nl">
              <Image src="/img/mail.svg" alt="" width={18} height={18} className="social-icon" />
              flawlessbeauty@kpnmail.nl
            </a>
          </p>
          <p>
            <a href="https://wa.me/31683524241" target="_blank" rel="noopener noreferrer">
              <Image src="/img/whatsapp.svg" alt="" width={18} height={18} className="social-icon" />
              06 83524241
            </a>
          </p>
          <p>
            <a href="https://g.co/kgs/ufyRsAV" target="_blank" rel="noopener noreferrer">
              <Image src="/img/pin.svg" alt="" width={18} height={18} className="social-icon" />
              Warmelo 5, 8103HT Raalte
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h3>Sociale media</h3>
          <div className="fb-footer__social">
            <a href="https://www.instagram.com/flawlessbeauty.nl" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Image src="/img/instagram.svg" alt="" width={18} height={18} className="social-icon" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61564057466537" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Image src="/img/facebook.svg" alt="" width={18} height={18} className="social-icon" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <h3>Openingstijden</h3>
          <p><span>Ma–Wo</span><span className="time">09:00 – 21:00</span></p>
          <p><span>Donderdag</span><span className="time">13:00 – 18:00</span></p>
          <p><span>Vrijdag</span><span className="time">09:00 – 17:00</span></p>
          <p><span>Za–Zo</span><span className="time">Gesloten</span></p>
        </Reveal>
      </div>
      <div className="fb-footer__bottom">
        <p>&copy; {new Date().getFullYear()} Flawless Beauty. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}
