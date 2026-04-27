import BackButton from '../components/BackButton';
import { useLang } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLang();

  return (
    <div className="page about-page">
      <BackButton to="/" />
      <header className="nf-section-head">
        <span className="nf-section-head__num">№02</span>
        <h2 className="nf-section-head__title">{t('aboutTitle')}</h2>
        <span className="nf-section-head__meta">{t('aboutMeta')}</span>
      </header>

      <section className="about-lead">
        <p className="about-lead__text">{t('aboutLead')}</p>
      </section>

      <section className="about-body">
        <p>{t('aboutBody1')}</p>
        <p>{t('aboutBody2')}</p>
      </section>

      <section className="about-values">
        <h3 className="about-values__title">{t('aboutValuesTitle')}</h3>
        <div className="about-values__grid">
          <article className="about-value">
            <span className="about-value__num">01</span>
            <h4>{t('aboutValue1Title')}</h4>
            <p>{t('aboutValue1Body')}</p>
          </article>
          <article className="about-value">
            <span className="about-value__num">02</span>
            <h4>{t('aboutValue2Title')}</h4>
            <p>{t('aboutValue2Body')}</p>
          </article>
          <article className="about-value">
            <span className="about-value__num">03</span>
            <h4>{t('aboutValue3Title')}</h4>
            <p>{t('aboutValue3Body')}</p>
          </article>
        </div>
      </section>
    </div>
  );
}
