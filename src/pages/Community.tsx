import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, ArrowUp, ArrowDown, MessageCircle, Plus } from 'lucide-react';

interface Post {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    time: string;
    title: string;
    image?: string;
    votes: string;
    downvotes: number;
    comments: string;
}

export default function Community() {
    const navigate = useNavigate();

    const categories = ['All', 'Featured', 'Cats', 'Dogs', 'Birds', 'Small Pets', 'Reptiles'];

    const posts: Post[] = [
        {
            id: '1',
            author: {
                name: 'Octavia',
                avatar: 'https://images.unsplash.com/photo-1528750950334-03c0032aa283?q=80&w=100&auto=format&fit=crop'
            },
            time: 'Today',
            title: 'Reptile 101: Caring the Safe Way',
            votes: '107k',
            downvotes: 17,
            comments: '23M'
        },
        {
            id: '2',
            author: {
                name: 'Mama Coco',
                avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=100&auto=format&fit=crop'
            },
            time: '20th Oct, 2025',
            title: '5 Simple Ways to Calm an Anxious Dog at Home',
            image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=400&auto=format&fit=crop',
            votes: '107k',
            downvotes: 17,
            comments: '23M'
        },
        {
            id: '3',
            author: {
                name: 'Ms_Tamayo',
                avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=100&auto=format&fit=crop'
            },
            time: '02th Nov, 2025',
            title: "My pet's weirdest sleeping position",
            image: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?q=80&w=400&auto=format&fit=crop',
            votes: '107k',
            downvotes: 17,
            comments: '23M'
        },
        {
            id: '4',
            author: {
                name: 'Ms_Tamayo',
                avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=100&auto=format&fit=crop'
            },
            time: '02th Nov, 2025',
            title: "Hamsters are notorious for swallowing numerous things at once",
            votes: '107k',
            downvotes: 17,
            comments: '23M'
        },
        {
            id: '5',
            author: {
                name: 'Ms_Tamayo',
                avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=100&auto=format&fit=crop'
            },
            time: '02th Nov, 2025',
            title: "Hamsters are notorious for swallowing numerous things at once",
            votes: '107k',
            downvotes: 17,
            comments: '23M'
        }
    ];

    return (
        <div className="min-h-screen bg-white pb-24 relative">
            {/* Header */}
            <div className="px-6 pt-8 pb-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Community</h1>
                    <button className="text-gray-900">
                        <Bell size={24} />
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-white outline-none focus:border-[#EF5350] transition-all shadow-sm"
                    />
                </div>

                {/* Categories */}
                <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar -mx-6 px-6">
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${i === 0
                                    ? 'bg-[#B2F5EA] text-gray-800'
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Post Feed */}
            <div className="divide-y divide-gray-100">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        to={`/community/post/${post.id}`}
                        className="block px-6 py-5 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100">
                                        <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 underline">{post.author.name}</span>
                                    <span className="text-xs text-gray-400">• {post.time}</span>
                                </div>
                                <h2 className="text-base font-medium text-gray-900 leading-snug mb-4">
                                    {post.title}
                                </h2>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <ArrowUp size={18} />
                                        <span className="text-xs font-medium">{post.votes}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <ArrowDown size={18} />
                                        <span className="text-xs font-medium">{post.downvotes}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 ml-1">
                                        <MessageCircle size={18} />
                                        <span className="text-xs font-medium">{post.comments}</span>
                                    </div>
                                </div>
                            </div>

                            {post.image && (
                                <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0">
                                    <img src={post.image} alt="Thumbnail" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {/* FAB */}
            <button
                onClick={() => navigate('/community/create')}
                className="fixed bottom-28 right-6 w-14 h-14 rounded-full bg-[#EF5350] text-white shadow-xl shadow-red-100 flex items-center justify-center active:scale-95 transition-all z-20"
            >
                <Plus size={28} />
            </button>
        </div>
    );
}
