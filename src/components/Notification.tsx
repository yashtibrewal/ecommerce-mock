import React, { useEffect, useState } from 'react';
import styles from '@/styles/Notification.module.css'; // Import the CSS Module

const Notification = ({ message, onClose }: { message: string, onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Set visibility to false for slide-out effect
      setTimeout(onClose, 300); // Call onClose after the slide-out animation
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    <div className={`${styles.message} ${isVisible ? styles.slideIn : styles.slideOut}`}>
      <span>{message}</span>
      <button
        onClick={() => { setIsVisible(false); onClose(); }}
        className={styles.closeButton}
      >
        &times; {/* Cross mark for closing */}
      </button>
    </div>
  );
};

export default Notification;
