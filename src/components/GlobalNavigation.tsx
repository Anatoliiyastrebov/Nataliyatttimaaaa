import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GlobalNavigation.css';

export const GlobalNavigation = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleGoStart = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/');
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showStartButton = location.pathname !== '/';

  return (
    <>
      {showStartButton && (
        <button
          type="button"
          className="global-nav-btn global-nav-start"
          aria-label="Вернуться на главную"
          onClick={handleGoStart}
        >
          ←
        </button>
      )}

      <button
        type="button"
        className={`global-nav-btn global-nav-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Наверх"
        onClick={handleScrollTop}
      >
        ↑
      </button>
    </>
  );
};
