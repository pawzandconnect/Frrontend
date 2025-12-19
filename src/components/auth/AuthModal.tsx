import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
    const { isAuthModalOpen, closeAuthModal, login } = useAuth();

    if (!isAuthModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center sm:items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={closeAuthModal}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl transform transition-all animate-in slide-in-from-bottom duration-300 sm:zoom-in-95">
                {/* Handle Bar */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                        Let's make it Official! <span className="text-2xl">🐾</span>
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed px-4">
                        Sign up to meet new friends, furry crushes, and local playmates.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-8">
                    <button
                        onClick={() => login('google')}
                        className="w-full py-3.5 px-4 bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold rounded-full flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-200"
                    >
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                        </div>
                        Continue with Google
                    </button>

                    <button
                        onClick={() => login('apple')}
                        className="w-full py-3.5 px-4 bg-black hover:bg-gray-900 text-white font-semibold rounded-full flex items-center justify-center gap-3 transition-colors shadow-lg shadow-gray-200"
                    >
                        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.75-1.42a3.73 3.73 0 0 1 2.92 1.5c-2.49 1.5-2.07 4.62.3 5.66-.24.73-.54 1.45-.86 2.16-.61 1.34-1.25 2.79-2.19 4.33zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        Continue with Apple
                    </button>
                </div>

                {/* Footer */}
                <div className="text-center mb-8">
                    <p className="text-gray-500 text-sm">
                        Already have an account?{' '}
                        <button
                            onClick={() => login('google')} // Mock sign in for now
                            className="text-[#FF5A5F] font-semibold hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                </div>

                {/* Terms */}
                <div className="border-t border-gray-100 pt-6 text-center">
                    <p className="text-xs text-gray-400 leading-relaxed px-4">
                        By continuing, you agree to our{' '}
                        <span className="text-gray-600 font-medium">Terms and Conditions</span> and acknowledge that you understand the{' '}
                        <span className="text-gray-600 font-medium">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
