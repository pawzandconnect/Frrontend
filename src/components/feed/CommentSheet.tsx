import { useState } from 'react';
import { X, Send, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Comment {
    id: string;
    user: {
        name: string;
        image: string;
    };
    text: string;
    time: string;
    likes: number;
    isLiked: boolean;
    replies?: number;
}

const MOCK_COMMENTS: Comment[] = [
    {
        id: '1',
        user: {
            name: 'iSlay ❤️❤️❤️',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
        },
        text: 'Welcome to the family, little fluffball! He’s absolutely adorable 😍',
        time: '3w',
        likes: 27,
        isLiked: false,
        replies: 12
    },
    {
        id: '2',
        user: {
            name: 'Sasha',
            image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=200&auto=format&fit=crop'
        },
        text: 'That fur coat is stunning! What’s his grooming routine like?',
        time: '3w',
        likes: 27,
        isLiked: false
    },
    {
        id: '3',
        user: {
            name: '🥳🎉😍',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop'
        },
        text: 'Welcome to the Maine Coon club! They’re such sweethearts 💫',
        time: '3w',
        likes: 27,
        isLiked: false
    }
];

interface CommentSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CommentSheet({ isOpen, onClose }: CommentSheetProps) {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState('');
    const { user, requireAuth } = useAuth();

    if (!isOpen) return null;

    const handleLike = (commentId: string) => {
        requireAuth(() => {
            setComments(prev => prev.map(c => {
                if (c.id === commentId) {
                    return {
                        ...c,
                        likes: c.isLiked ? c.likes - 1 : c.likes + 1,
                        isLiked: !c.isLiked
                    };
                }
                return c;
            }));
        });
    };

    const handleReply = (commentId: string) => {
        // For now, just trigger auth check as a placeholder for reply functionality
        requireAuth(() => {
            console.log(`Replying to comment ${commentId}`);
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        requireAuth(() => {
            const comment: Comment = {
                id: Date.now().toString(),
                user: {
                    name: user?.name || 'User',
                    image: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
                },
                text: newComment,
                time: 'Just now',
                likes: 0,
                isLiked: false
            };

            setComments([comment, ...comments]);
            setNewComment('');
        });
    };

    const handleInputFocus = () => {
        requireAuth(() => {
            // User is authenticated, focus remains
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end sm:justify-center sm:items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            />

            {/* Sheet */}
            <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl h-[80vh] sm:h-[600px] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
                {/* Handle bar for mobile feel */}
                <div className="w-full flex justify-center pt-3 pb-2" onClick={onClose}>
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-4 pb-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="w-6" /> {/* Spacer */}
                    <h2 className="text-lg font-bold text-gray-900">Comments</h2>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Search/Filter Bar (Mock) */}
                <div className="px-4 py-3 flex items-center gap-2 text-sm text-orange-500 font-medium border-b border-gray-50">
                    <span>✨ Search • Maine coon</span>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                            <img
                                src={comment.user.image}
                                alt={comment.user.name}
                                className="w-8 h-8 rounded-full object-cover shrink-0"
                            />
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-gray-900">{comment.user.name}</span>
                                    <span className="text-xs text-gray-400">{comment.time}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {comment.text}
                                </p>
                                <div className="flex items-center gap-4 pt-1">
                                    <button
                                        onClick={() => handleReply(comment.id)}
                                        className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 14 4 9 9 4"></polyline>
                                            <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
                                        </svg>
                                        Reply
                                    </button>
                                    {comment.replies && (
                                        <span className="text-xs font-medium text-[#FF5A5F]">
                                            View {comment.replies} replies
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1 pt-1">
                                <button
                                    onClick={() => handleLike(comment.id)}
                                    className="text-gray-400 hover:text-[#FF5A5F] transition-colors"
                                >
                                    <Heart
                                        size={16}
                                        className={comment.isLiked ? "fill-primary-500 text-primary-500" : ""}
                                    />
                                </button>
                                <span className="text-xs text-gray-400">{comment.likes}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 bg-white pb-8 sm:pb-4 rounded-b-3xl">
                    {/* Quick Reactions */}
                    <div className="flex justify-between mb-4 px-2 overflow-x-auto no-scrollbar gap-4">
                        {['❤️', '😂', '🥲', '🥹', '🤭', '😩', '😮', '🔥', '💀', '🎉'].map(emoji => (
                            <button
                                key={emoji}
                                onClick={() => setNewComment(prev => prev + emoji)}
                                className="text-2xl hover:scale-125 transition-transform"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                        <img
                            src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"}
                            alt="Current user"
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onFocus={handleInputFocus}
                                placeholder="What's your opinion on this?"
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                            />
                            {newComment.trim() && (
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#FF5A5F] text-white rounded-full hover:bg-[#ff4046] transition-colors"
                                >
                                    <Send size={14} />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
