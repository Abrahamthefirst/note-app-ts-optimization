import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import toastEvent from './ToastEmitter';
import Toast from './Toast';
const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastInput[]>([]);

  useEffect(() => {
    const handleAddToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastInput>;
      setToasts((prevToasts) => [...prevToasts, customEvent.detail]);
    };

    const handleRemoveToast = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== customEvent.detail)
      );
    };

    toastEvent.addEventListener('addToast', handleAddToast as EventListener);
    toastEvent.addEventListener(
      'removeToast',
      handleRemoveToast as EventListener
    );

    return () => {
      toastEvent.removeEventListener(
        'addToast',
        handleAddToast as EventListener
      );
      toastEvent.removeEventListener(
        'removeToast',
        handleRemoveToast as EventListener
      );
    };
  }, []);


  const handleCloseToast = useCallback((id: string) => {
    toastEvent.removeToast(id);
  }, []);

  <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} />;

  return createPortal(
    <div className="fixed top-6 left-1/2 z-[1000] flex -translate-x-1/2 transform flex-col items-start space-y-1 text-white">
      <AnimatePresence>
        {toasts.map((toastItem) => (
          <motion.button
            key={toastItem.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              y: {
                type: 'spring',
                damping: 6,
                stiffness: 150,
                restDelta: 0.0001,
              },

              default: {
                duration: 0.3,
                ease: 'easeOut',
              },
            }}
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <Toast
              message={toastItem.message}
              icon={toastItem.icon}
              handleClick={() => {
                toastItem.handleClick ? toastItem.handleClick() : '';
                handleCloseToast(toastItem.id);
              }}
              style={toastItem.style}
            />
          </motion.button>
        ))}
      </AnimatePresence>
    </div>,

    document.body
  );
};

export default ToastContainer;
