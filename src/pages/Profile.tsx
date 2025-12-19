import { useState } from 'react';
import { Settings, PawPrint, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, requireAuth, openPetIntroModal } = useAuth();
    const [activeTab, setActiveTab] = useState<'posts' | 'owner' | 'details'>('owner');

    // Mock Data (matching screenshots)
    const petData = {
        name: "Daenerys",
        gender: "Male",
        breed: "Turkish Angora",
        age: "5yrs",
        connections: 150,
        friends: 15,
        postsCount: 48,
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop",
        about: "Meet Daenerys, a graceful Turkish Angora with soft white fur and mesmerizing blue eyes. He's calm, gentle, and loves quiet corners, soft pets, and cozy naps. Perfect for peaceful playdates and slow bonding moments — He'll steal your heart with his elegance and calm charm.",
        size: "Medium size",
        energy: "High energy",
        spayed: "Spayed",
        vaccinated: "Vaccinated",
        temperament: ["Playful", "Friendly", "Aggressive"], // Aggressive is in the screenshot, keeping it for fidelity
    };

    const ownerData = {
        name: "Amara",
        location: "Abakapa Enugu, Nigeria",
        image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=200&auto=format&fit=crop",
        about: "Hi, I'm Amara — a calm, outdoorsy pet lover who enjoys long walks, cozy evenings, and connecting with other animal enthusiasts. I believe every pet deserves friendship and fun! When I'm not working, I'm usually exploring parks with my Turkish Angora, or reading about animal care.",
        lookingFor: ["Playdates", "Mating opportunities", "Community"],
        willingToTravel: ["2km", "5km", "10km"],
        temperament: ["Playful", "Friendly", "Aggressive"],
        adoptionStatus: false
    };

    const posts = [
        { id: 1, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop", type: 'video' },
        { id: 2, image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=400&auto=format&fit=crop", type: 'image' },
        { id: 3, image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400&auto=format&fit=crop", type: 'image' },
        { id: 4, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=400&auto=format&fit=crop", type: 'image' },
        { id: 5, image: "https://images.unsplash.com/photo-1495360019602-e001922271fe?q=80&w=400&auto=format&fit=crop", type: 'image' },
        { id: 6, image: "https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=400&auto=format&fit=crop", type: 'video' },
        { id: 7, image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=400&auto=format&fit=crop", type: 'image' },
        { id: 8, image: "https://images.unsplash.com/photo-1501820488136-72669149e0d4?q=80&w=400&auto=format&fit=crop", type: 'image' },
        { id: 9, image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=400&auto=format&fit=crop", type: 'image' },
    ];

    const handleConnect = () => {
        requireAuth(() => {
            openPetIntroModal();
        });
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header Section */}
            <div className="px-6 pt-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{user?.name || petData.name}</h1>
                        <p className="text-gray-500 text-sm">{petData.gender} • {petData.breed}</p>
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-100 p-0.5">
                        <img
                            src={user?.avatar || petData.image}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mb-6">
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{petData.connections}</div>
                        <div className="text-xs text-gray-500">Connections</div>
                    </div>
                    <div className="w-px bg-gray-100" />
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{petData.friends}</div>
                        <div className="text-xs text-gray-500">Friends</div>
                    </div>
                    <div className="w-px bg-gray-100" />
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{petData.postsCount}</div>
                        <div className="text-xs text-gray-500">Posts</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mb-2">
                    <button
                        onClick={handleConnect}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        <PawPrint size={16} className="fill-gray-900" />
                        Connect
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2.5 rounded-full text-sm font-semibold transition-colors">
                        Share profile
                    </button>
                    <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-900 transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-100">
                <div className="flex px-6">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${activeTab === 'posts' ? 'text-[#EF5350]' : 'text-gray-400'
                            }`}
                    >
                        Posts
                        {activeTab === 'posts' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EF5350]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('owner')}
                        className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${activeTab === 'owner' ? 'text-[#EF5350]' : 'text-gray-400'
                            }`}
                    >
                        Owner
                        {activeTab === 'owner' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EF5350]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${activeTab === 'details' ? 'text-[#EF5350]' : 'text-gray-400'
                            }`}
                    >
                        Pet Details
                        {activeTab === 'details' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EF5350]" />
                        )}
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="pb-20">
                {activeTab === 'posts' && (
                    <div className="grid grid-cols-3 gap-0.5">
                        {posts.map(post => (
                            <div key={post.id} className="aspect-square relative bg-gray-100">
                                <img src={post.image} alt="" className="w-full h-full object-cover" />
                                {post.type === 'video' && (
                                    <div className="absolute top-1 right-1">
                                        <Play size={12} className="text-white fill-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'owner' && (
                    <div className="p-6 space-y-6 animate-fade-in">
                        {/* Owner Header */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={ownerData.image} alt={ownerData.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{ownerData.name}</h3>
                                <p className="text-xs text-gray-500">{ownerData.location}</p>
                            </div>
                        </div>

                        {/* About */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {ownerData.about}
                            </p>
                        </div>

                        {/* Looking For */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Looking for</h4>
                            <div className="flex flex-wrap gap-2">
                                {ownerData.lookingFor.map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Willing to Travel */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Willing to Travel</h4>
                            <div className="flex flex-wrap gap-2">
                                {ownerData.willingToTravel.map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Temperament */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Temperament</h4>
                            <div className="flex flex-wrap gap-2">
                                {ownerData.temperament.map((item, i) => (
                                    <span
                                        key={item}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${i === 0 ? 'bg-green-50 text-green-700 border border-green-100' :
                                            i === 1 ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                                'bg-orange-50 text-orange-700 border border-orange-100'
                                            }`}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Adoption Toggle */}
                        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">Put Up for Adoption?</h4>
                                <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                                    Turning this on lets caring pet lovers find and adopt your pet.
                                </p>
                            </div>
                            <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                <div className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 left-0.5" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'details' && (
                    <div className="p-6 space-y-6 animate-fade-in">
                        {/* Pet Header */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={petData.image} alt={petData.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{petData.name}</h3>
                                <p className="text-xs text-gray-500">{petData.gender} • {petData.breed} • {petData.age}</p>
                            </div>
                        </div>

                        {/* About */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {petData.about}
                            </p>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Additional Information</h4>
                            <div className="flex flex-wrap gap-2">
                                {[petData.size, petData.energy, petData.spayed, petData.vaccinated].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Temperament */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Temperament</h4>
                            <div className="flex flex-wrap gap-2">
                                {petData.temperament.map((item, i) => (
                                    <span
                                        key={item}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${i === 0 ? 'bg-green-50 text-green-700 border border-green-100' :
                                            i === 1 ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                                'bg-orange-50 text-orange-700 border border-orange-100'
                                            }`}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
