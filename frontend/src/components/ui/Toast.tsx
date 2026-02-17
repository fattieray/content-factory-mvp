interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const typeClasses = {
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    info: 'bg-gray-800 text-white',
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${typeClasses[type]}`}>
      {message}
    </div>
  );
}
