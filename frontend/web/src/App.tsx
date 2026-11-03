import { useState } from "react";
import type { FormEvent } from "react";

function BrandMark({ small = false }: { small?: boolean }) {
  return <span className={`brand-mark${small ? " brand-mark--small" : ""}`} aria-hidden="true">
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M24 40.2 7.9 24.6C-1.1 15.8 5 3.8 15 4.5c4.3.3 7 3.1 9 6.1 2-3 4.7-5.8 9-6.1 10-.7 16.1 11.3 7.1 20.1L24 40.2Z" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 30.8 14.8 22c-4.4-4.2-1.7-9.7 2.9-9.4 2.8.2 4.4 2.2 6.3 4.8 1.9-2.6 3.5-4.6 6.3-4.8 4.6-.3 7.3 5.2 2.9 9.4L24 30.8Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>;
}
function ShieldIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3 27 7v8c0 7.2-4.6 11.8-11 14C9.6 26.8 5 22.2 5 15V7l11-4Z" stroke="currentColor" strokeWidth="2.5"/><path d="m11.3 15.8 3.1 3.1 6.6-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function PeopleIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2.5"/><circle cx="23" cy="12" r="3" stroke="currentColor" strokeWidth="2.5"/><path d="M4 26v-2.1a8 8 0 0 1 16 0V26H4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M21 20a6 6 0 0 1 7 5.9V26h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>;
}
function HeartIcon() {
  return <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 27.2 5.2 17C-.4 11.6 7.3 2.4 13 7.8l3 2.8 3-2.8c5.7-5.4 13.4 3.8 7.8 9.2L16 27.2Z"/></svg>;
}
const profiles = [
  { name: "Mariam", age: 24, city: "Lagos", initials: "M", tone: "rose" },
  { name: "Tobi", age: 29, city: "Lekki", initials: "T", tone: "sand" },
  { name: "Fatou", age: 26, city: "Ikeja", initials: "F", tone: "plum" },
  { name: "Joel", age: 31, city: "Yaba", initials: "J", tone: "peach" }
];

