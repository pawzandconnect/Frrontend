import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Camera, Upload, MapPin, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export default function CreateProfile() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Basic, 2: Details, 3: Owner, 4: Preferences

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic
    petName: '',
    species: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',

    // Step 2: Details
    size: '',
    temperaments: [] as string[],
    vaccination: '',
    spayedNeutered: '',
    media: [] as File[],

    // Step 3: Owner
    ownerName: '',
    location: '',
    bio: '',
    travelDistance: '',

    // Step 4: Preferences
    lookingFor: [] as string[],
    meetupLocations: [] as string[],
    preferredLocation: ''
  });

  const { showToast } = useToast();
  const { completeProfile } = useAuth();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit logic here
      completeProfile();
      showToast('Profile created successfully! 🎉');
      navigate('/discover');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  // --- Render Steps ---

  const renderInterstitial = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-fade-in">
      <div className="w-24 h-24 bg-[#FFF8F0] rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">🐶</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Let's Meet Your Pet!</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Ready to show off your pet to the world? Just set up their profile to share their charm!
      </p>
      <div className="flex gap-4 w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3.5 rounded-full bg-gray-100 text-gray-700 font-semibold"
        >
          Maybe Later
        </button>
        <button
          onClick={() => setStep(1)}
          className="flex-1 py-3.5 rounded-full bg-[#EF5350] text-white font-semibold shadow-lg shadow-red-200"
        >
          Add My Pet
        </button>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
            <Camera size={32} />
          </div>
          <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-100">
            <div className="w-4 h-4 text-gray-600">✎</div>
          </button>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm -mt-4 mb-8">Tap icon to add your profile picture</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Pet's Name</label>
          <input
            type="text"
            placeholder="e.g. Luna"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50"
            value={formData.petName}
            onChange={e => setFormData({ ...formData, petName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Breed</label>
          <input
            type="text"
            placeholder="e.g. Golden Retriever"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50"
            value={formData.breed}
            onChange={e => setFormData({ ...formData, breed: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Age</label>
            <input
              type="text"
              placeholder="e.g. 2 years"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50"
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Gender</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50 appearance-none"
              value={formData.gender}
              onChange={e => setFormData({ ...formData, gender: e.target.value })}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Pet Size <span className="text-gray-400 font-normal">(Optional)</span></label>
        <select
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50 appearance-none text-gray-500"
          value={formData.size}
          onChange={e => setFormData({ ...formData, size: e.target.value })}
        >
          <option value="" disabled>Select pet size</option>
          <option value="Small">Small (0-20 lbs)</option>
          <option value="Medium">Medium (21-50 lbs)</option>
          <option value="Large">Large (50+ lbs)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Temperaments <span className="text-gray-400 font-normal">(Optional)</span></label>
        <input
          type="text"
          placeholder="Add pet's temperaments"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50"
        />
        <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-300 text-white flex items-center justify-center text-[8px] font-bold">!</span>
          Hint enter on your keyboard to save
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Vaccination Status <span className="text-gray-400 font-normal">(Optional)</span></label>
        <input
          type="text"
          placeholder="Enter vaccination status"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50"
          value={formData.vaccination}
          onChange={e => setFormData({ ...formData, vaccination: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Spayed/Neutered Status <span className="text-gray-400 font-normal">(Optional)</span></label>
        <select
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50 appearance-none text-gray-500"
          value={formData.spayedNeutered}
          onChange={e => setFormData({ ...formData, spayedNeutered: e.target.value })}
        >
          <option value="" disabled>Select status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Media Upload <span className="text-gray-400 font-normal">(Optional)</span></label>
        <p className="text-xs text-gray-500 mb-3">Upload 1-5 photos (up to 5MB each) or one video (up to 30s, 20MB)</p>

        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/30 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-10 h-10 mb-3 text-gray-400">
            <Upload />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">Choose a file or drag & drop it here.</p>
          <p className="text-xs text-gray-400 mb-4">JPEG, PNG, and MP4 formats, up to 5 MB.</p>
          <button className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Browse File
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
            <Camera size={32} />
          </div>
          <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-100">
            <div className="w-4 h-4 text-gray-600">✎</div>
          </button>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm -mt-4 mb-8">Tap icon to add your profile picture</p>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Display Name</label>
        <input
          type="text"
          placeholder="e.g ms_tamayo"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50"
          value={formData.ownerName}
          onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Location</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </div>
          <select
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50 appearance-none text-gray-500"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
          >
            <option value="" disabled>Search location</option>
            <option value="New York">New York, NY</option>
            <option value="Los Angeles">Los Angeles, CA</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Bio</label>
        <textarea
          placeholder="Describe yourself..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50 min-h-[120px] resize-none"
          value={formData.bio}
          onChange={e => setFormData({ ...formData, bio: e.target.value })}
        />
        <div className="text-right text-xs text-gray-400 mt-1">0/300 ✎</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1.5">Travel distance preference</label>
        <select
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-gray-50/50 appearance-none text-gray-500"
          value={formData.travelDistance}
          onChange={e => setFormData({ ...formData, travelDistance: e.target.value })}
        >
          <option value="" disabled>Select how far you and your pet can go</option>
          <option value="5">Within 5 miles</option>
          <option value="10">Within 10 miles</option>
          <option value="25">Within 25 miles</option>
        </select>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] font-bold">!</span>
          This matches you with nearby playdates and meetups.
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-fade-in space-y-8">
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">What's your pet looking for?</label>
        <div className="flex flex-wrap gap-2">
          {['Playdates', 'Mating', 'Community', 'Health support', 'Grooming help'].map(opt => (
            <button
              key={opt}
              onClick={() => {
                const newSelection = formData.lookingFor.includes(opt)
                  ? formData.lookingFor.filter(i => i !== opt)
                  : [...formData.lookingFor, opt];
                setFormData({ ...formData, lookingFor: newSelection });
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.lookingFor.includes(opt)
                ? 'bg-gray-100 text-gray-900'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">Select your preferred meetup location</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Local park', 'Estate park', 'Sports field', 'Mall outdoors', 'Outdoor lounge', 'Vet clinic', 'Grooming Salon', 'Courtyard'].map(opt => (
            <button
              key={opt}
              onClick={() => {
                const newSelection = formData.meetupLocations.includes(opt)
                  ? formData.meetupLocations.filter(i => i !== opt)
                  : [...formData.meetupLocations, opt];
                setFormData({ ...formData, meetupLocations: newSelection });
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.meetupLocations.includes(opt)
                ? 'bg-gray-100 text-gray-900'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
            >
              {opt}
            </button>
          ))}
          <button
            className="px-4 py-2 rounded-full text-sm font-medium bg-[#EF5350] text-white flex items-center gap-1"
          >
            Others <X size={14} />
          </button>
        </div>

        <label className="block text-sm font-medium text-gray-900 mb-1.5">Preferred Location</label>
        <input
          type="text"
          placeholder="Enter your preferred location"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF5350] outline-none transition-all bg-white"
          value={formData.preferredLocation}
          onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header (Only show if not interstitial) */}
      {step > 0 && (
        <div className="px-4 py-4 flex items-center gap-4">
          <button onClick={handleBack} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">
              {step === 1 ? 'Setup Pet Profile' :
                step === 2 ? 'Setup Pet Profile' :
                  step === 3 ? 'Setup Your Profile' :
                    'Choose Your Preferences'}
            </h1>
            {/* Progress Bar */}
            <div className="flex gap-2 mt-2 max-w-[200px] ml-auto">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[#EF5350]' : 'bg-gray-200'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {step === 0 && renderInterstitial()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      {/* Footer (Only show if not interstitial) */}
      {step > 0 && (
        <div className="p-4 border-t border-gray-50 bg-white">
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3.5 rounded-full bg-gray-100 text-gray-700 font-semibold"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3.5 rounded-full bg-[#EF5350] text-white font-semibold shadow-lg shadow-red-200"
            >
              {step === 4 ? 'Save and Submit' : 'Save and Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
