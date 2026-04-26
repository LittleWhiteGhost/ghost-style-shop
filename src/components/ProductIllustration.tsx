type Props = {
  category?: string;
  title?: string;
  className?: string;
};

const INK = 'var(--ink)';
const FLAME = 'var(--accent)';
const CREAM = 'var(--cream)';

function Tshirt() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-tee" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={INK} opacity="0.55" />
        </pattern>
      </defs>
      <path
        d="M55 50 L80 38 Q100 50 120 38 L145 50 L168 70 L150 90 L138 80 L138 162 Q100 172 62 162 L62 80 L50 90 L32 70 Z"
        fill={INK}
      />
      <path d="M82 40 Q100 56 118 40" stroke={CREAM} strokeWidth="3" fill="none" />
      <rect x="62" y="120" width="76" height="42" fill="url(#halftone-tee)" />
      <path d="M124 92 L148 92 L138 110 Z" fill={FLAME} />
    </svg>
  );
}

function Hoodie() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-hood" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={INK} opacity="0.6" />
        </pattern>
      </defs>
      <path
        d="M55 60 L78 42 Q100 30 122 42 L145 60 L170 80 L152 100 L142 88 L142 168 Q100 178 58 168 L58 88 L48 100 L30 80 Z"
        fill={INK}
      />
      <path d="M78 42 Q100 64 122 42 L122 70 Q100 84 78 70 Z" fill={CREAM} />
      <path d="M88 64 Q100 72 112 64" stroke={INK} strokeWidth="2" fill="none" />
      <line x1="100" y1="80" x2="100" y2="170" stroke={CREAM} strokeWidth="3" />
      <rect x="58" y="130" width="84" height="38" fill="url(#halftone-hood)" />
      <rect x="118" y="100" width="20" height="6" fill={FLAME} />
    </svg>
  );
}

function Sweatshirt() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-sw" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={INK} opacity="0.55" />
        </pattern>
      </defs>
      <path
        d="M55 55 L78 40 Q100 50 122 40 L145 55 L168 75 L150 95 L140 85 L140 165 Q100 175 60 165 L60 85 L50 95 L32 75 Z"
        fill={INK}
      />
      <ellipse cx="100" cy="48" rx="20" ry="8" fill={CREAM} />
      <rect x="60" y="155" width="80" height="10" fill={FLAME} />
      <rect x="60" y="120" width="80" height="32" fill="url(#halftone-sw)" />
    </svg>
  );
}

function Jeans() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-jn" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CREAM} opacity="0.5" />
        </pattern>
      </defs>
      <path d="M62 30 L138 30 L142 60 L132 180 L108 180 L100 80 L92 180 L68 180 L58 60 Z" fill={INK} />
      <rect x="62" y="32" width="76" height="14" fill={FLAME} />
      <rect x="62" y="60" width="76" height="120" fill="url(#halftone-jn)" />
      <rect x="92" y="46" width="6" height="14" fill={CREAM} />
      <line x1="100" y1="60" x2="100" y2="80" stroke={CREAM} strokeWidth="2" />
    </svg>
  );
}

function Pants() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-pt" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CREAM} opacity="0.45" />
        </pattern>
      </defs>
      <path d="M65 32 L135 32 L138 56 L128 178 L108 178 L100 78 L92 178 L72 178 L62 56 Z" fill={INK} />
      <rect x="65" y="34" width="70" height="10" fill={FLAME} />
      <rect x="65" y="56" width="70" height="120" fill="url(#halftone-pt)" />
    </svg>
  );
}

function Cap() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-cp" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CREAM} opacity="0.55" />
        </pattern>
      </defs>
      <path d="M40 110 Q40 60 100 60 Q160 60 160 110 L160 124 L40 124 Z" fill={INK} />
      <path d="M40 124 L180 124 L188 142 L24 142 Z" fill={INK} />
      <rect x="42" y="78" width="116" height="46" fill="url(#halftone-cp)" />
      <circle cx="100" cy="98" r="14" fill={FLAME} />
      <path d="M94 92 L106 92 L106 104 L100 110 L94 104 Z" fill={INK} />
    </svg>
  );
}