export default function App() {
  const [email, setEmail] = useState("");
  const [adult, setAdult] = useState(false);
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preview only: secure registration will be enabled after the waitlist API and email verification are connected. No data has been submitted.");
  }

  return <main>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="UBWENZI home"><BrandMark /><span>UBWENZI</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#home" className="active">Home</a><a href="#discover">Discover</a><a href="#how-it-works">How it works</a><a href="#values">Our values</a>
      </nav>
      <div className="header-actions"><span className="login-link" aria-label="Member access coming soon">Member access soon</span><a className="button button--small" href="#waitlist">Join the waitlist</a></div>
    </header>
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> A more intentional way to connect</p>
        <h1>Real connections,<br/>meaningful <em>relationships.</em></h1>
        <p className="hero-description">UBWENZI is more than a dating platform. It is a space to build genuine connections, rooted in respect, trust and shared values.</p>
        <div className="hero-actions"><a className="button" href="#waitlist">Join the waitlist <span aria-hidden="true">→</span></a><a className="button button--outline" href="#discover">Discover UBWENZI</a></div>
        <div className="value-strip" id="values">
          <div className="value-item"><span className="value-icon"><ShieldIcon/></span><span><strong>Verified profiles</strong><small>More confidence</small></span></div>
          <div className="value-item"><span className="value-icon"><PeopleIcon/></span><span><strong>A kind community</strong><small>Respectful exchanges</small></span></div>
          <div className="value-item"><span className="value-icon"><HeartIcon/></span><span><strong>Real relationships</strong><small>Friendship, love, life</small></span></div>
        </div>
      </div>
      <div className="hero-art" aria-label="UBWENZI mobile app preview">
        <div className="art-glow"/>
        <div className="couple-stage"><div className="sun-disc"/><div className="portrait-shape portrait-shape--one"><span/></div><div className="portrait-shape portrait-shape--two"><span/></div><div className="art-caption">More than matches,<br/><em>stories worth sharing.</em></div></div>
        <div className="phone">
          <div className="phone-island"/><div className="phone-status"><span>9:41</span><span>▮▮▮　●</span></div>
          <div className="phone-top"><span>♡</span><strong><BrandMark small/> UBWENZI</strong><span>☷</span></div>
          <div className="phone-photo"><div className="profile-sun"/><div className="profile-silhouette"><span/></div><div className="profile-details"><strong>A warm hello</strong><span>Curious minds. Genuine intentions.</span></div></div>
          <div className="profile-tags"><span>Travel</span><span>Culture</span><span>Good talks</span></div>
          <div className="phone-actions"><span>×</span><strong>♥</strong><span>★</span></div>
          <div className="phone-tabs"><span className="selected">♥<small>Discover</small></span><span>▢<small>Messages</small></span><span>♡<small>Likes</small></span><span>♙<small>Profile</small></span></div>
        </div>
      </div>
    </section>
    <section className="preview-section" id="discover">
      <div className="preview-heading"><div><p className="eyebrow">A glimpse of what is ahead</p><h2>Designed for <em>meaningful</em> moments.</h2></div><p>Thoughtful profiles. Intentional discovery. Conversations that can become something real.</p></div>
      <div className="screen-row">
        <article className="screen-card signup-card"><div className="screen-topline"><span>9:41</span><span>•••</span></div><BrandMark/><h3>Be part of something real.</h3><p>Join a community built around trust and meaningful connections.</p><div className="mock-input">Your email address</div><div className="mock-cta">Join the waitlist →</div><small>18+ only · Your privacy matters</small></article>
        <article className="screen-card profile-card"><div className="screen-topline"><span>9:41</span><span>•••</span></div><h3>Your story, your way</h3><div className="progress"><span/></div><div className="profile-avatar">U</div><h4>Show what matters to you</h4><p>Share your interests, values and what you hope to find.</p><div className="mock-lines"><span/><span/><span/></div></article>
        <article className="screen-card discovery-card"><div className="screen-topline"><span>9:41</span><span>•••</span></div><h3>Discover</h3><p>People with intention</p><div className="mini-profile-grid">{profiles.map(profile=><div className={`mini-profile mini-profile--${profile.tone}`} key={profile.name}><span className="mini-avatar">{profile.initials}</span><strong>{profile.name}, {profile.age}</strong><small>{profile.city}</small></div>)}</div></article>
        <article className="screen-card messages-card"><div className="screen-topline"><span>9:41</span><span>•••</span></div><h3>A conversation begins</h3><p className="message-bubble">Hi! What is something you love discovering about a new person?</p><p className="message-bubble message-bubble--out">The little things. Stories, music, and shared laughter.</p><p className="message-bubble">That sounds like a good place to start ✨</p></article>
      </div>
    </section>
    <section className="waitlist-section" id="waitlist">
      <div className="waitlist-copy"><p className="eyebrow">Lagos, we're getting ready</p><h2>Your next meaningful connection starts <em>here.</em></h2><p>Be among the first to hear when UBWENZI opens its doors in Lagos. Join the early access list.</p><div className="waitlist-note"><BrandMark small/><span>No pressure. Just the first invitation when we're ready.</span></div></div>
      <form className="waitlist-form" onSubmit={handleSubmit}>
        <h3>Join the waitlist</h3><p>Get early access updates from UBWENZI.</p>
        <label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event=>setEmail(event.target.value)} required/>
        <label className="check-row"><input type="checkbox" checked={adult} onChange={event=>setAdult(event.target.checked)} required/><span>I confirm that I am 18 years old or older.</span></label>
        <label className="check-row"><input type="checkbox" checked={consent} onChange={event=>setConsent(event.target.checked)} required/><span>I agree to the processing of my information to manage this waitlist.</span></label>
        <button className="button form-button" type="submit">Join the waitlist <span aria-hidden="true">→</span></button>
        {message && <p className="form-notice" role="status">{message}</p>}
        <small>We will only use your details for waitlist communication. You can unsubscribe at any time.</small>
      </form>
    </section>
    <footer className="site-footer" id="how-it-works"><a className="brand" href="#home"><BrandMark small/><span>UBWENZI</span></a><span>Real connections. Meaningful relationships.</span><span>© {new Date().getFullYear()} UBWENZI · Adults 18+</span></footer>
  </main>;
}
