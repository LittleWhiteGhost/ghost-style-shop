interface PageHeadProps {
  num: string;
  title: string;
  meta?: string;
}

export default function PageHead({ num, title, meta }: PageHeadProps) {
  return (
    <header className="nf-section-head">
      <span className="nf-section-head__num">{num}</span>
      <h2 className="nf-section-head__title">{title}</h2>
      {meta && <span className="nf-section-head__meta">{meta}</span>}
    </header>
  );
}