function Shirt() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-sh" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={INK} opacity="0.5" />
        </pattern>
      </defs>
      <path d="M55 50 L82 38 L100 60 L118 38 L145 50 L165 72 L150 92 L140 82 L140 168 Q100 176 60 168 L60 82 L50 92 L35 72 Z" fill={INK} />
      <path d="M82 38 L100 60 L118 38 L100 50 Z" fill={CREAM} />
      <line x1="100" y1="60" x2="100" y2="170" stroke={CREAM} strokeWidth="2.5" />
      <circle cx="100" cy="96" r="2.4" fill={FLAME} />
      <circle cx="100" cy="118" r="2.4" fill={FLAME} />
      <circle cx="100" cy="140" r="2.4" fill={FLAME} />
      <rect x="60" y="130" width="80" height="38" fill="url(#halftone-sh)" />
    </svg>
  );
}

function Sweater() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-sv" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CREAM} opacity="0.45" />
        </pattern>
      </defs>
      <path d="M52 56 L80 40 Q100 50 120 40 L148 56 L172 78 L154 98 L142 86 L142 162 L138 172 L62 172 L58 162 L58 86 L46 98 L28 78 Z" fill={INK} />
      <path d="M82 42 Q100 56 118 42" stroke={CREAM} strokeWidth="3" fill="none" />
      <rect x="58" y="160" width="84" height="12" fill={FLAME} />
      <g fill={CREAM} opacity="0.85">
        <rect x="68" y="100" width="8" height="2" />
        <rect x="80" y="100" width="8" height="2" />
        <rect x="92" y="100" width="8" height="2" />
        <rect x="104" y="100" width="8" height="2" />
        <rect x="116" y="100" width="8" height="2" />
        <rect x="128" y="100" width="8" height="2" />
        <rect x="68" y="118" width="8" height="2" />
        <rect x="80" y="118" width="8" height="2" />
        <rect x="92" y="118" width="8" height="2" />
        <rect x="104" y="118" width="8" height="2" />
        <rect x="116" y="118" width="8" height="2" />
        <rect x="128" y="118" width="8" height="2" />
        <rect x="68" y="136" width="8" height="2" />
        <rect x="80" y="136" width="8" height="2" />
        <rect x="92" y="136" width="8" height="2" />
        <rect x="104" y="136" width="8" height="2" />
        <rect x="116" y="136" width="8" height="2" />
        <rect x="128" y="136" width="8" height="2" />
      </g>
      <rect x="58" y="74" width="84" height="20" fill="url(#halftone-sv)" />
    </svg>
  );
}

function Jacket() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-jk" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CREAM} opacity="0.5" />
        </pattern>
      </defs>
      <path d="M48 56 L78 38 L100 50 L122 38 L152 56 L174 80 L156 100 L142 86 L142 172 L58 172 L58 86 L44 100 L26 80 Z" fill={INK} />
      <path d="M78 38 L100 50 L100 172" stroke={CREAM} strokeWidth="3" fill="none" />
      <path d="M122 38 L100 50" stroke={CREAM} strokeWidth="3" fill="none" />
      <rect x="58" y="100" width="84" height="40" fill="url(#halftone-jk)" />
      <rect x="68" y="148" width="22" height="14" fill={FLAME} />
      <rect x="110" y="148" width="22" height="14" fill={FLAME} />
      <rect x="62" y="76" width="20" height="20" fill="none" stroke={CREAM} strokeWidth="2" />
      <rect x="118" y="76" width="20" height="20" fill="none" stroke={CREAM} strokeWidth="2" />
    </svg>
  );
}

function Coat() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-co" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CREAM} opacity="0.4" />
        </pattern>
      </defs>
      <path d="M50 50 L80 36 L100 52 L120 36 L150 50 L170 76 L154 96 L144 84 L144 184 L56 184 L56 84 L46 96 L30 76 Z" fill={INK} />
      <path d="M100 52 L100 184" stroke={CREAM} strokeWidth="3" fill="none" />
      <rect x="56" y="100" width="88" height="60" fill="url(#halftone-co)" />
      <circle cx="86" cy="120" r="3" fill={FLAME} />
      <circle cx="86" cy="146" r="3" fill={FLAME} />
      <circle cx="86" cy="172" r="3" fill={FLAME} />
      <path d="M80 36 L100 52 L80 56 Z" fill={CREAM} />
      <path d="M120 36 L100 52 L120 56 Z" fill={CREAM} />
    </svg>
  );
}

