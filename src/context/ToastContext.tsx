import { createContext, useCallback, useContext, useRef, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface Toast {
  id: number;
  title: string;
  linkText?: string;
  linkTo?: string;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

const TOAST_TIMEOUT = 2800;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [exiting, setExiting] = useState<Set<number>>(new Set());
  const idRef = useRef(0);

  const removeToast = useCallback((id: number) => {
    setExiting(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
      setExiting(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 240);
  }, []);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    idRef.current += 1;
    const id = idRef.current;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), TOAST_TIMEOUT);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${exiting.has(t.id) ? 'toast-exit' : ''}`}>
            <span className="toast-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <div className="toast-body">
              <span className="toast-title">{t.title}</span>
              {t.linkTo && t.linkText && (
                <Link to={t.linkTo} className="toast-link" onClick={() => removeToast(t.id)}>
                  {t.linkText} →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
