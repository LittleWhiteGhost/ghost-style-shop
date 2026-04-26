import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function HeroFigure() {
  return (
    <svg viewBox="0 0 320 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="hero-halftone" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.1" fill="var(--cream)" opacity="0.65" />
        </pattern>
        <pattern id="hero-halftone-orange" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1" fill="var(--accent)" opacity="0.85" />
        </pattern>
      </defs>

      {/* Backdrop slab */}
      <rect x="20" y="20" width="280" height="320" fill="var(--ink)" />
      <rect x="32" y="32" width="256" height="296" fill="url(#hero-halftone)" />

      {/* Diagonal stripe */}
      <polygon points="20,260 300,140 300,200 20,320" fill="var(--accent)" />

      {/* Figure: head + body silhouette */}
      <g>
        {/* Head */}
        <circle cx="160" cy="92" r="36" fill="var(--cream)" />
        <path d="M124 80 Q160 58 196 80 L196 96 Q160 86 124 96 Z" fill="var(--ink)" />

        {/* Hoodie body */}
        <path
          d="M96 152 L130 124 Q160 138 190 124 L224 152 L242 188 L218 200 L210 192 L210 320 L110 320 L110 192 L102 200 L78 188 Z"
          fill="var(--ink)"
        />
        {/* Hood opening */}
        <path d="M130 124 Q160 152 190 124 L190 144 Q160 160 130 144 Z" fill="var(--cream)" />

        {/* Hoodie center stripe */}
        <line x1="160" y1="148" x2="160" y2="320" stroke="var(--accent)" strokeWidth="6" />

        {/* Halftone shading on hoodie */}
        <rect x="110" y="200" width="100" height="80" fill="url(#hero-halftone-orange)" opacity="0.45" />

        {/* Pocket */}
        <rect x="124" y="220" width="72" height="32" fill="none" stroke="var(--cream)" strokeWidth="3" />

        {/* Sleeves halftone */}
        <rect x="78" y="160" width="32" height="40" fill="url(#hero-halftone-orange)" opacity="0.6" />
        <rect x="210" y="160" width="32" height="40" fill="url(#hero-halftone-orange)" opacity="0.6" />
      </g>

      {/* FLAME badge on chest */}
      <g transform="translate(180,260) rotate(-8)">
        <rect x="0" y="0" width="46" height="14" fill="var(--accent)" />
        <text
          x="23"
          y="11"
          textAnchor="middle"
          fontFamily="Bebas Neue, sans-serif"
          fontSize="11"
          letterSpacing="0.18em"
          fill="var(--ink)"
        >
          FLAME
        </text>
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="nf-hero">
      <div className="nf-hero__inner">
        <div>
          <span className="nf-hero__eyebrow">Drop / 01 / Autumn capsule</span>
          <h1 className="nf-hero__title">
            NOIR<span className="nf-hero__amp">&amp;</span>
            <span className="flame">FLAME</span>
          </h1>
          <p className="nf-hero__sub">
            Streetwear-капсула с акцентом на угловатые силуэты,
            графичные принты и контраст оранжевого с чёрным.
            Каждая вещь — заявление.
          </p>
          <Link to="/new" className="nf-hero__cta">
            Смотреть капсулу
            <ArrowRight size={18} strokeWidth={3} />
          </Link>
        </div>
        <div className="nf-hero__art">
          <HeroFigure />
        </div>
      </div>
    </section>
  );
}
