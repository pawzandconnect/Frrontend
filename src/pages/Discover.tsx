import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PETS } from '../data/mockPets';
import PetCard from '../components/feed/PetCard';
import CommentSheet from '../components/feed/CommentSheet';
import searchIcon from '../assets/icons/uploaded_image_2_1763690591227.png';
import { useAuth } from '../context/AuthContext';

export default function Discover() {
    const [activeTab, setActiveTab] = useState<'explore' | 'connections'>('explore');
    const navigate = useNavigate();

    const { requireAuth, isAuthenticated, hasProfile } = useAuth();

    const [showComments, setShowComments] = useState(false);

    const handleSetupProfile = () => {
        requireAuth(() => {
            navigate('/create-profile');
        });
    };

    return (
        <div className="h-full w-full relative bg-black">
            {/* Top Navigation Overlay */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-12 pb-4 px-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
                <div className="w-8" /> {/* Spacer */}

                <div className="flex items-center gap-4 bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/10">
                    <button
                        onClick={() => setActiveTab('explore')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'explore'
                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-md'
                            : 'text-white/60 hover:text-white/80'
                            }`}
                    >
                        Explore
                    </button>
                    <button
                        onClick={() => setActiveTab('connections')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'connections'
                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-md'
                            : 'text-white/60 hover:text-white/80'
                            }`}
                    >
                        Connections
                    </button>
                </div>

                <button className="text-white opacity-90">
                    <img src={searchIcon} alt="Search" className="w-6 h-6 brightness-0 invert" />
                </button>
            </div>

            {/* Content Area */}
            {activeTab === 'explore' ? (
                <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
                    {MOCK_PETS.map((pet) => (
                        <div key={pet.id} className="h-full w-full snap-start">
                            <PetCard
                                pet={pet}
                                isActive={true}
                                onCommentClick={() => setShowComments(true)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                // Connections Tab
                <>
                    {!isAuthenticated ? (
                        // Not logged in - prompt login
                        <div className="h-full w-full flex flex-col items-center justify-center bg-surface-50 px-8 text-center">
                            <div className="w-24 h-24 bg-surface-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <span className="text-4xl">🔒</span>
                            </div>
                            <h2 className="text-2xl font-bold text-surface-900 mb-2">Login Required</h2>
                            <p className="text-surface-500 mb-8 leading-relaxed">
                                Sign in to see your connections and connect with other pets!
                            </p>
                            <button
                                onClick={() => requireAuth(() => { })}
                                className="w-full max-w-xs bg-primary-500 text-white font-semibold py-3.5 rounded-full shadow-lg shadow-primary-200 active:scale-95 transition-all"
                            >
                                Sign In
                            </button>
                        </div>
                    ) : !hasProfile ? (
                        // Logged in but no profile - prompt setup
                        <div className="h-full w-full flex flex-col items-center justify-center bg-surface-50 px-8 text-center">
                            <div className="w-24 h-24 bg-surface-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <span className="text-4xl">😢</span>
                            </div>
                            <h2 className="text-2xl font-bold text-surface-900 mb-2">Oops, no connections yet!</h2>
                            <p className="text-surface-500 mb-8 leading-relaxed">
                                Let's fix that. Connect with some pets on the Explore page to see them here.
                            </p>
                            <button
                                onClick={handleSetupProfile}
                                className="w-full max-w-xs bg-primary-500 text-white font-semibold py-3.5 rounded-full shadow-lg shadow-primary-200 active:scale-95 transition-all"
                            >
                                Setup Pet Profile
                            </button>
                        </div>
                    ) : (
                        // Has profile - show connections feed
                        <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
                            {MOCK_PETS.slice(0, 2).map((pet) => (
                                <div key={pet.id} className="h-full w-full snap-start">
                                    <PetCard
                                        pet={pet}
                                        isActive={true}
                                        onCommentClick={() => setShowComments(true)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            <CommentSheet
                isOpen={showComments}
                onClose={() => setShowComments(false)}
            />
        </div>
    );
}
