import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

interface BackButtonProps {
  to?: string;
  label?: string;
}

export default function BackButton({ to, label }: BackButtonProps) {
  const navigate = useNavigate();
  const { t } = useLang();
  const text = label ?? t('back');

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button type="button" className="page-back" onClick={handleClick}>
      <ArrowLeft size={18} strokeWidth={2.8} />
      {text}
    </button>
  );
}
