import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PetIntroModal() {
    const { isPetIntroModalOpen, closePetIntroModal } = useAuth();
    const navigate = useNavigate();

    if (!isPetIntroModalOpen) return null;

    const handleAddPet = () => {
        closePetIntroModal();
        navigate('/create-profile');
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center sm:items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={closePetIntroModal}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl transform transition-all animate-in slide-in-from-bottom duration-300 sm:zoom-in-95">
                {/* Handle Bar */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />

                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-[#FFF8F0] rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">🐶</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Let's Meet Your Pet!</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed px-4">
                        Ready to show off your pet to the world? Just set up their profile to share their charm!
                    </p>

                    <div className="flex gap-4 w-full">
                        <button
                            onClick={closePetIntroModal}
                            className="flex-1 py-3.5 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Maybe Later
                        </button>
                        <button
                            onClick={handleAddPet}
                            className="flex-1 py-3.5 rounded-full bg-[#EF5350] text-white font-semibold shadow-lg shadow-red-200 hover:bg-[#E53935] transition-colors"
                        >
                            Add My Pet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
