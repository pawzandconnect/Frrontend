import { createContext, useContext, useState, type ReactNode } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error';
}

interface ToastContextType {
    showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className="animate-slide-down pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-full bg-white shadow-lg shadow-black/5 border border-gray-100 min-w-[300px] max-w-md"
                    >
                        {toast.type === 'success' ? (
                            <CheckCircle size={20} className="text-green-500 shrink-0" />
                        ) : (
                            <XCircle size={20} className="text-red-500 shrink-0" />
                        )}
                        <p className="text-sm font-medium text-gray-800 flex-1">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