function Vest() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-vs" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CREAM} opacity="0.45" />
        </pattern>
      </defs>
      <path d="M58 60 L80 40 L100 64 L120 40 L142 60 L142 168 L100 174 L58 168 Z" fill={INK} />
      <line x1="100" y1="64" x2="100" y2="174" stroke={CREAM} strokeWidth="3" />
      <rect x="68" y="84" width="64" height="40" fill="url(#halftone-vs)" />
      <rect x="68" y="138" width="26" height="22" fill={FLAME} opacity="0.9" />
      <rect x="106" y="138" width="26" height="22" fill={FLAME} opacity="0.9" />
    </svg>
  );
}

function Sneaker() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-sn" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={CREAM} opacity="0.5" />
        </pattern>
      </defs>
      <path d="M22 130 L36 96 Q56 78 90 80 L104 64 Q124 60 134 78 L168 110 Q186 118 184 138 L176 152 L20 152 Z" fill={INK} />
      <rect x="20" y="142" width="166" height="16" fill={FLAME} />
      <path d="M60 96 L70 110 M80 88 L92 104 M100 84 L112 100 M122 92 L132 110" stroke={CREAM} strokeWidth="3" />
      <rect x="40" y="118" width="120" height="20" fill="url(#halftone-sn)" />
      <circle cx="148" cy="116" r="4" fill={CREAM} />
    </svg>
  );
}

function Generic() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="halftone-gn" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1" fill={INK} opacity="0.6" />
        </pattern>
      </defs>
      <rect x="40" y="40" width="120" height="120" fill={INK} />
      <rect x="50" y="50" width="100" height="100" fill="url(#halftone-gn)" />
      <path d="M80 60 L100 110 L120 60 L114 130 L86 130 Z" fill={FLAME} />
    </svg>
  );
}

const MAP: Record<string, () => JSX.Element> = {
  tshirt: Tshirt,
  't-shirt': Tshirt,
  hoodie: Hoodie,
  sweatshirt: Sweatshirt,
  jeans: Jeans,
  pants: Pants,
  cap: Cap,
  shirt: Shirt,
  sweater: Sweater,
  jacket: Jacket,
  coat: Coat,
  vest: Vest,
  shoes: Sneaker,
  sneaker: Sneaker,
  sneakers: Sneaker,
};

function pickByName(title: string): string | null {
  const t = title.toLowerCase();
  if (/(худи|hoodie)/.test(t)) return 'hoodie';
  if (/(толстов|sweatshirt)/.test(t)) return 'sweatshirt';
  if (/(футбол|t[\s-]?shirt|tee)/.test(t)) return 'tshirt';
  if (/(джинс|jeans)/.test(t)) return 'jeans';
  if (/(брюк|штан|pants|chino|trouser)/.test(t)) return 'pants';
  if (/(кепк|cap)/.test(t)) return 'cap';
  if (/(рубашк|shirt)/.test(t)) return 'shirt';
  if (/(свитер|sweater)/.test(t)) return 'sweater';
  if (/(куртк|jacket)/.test(t)) return 'jacket';
  if (/(пуховик|coat|пальто|парка|parka)/.test(t)) return 'coat';
  if (/(жилет|vest)/.test(t)) return 'vest';
  if (/(кроссовк|обув|sneaker|shoe|boot|ботин)/.test(t)) return 'sneaker';
  return null;
}

export default function ProductIllustration({ category, title, className }: Props) {
  let key = (category || '').toLowerCase();
  if (!MAP[key] && title) {
    const guessed = pickByName(title);
    if (guessed) key = guessed;
  }
  const Renderer = MAP[key] || Generic;
  return (
    <div className={`product-illustration ${className || ''}`} aria-hidden="true">
      <Renderer />
    </div>
  );
}
