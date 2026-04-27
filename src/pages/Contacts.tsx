import { Mail, Phone, Send, MapPin, Clock } from 'lucide-react';
import BackButton from '../components/BackButton';
import PageHead from '../components/PageHead';
import { useLang } from '../i18n/LanguageContext';

export default function Contacts() {
  const { t } = useLang();

  return (
    <div className="page contacts-page">
      <BackButton to="/" />
      <PageHead num="№04" title={t('contactsTitle')} meta={t('contactsMeta')} />

      <p className="contacts-lead">{t('contactsLead')}</p>

      <ul className="contacts-list">
        <li className="contacts-item">
          <Mail size={22} strokeWidth={2.8} />
          <div>
            <span className="contacts-item__label">{t('contactsEmail')}</span>
            <a className="contacts-item__value" href={`mailto:${t('contactsEmailValue')}`}>
              {t('contactsEmailValue')}
            </a>
          </div>
        </li>
        <li className="contacts-item">
          <Phone size={22} strokeWidth={2.8} />
          <div>
            <span className="contacts-item__label">{t('contactsPhone')}</span>
            <a className="contacts-item__value" href={`tel:${t('contactsPhoneValue').replace(/[^+\d]/g, '')}`}>
              {t('contactsPhoneValue')}
            </a>
          </div>
        </li>
        <li className="contacts-item">
          <Send size={22} strokeWidth={2.8} />
          <div>
            <span className="contacts-item__label">{t('contactsTelegram')}</span>
            <a
              className="contacts-item__value"
              href={`https://t.me/${t('contactsTelegramValue').replace(/^@/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('contactsTelegramValue')}
            </a>
          </div>
        </li>
        <li className="contacts-item">
          <MapPin size={22} strokeWidth={2.8} />
          <div>
            <span className="contacts-item__label">{t('contactsAddress')}</span>
            <span className="contacts-item__value">{t('contactsAddressValue')}</span>
          </div>
        </li>
        <li className="contacts-item">
          <Clock size={22} strokeWidth={2.8} />
          <div>
            <span className="contacts-item__label">{t('contactsHours')}</span>
            <span className="contacts-item__value">{t('contactsHoursValue')}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
