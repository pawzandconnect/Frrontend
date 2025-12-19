import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';

export default function PostDetail() {
    const navigate = useNavigate();
    const { id: _id } = useParams();

    const post = {
        title: 'Reptile 101: Caring the Safe Way',
        author: {
            name: 'Octavia',
            avatar: 'https://images.unsplash.com/photo-1528750950334-03c0032aa283?q=80&w=100&auto=format&fit=crop'
        },
        time: 'Today',
        image: 'https://images.unsplash.com/photo-1548263514-fb123bc75003?q=80&w=800&auto=format&fit=crop',
        content: `Thinking of getting a reptile? Make sure their space feels like home — warm, humid, and clean! Handle gently, feed right, and always wash your hands after. Reptiles can be awesome pets when cared for properly. 💚\n\nWhat's your top reptile care tip?`,
        votes: '107k',
        downvotes: 17,
        commentsCount: 3,
        comments: [
            {
                id: '1',
                author: {
                    name: 'Mama Coco',
                    avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=100&auto=format&fit=crop'
                },
                time: '30s ago',
                text: "Such a refreshing post. Reptiles don't get nearly enough love in pet communities. I've had my bearded dragon for 3 years, and he's got such a personality. It's nice to see content that focuses on responsible ownership instead of just aesthetics"
            },
            {
                id: '2',
                author: {
                    name: 'Mama Coco',
                    avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=100&auto=format&fit=crop'
                },
                time: '20hrs ago',
                text: "I've been thinking of getting a turtle but wasn't sure how similar the care is compared to lizards or snakes. Any Ideas?"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <header className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 shrink-0">
                <button onClick={() => navigate(-1)} className="text-gray-900">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Post Details</h1>
            </header>

            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                </h2>

                <div className="flex items-center gap-2 mb-8">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100">
                        <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 underline">{post.author.name}</span>
                    <span className="text-xs text-gray-400">• {post.time}</span>
                </div>

                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 shadow-sm">
                    <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-4 mb-8">
                    {post.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-gray-600 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="flex items-center gap-6 text-gray-400 mb-8">
                    <div className="flex items-center gap-2">
                        <button className="text-[#EF5350]">
                            <ArrowUp size={24} className="fill-current" />
                        </button>
                        <span className="text-sm font-bold text-gray-900">{post.votes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-gray-400">
                            <ArrowDown size={24} />
                        </button>
                        <span className="text-sm font-semibold">{post.downvotes}</span>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">{post.commentsCount} Comments</h3>
                        <button className="text-gray-400">
                            <ChevronDown size={20} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100">
                                        <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 underline">{comment.author.name}</span>
                                    <span className="text-xs text-gray-400">• {comment.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    {comment.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
