import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, MessageCircle, Share2, ShieldCheck } from 'lucide-react';
import { MOCK_PETS } from '../data/mockPets';

export default function PetProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const pet = MOCK_PETS.find(p => p.id === id);

    if (!pet) {
        return <div className="p-8 text-center">Pet not found</div>;
    }

    return (
        <div className="bg-white min-h-full pb-20">
            {/* Header Image */}
            <div className="relative h-96">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="px-6 -mt-8 relative z-10">
                <div className="bg-white rounded-3xl p-6 shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-surface-900 flex items-center gap-2">
                                {pet.name}
                                <ShieldCheck className="text-primary-500" size={24} />
                            </h1>
                            <p className="text-surface-500 font-medium">{pet.breed} • {pet.age}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">
                                <Heart size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center text-surface-500 mb-6">
                        <MapPin size={18} className="mr-1" />
                        <span>{pet.distance} away</span>
                    </div>

                    <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
                        {pet.tags.map(tag => (
                            <span key={tag} className="px-4 py-2 rounded-full bg-surface-100 text-surface-600 text-sm font-medium whitespace-nowrap">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-surface-900 mb-3">About {pet.name}</h2>
                        <p className="text-surface-600 leading-relaxed">
                            {pet.bio}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-surface-900 mb-4">Owner</h2>
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-surface-100 bg-surface-50">
                            <img src={pet.owner.image} alt={pet.owner.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold text-surface-900">{pet.owner.name}</h3>
                                <p className="text-sm text-surface-500">Response time: &lt; 1 hr</p>
                            </div>
                            <button className="ml-auto px-4 py-2 bg-white border border-surface-200 rounded-full text-sm font-medium text-surface-700">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-surface-100 max-w-md mx-auto z-50">
                <div className="flex gap-4">
                    <button className="flex-1 py-3.5 rounded-xl bg-primary-500 text-white font-bold shadow-lg shadow-primary-500/30 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <MessageCircle size={20} />
                        Connect
                    </button>
                    <button className="p-3.5 rounded-xl bg-surface-100 text-surface-900 font-bold active:scale-95 transition-all">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
