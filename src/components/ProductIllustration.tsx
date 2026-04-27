type Props = {
  category?: string;
  title?: string;
  className?: string;
};

const INK = 'var(--ink)';
const FLAME = 'var(--accent)';

function pickShape(category?: string, title?: string) {
  const blob = `${(category || '').toLowerCase()} ${(title || '').toLowerCase()}`;
  if (/(hood|худи)/.test(blob)) return 'hood';
  if (/(jean|джин|pants|штан|брюки|trouser)/.test(blob)) return 'pants';
  if (/(cap|кеп|hat|beanie)/.test(blob)) return 'cap';
  if (/(shirt|рубаш)/.test(blob)) return 'shirt';
  if (/(sweat|свит|sweater|jumper|jacket|куртк|пальто|coat|vest)/.test(blob)) return 'block';
  if (/(shoe|sneaker|кросс|boot|обувь)/.test(blob)) return 'sneaker';
  if (/(t-shirt|футбол|tshirt|tee)/.test(blob)) return 'tee';
  return 'tee';
}

function Tee() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <rect x="55" y="60" width="90" height="100" fill={INK} />
      <rect x="40" y="60" width="20" height="40" fill={INK} />
      <rect x="140" y="60" width="20" height="40" fill={INK} />
      <rect x="86" y="60" width="28" height="14" fill="var(--cream)" />
      <rect x="120" y="138" width="22" height="22" fill={FLAME} />
    </svg>
  );
}

function Hood() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path d="M70 40 Q100 22 130 40 L130 70 Q100 86 70 70 Z" fill={INK} />
      <rect x="55" y="68" width="90" height="100" fill={INK} />
      <rect x="40" y="70" width="20" height="46" fill={INK} />
      <rect x="140" y="70" width="20" height="46" fill={INK} />
      <line x1="100" y1="84" x2="100" y2="160" stroke="var(--cream)" strokeWidth="3" />
      <rect x="120" y="150" width="22" height="14" fill={FLAME} />
    </svg>
  );
}

function Pants() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <rect x="62" y="40" width="76" height="14" fill={INK} />
      <polygon points="62,54 96,54 92,170 70,170" fill={INK} />
      <polygon points="138,54 104,54 108,170 130,170" fill={INK} />
      <rect x="62" y="42" width="76" height="6" fill={FLAME} />
    </svg>
  );
}

function Cap() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path d="M50 110 Q50 70 100 70 Q150 70 150 110 L150 122 L50 122 Z" fill={INK} />
      <rect x="36" y="122" width="148" height="16" fill={INK} />
      <rect x="92" y="84" width="16" height="16" fill={FLAME} />
    </svg>
  );
}

function Shirt() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <rect x="55" y="60" width="90" height="108" fill={INK} />
      <polygon points="78,60 100,82 122,60 100,52" fill="var(--cream)" />
      <line x1="100" y1="82" x2="100" y2="166" stroke="var(--cream)" strokeWidth="3" />
      <rect x="40" y="60" width="20" height="44" fill={INK} />
      <rect x="140" y="60" width="20" height="44" fill={INK} />
      <rect x="118" y="148" width="20" height="20" fill={FLAME} />
    </svg>
  );
}

function Block() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <rect x="50" y="58" width="100" height="110" fill={INK} />
      <rect x="38" y="62" width="22" height="50" fill={INK} />
      <rect x="140" y="62" width="22" height="50" fill={INK} />
      <rect x="78" y="58" width="44" height="14" fill="var(--cream)" />
      <rect x="58" y="148" width="84" height="6" fill={FLAME} />
    </svg>
  );
}

function Sneaker() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path d="M28 110 L70 100 L120 78 L150 78 L172 110 L172 134 L28 134 Z" fill={INK} />
      <rect x="28" y="134" width="144" height="6" fill={FLAME} />
      <line x1="80" y1="98" x2="84" y2="118" stroke="var(--cream)" strokeWidth="2.5" />
      <line x1="100" y1="92" x2="104" y2="116" stroke="var(--cream)" strokeWidth="2.5" />
      <line x1="120" y1="86" x2="124" y2="116" stroke="var(--cream)" strokeWidth="2.5" />
    </svg>
  );
}

export default function ProductIllustration({ category, title, className }: Props) {
  const shape = pickShape(category, title);
  const node =
    shape === 'hood'
      ? <Hood />
      : shape === 'pants'
      ? <Pants />
      : shape === 'cap'
      ? <Cap />
      : shape === 'shirt'
      ? <Shirt />
      : shape === 'block'
      ? <Block />
      : shape === 'sneaker'
      ? <Sneaker />
      : <Tee />;

  return (
    <div className={`product-illustration ${className || ''}`} aria-hidden="true">
      {node}
    </div>
  );
}
