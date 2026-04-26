import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to?: string;
  label?: string;
}

export default function BackButton({ to, label = 'Назад' }: BackButtonProps) {
  const navigate = useNavigate();

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
      {label}
    </button>
  );
}
