import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, X, ChevronDown, Search, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function OwnerProfileSetup() {
    const navigate = useNavigate();
    const { completeOwnerProfile } = useAuth();
    const { showToast } = useToast();
    const [step, setStep] = useState(1); // 1: Setup Your Profile, 2: Choose Your Preferences

    const [formData, setFormData] = useState({
        displayName: '',
        location: '',
        bio: '',
        travelDistance: '',
        lookingFor: [] as string[],
        meetupLocations: [] as string[],
        preferredLocation: ''
    });

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else {
            completeOwnerProfile(formData);
            showToast('Profile setup complete! 🎉');
            navigate('/chats');
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate(-1);
        }
    };

    const toggleLookingFor = (opt: string) => {
        setFormData(prev => ({
            ...prev,
            lookingFor: prev.lookingFor.includes(opt)
                ? prev.lookingFor.filter(i => i !== opt)
                : [...prev.lookingFor, opt]
        }));
    };

    const toggleMeetupLocation = (opt: string) => {
        setFormData(prev => ({
            ...prev,
            meetupLocations: prev.meetupLocations.includes(opt)
                ? prev.meetupLocations.filter(i => i !== opt)
                : [...prev.meetupLocations, opt]
        }));
    };

    const renderStep1 = () => (
        <div className="animate-fade-in space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-[#E5E5FF] flex items-center justify-center text-[#9090FF]">
                        <Camera size={32} />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                        <div className="w-4 h-4 text-gray-400">✎</div>
                    </button>
                </div>
                <p className="text-gray-500 text-sm">Tap icon to add your profile picture</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Display Name</label>
                    <input
                        type="text"
                        placeholder="e.g ms_tamayo"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350]/20 transition-all"
                        value={formData.displayName}
                        onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search location"
                            className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:border-[#EF5350] transition-all"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <ChevronDown size={18} />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Bio</label>
                    <div className="relative">
                        <textarea
                            placeholder="Describe yourself..."
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:border-[#EF5350] transition-all min-h-[140px] resize-none"
                            value={formData.bio}
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        />
                        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs text-gray-400">
                            <span>0/300</span>
                            <div className="w-3 h-3 text-gray-300">✎</div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Travel distance preference</label>
                    <div className="relative">
                        <select
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:border-[#EF5350] appearance-none text-gray-500 transition-all"
                            value={formData.travelDistance}
                            onChange={e => setFormData({ ...formData, travelDistance: e.target.value })}
                        >
                            <option value="">Select how far you and your pet can go</option>
                            <option value="5km">Within 5km</option>
                            <option value="10km">Within 10km</option>
                            <option value="25km">Within 25km</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <ChevronDown size={18} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-[11px] text-gray-500">
                        <div className="w-4 h-4 rounded-full bg-gray-400 text-white flex items-center justify-center">
                            <Info size={10} />
                        </div>
                        <p>This matches you with nearby playdates and meetups.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="animate-fade-in space-y-8">
            <div>
                <h2 className="text-base font-semibold text-gray-900 mb-4">What's your pet looking for?</h2>
                <div className="flex flex-wrap gap-2.5">
                    {['Playdates', 'Mating', 'Community', 'Health support', 'Grooming help'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => toggleLookingFor(opt)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${formData.lookingFor.includes(opt)
                                    ? 'bg-gray-100 text-gray-900 border border-gray-100 shadow-sm'
                                    : 'bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-base font-semibold text-gray-900 mb-4">Select your preferred meetup location</h2>
                <div className="flex flex-wrap gap-2.5 mb-6">
                    {['Local park', 'Estate park', 'Sports field', 'Mall outdoors', 'Outdoor lounge', 'Vet clinic', 'Grooming Salon', 'Courtyard'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => toggleMeetupLocation(opt)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${formData.meetupLocations.includes(opt)
                                    ? 'bg-gray-100 text-gray-900 border border-gray-100 shadow-sm'
                                    : 'bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                    <button className="px-5 py-2.5 rounded-full bg-[#EF5350] text-white text-sm font-medium flex items-center gap-2 shadow-sm">
                        Others <X size={14} />
                    </button>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900">Preferred Location</label>
                    <input
                        type="text"
                        placeholder="Enter your preferred location"
                        className="w-full px-4 py-3.5 rounded-xl border border-surface-100 bg-white outline-none focus:border-[#EF5350] transition-all"
                        value={formData.preferredLocation}
                        onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="px-4 py-4 flex items-center">
                <button onClick={handleBack} className="p-2 text-gray-900 hover:bg-gray-50 rounded-full transition-colors mr-2">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-gray-900">
                        {step === 1 ? 'Setup Your Profile' : 'Choose Your Preferences'}
                    </h1>
                </div>
                <div className="flex gap-1.5 px-4">
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i === (step + 2) ? 'bg-[#EF5350]' : 'bg-gray-100'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-4 overflow-y-auto">
                {step === 1 ? renderStep1() : renderStep2()}
            </div>

            {/* Footer */}
            <div className="p-6 border-surface-100 bg-white">
                <div className="flex gap-4">
                    <button
                        onClick={handleBack}
                        className="flex-1 py-4 rounded-full bg-gray-50 text-gray-700 font-bold text-sm tracking-wide hover:bg-gray-100 active:scale-[0.98] transition-all"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-1 py-4 rounded-full bg-[#EF5350] text-white font-bold text-sm tracking-wide shadow-lg shadow-red-100 active:scale-[0.98] transition-all"
                    >
                        {step === 2 ? 'Save and Submit' : 'Save and Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
}
