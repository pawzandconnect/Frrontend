import { Heart, MessageCircle, Plus } from 'lucide-react';
import type { Pet } from '../../data/mockPets';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface PetCardProps {
    pet: Pet;
    isActive?: boolean;
    onCommentClick: () => void;
}

export default function PetCard({ pet, onCommentClick }: PetCardProps) {
    const [liked, setLiked] = useState(false);
    const { requireAuth, openPetIntroModal } = useAuth();

    const handleLike = () => {
        requireAuth(() => {
            setLiked(!liked);
        });
    };

    const handleConnect = () => {
        requireAuth(() => {
            openPetIntroModal();
        });
    };

    return (
        <div className="relative w-full h-full bg-black snap-start shrink-0 overflow-hidden">
            {/* Background Image */}
            <img
                src={pet.image}
                alt={pet.name}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

            {/* Bottom Info Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">

                {/* Top Row: Profile, Name, Actions */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {/* Profile Pic */}
                        <button
                            onClick={handleConnect}
                            className="relative active:scale-95 transition-transform"
                        >
                            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1 border border-white flex items-center justify-center">
                                <Plus size={10} className="text-white stroke-[3]" />
                            </div>
                        </button>

                        {/* Username */}
                        <span className="text-white font-bold text-lg drop-shadow-md shadow-black">@{pet.name}</span>
                    </div>

                    {/* Actions (Like & Comment) */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={handleLike}
                                className="p-0 transition-transform active:scale-90"
                            >
                                <Heart size={28} className={liked ? "fill-primary-500 text-primary-500" : "text-white"} fill={liked ? "currentColor" : "none"} />
                            </button>
                            <span className="text-white text-sm font-medium drop-shadow-md">3M</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={onCommentClick}
                                className="p-0 text-white transition-transform active:scale-90"
                            >
                                <MessageCircle size={28} />
                            </button>
                            <span className="text-white text-sm font-medium drop-shadow-md">2.5K</span>
                        </div>
                    </div>
                </div>

                {/* Caption */}
                <p className="text-white/95 text-base leading-relaxed line-clamp-2 drop-shadow-md pr-4">
                    {pet.bio} <span className="font-bold">#pawz #cute</span>
                </p>
            </div>
        </div>
    );
}
