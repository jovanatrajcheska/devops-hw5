import "../styles/hero.css";

export default function App() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      <div className="hero-glass">
        <h1 className="hero-title">
          Toy <span>Exchange</span>
        </h1>
        <p className="hero-sub">
          List toys, send swap requests, and confirm pickups with a smile.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href="/toys">Browse Toys</a>
          <a className="btn btn-ghost" href="/swaps">View Swaps</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="num">100+</span>
            <span className="label">swaps per month</span>
          </div>
          <div className="stat">
            <span className="num">∞</span>
            <span className="label">fun</span>
          </div>
          <div className="stat">
            <span className="num">0</span>
            <span className="label">mess</span>
          </div>
        </div>
      </div>
    </section>
  );
}
