import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UploadCloud, X, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function CreatePost() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState(['Shy', 'Shy', 'Playful', 'Calm']);

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handlePost = () => {
        if (!title.trim() || !details.trim()) {
            showToast('Please fill in title and details', 'error');
            return;
        }

        // Mock success
        showToast('Post Uploaded successfully!', 'success');
        setTimeout(() => {
            navigate('/community');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <header className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 shrink-0">
                <button onClick={() => navigate(-1)} className="text-gray-900">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Create Post</h1>
            </header>

            <div className="p-6 space-y-8">
                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Post Title</label>
                    <input
                        type="text"
                        placeholder="Enter post title"
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white outline-none focus:border-red-400 transition-all font-medium placeholder-gray-300 shadow-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Media Upload */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Media Upload <span className="text-gray-400 font-medium">(Optional)</span></label>
                    <div className="border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50 p-10 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 mb-4">
                            <UploadCloud size={24} />
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">Choose a file or drag & drop it here.</p>
                        <p className="text-xs text-gray-400 mb-6">JPEG & PNG formats, up to 5 MB.</p>
                        <button className="px-8 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-900 shadow-sm hover:bg-gray-50 transition-colors">
                            Browse File
                        </button>
                    </div>
                </div>

                {/* Post Details */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Post Details</label>
                    <textarea
                        placeholder="Enter post details"
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white outline-none focus:border-red-400 transition-all font-medium placeholder-gray-300 shadow-sm min-h-[160px] resize-none"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Post Tags <span className="text-gray-400 font-medium">(Optional)</span></label>
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-gray-100 bg-white shadow-sm mb-3">
                        {tags.map((tag, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 text-xs font-bold">
                                {tag}
                                <button onClick={() => removeTag(i)}>
                                    <X size={14} className="text-gray-400" />
                                </button>
                            </div>
                        ))}
                        {tags.length > 4 && (
                            <div className="px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 text-xs font-bold">
                                +{tags.length - 4}
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Add tag..."
                            className="flex-1 outline-none text-xs font-medium min-w-[80px]"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                        <AlertCircle size={14} />
                        Hint enter on your keyboard to save
                    </div>
                </div>

                {/* Submit button would typically be in header or fixed at bottom, but design doesn't show it. Adding it for functionality. */}
                <button
                    onClick={handlePost}
                    className="w-full py-4 bg-[#EF5350] text-white font-bold rounded-2xl shadow-lg shadow-red-100 active:scale-95 transition-all"
                >
                    Post Now
                </button>
            </div>
        </div>
    );
}
