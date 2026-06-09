export default function HeroVideo() {
  return (
    <div className="section section-one">
      <h1 className="visually-hidden">
        Flawless Beauty — Nagelsalon &amp; nagelstudio in Raalte
      </h1>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="background-video video-pc"
      >
        <source src="/img/flawlessbeauty.webm" type="video/webm" />
      </video>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="background-video video-mobile"
      >
        <source src="/img/flawlessbeauty-vertical.webm" type="video/webm" />
      </video>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-indicator-line" />
      </div>
    </div>
  );
}
