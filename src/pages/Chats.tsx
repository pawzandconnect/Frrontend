import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, Check, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Chats() {
    const navigate = useNavigate();
    const { isOwnerProfileComplete } = useAuth();

    // Mock Data for conversations
    const conversations = [
        {
            id: '1',
            name: 'Ms_Tamayo',
            lastMessage: 'The weather will be perfect for the stroll.',
            time: '2:14 PM',
            unreadCount: 0,
            status: 'sent', // sent, delivered, read
            isOnline: true,
            avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: '2',
            name: 'User',
            lastMessage: 'The weather will be perfect for the stroll.',
            time: '2:14 PM',
            unreadCount: 0,
            status: 'read',
            isOnline: true,
            avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: '3',
            name: 'User',
            lastMessage: 'The weather will be perfect for the stroll.',
            time: '2:14 PM',
            unreadCount: 1,
            status: 'none',
            isOnline: true,
            avatar: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: '4',
            name: 'User',
            lastMessage: 'The weather will be perfect for the stroll.',
            time: '2:14 PM',
            unreadCount: 0,
            status: 'sent',
            isOnline: true,
            avatar: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: '5',
            name: 'User',
            lastMessage: 'The weather will be perfect for the stroll.',
            time: '2:14 PM',
            unreadCount: 1,
            status: 'none',
            isOnline: true,
            avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: '6',
            name: 'User',
            lastMessage: 'The weather will be perfect for the stroll.',
            time: '2:14 PM',
            unreadCount: 1,
            status: 'none',
            isOnline: true,
            avatar: 'https://images.unsplash.com/photo-1495360019602-e001922271fe?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: '7',
            name: 'User',
            lastMessage: 'The weather will be perfect for the stroll.',
            time: '2:14 PM',
            unreadCount: 0,
            status: 'none',
            isOnline: true,
            avatar: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: '8',
            name: 'User',
            lastMessage: 'The weather will be perfect for the stroll.',
            time: '2:14 PM',
            unreadCount: 1,
            status: 'read',
            isOnline: true,
            avatar: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=200&auto=format&fit=crop'
        }
    ];

    const hasConversations = conversations.length > 0;

    const handleMakeConnection = () => {
        if (!isOwnerProfileComplete) {
            navigate('/owner-profile-setup');
        } else {
            navigate('/discover');
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="px-6 pt-8 pb-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
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

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    <button className="px-5 py-2 rounded-full bg-[#B2F5EA] text-gray-800 text-sm font-medium">
                        All
                    </button>
                    <button className="px-5 py-2 rounded-full bg-white text-gray-800 border border-gray-100 text-sm font-medium">
                        Unread
                    </button>
                    <button className="px-5 py-2 rounded-full bg-white text-gray-800 border border-gray-100 text-sm font-medium">
                        Request
                    </button>
                </div>
            </div>

            {(!isOwnerProfileComplete || !hasConversations) ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                    <div className="w-64 h-64 mb-12 drop-shadow-sm">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uploaded_image_1766171038497-removebg-preview-L3E8R9J0K1L2M3N4O5P6Q7R8S9T0U1.png"
                            alt="Funny crying dog"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=400&auto=format&fit=crop";
                            }}
                        />
                    </div>
                    <p className="text-[#374151] font-medium mb-12 max-w-[280px]">
                        Nothing to see here, start up<br />a new conversation
                    </p>
                    <button
                        onClick={handleMakeConnection}
                        className="px-10 py-4 rounded-full bg-[#EF5350] text-white font-bold shadow-lg shadow-red-100 active:scale-95 transition-all text-sm"
                    >
                        Make connection
                    </button>
                </div>
            ) : (
                <div className="divide-y divide-gray-50">
                    {conversations.map((conv) => (
                        <Link
                            key={conv.id}
                            to={`/chats/${conv.id}`}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors active:bg-gray-100"
                        >
                            <div className="relative shrink-0">
                                <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100">
                                    <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                                </div>
                                {conv.isOnline && (
                                    <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-gray-900 truncate">{conv.name}</h3>
                                    <span className="text-[11px] text-gray-400 whitespace-nowrap">{conv.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500 truncate mr-2">
                                        {conv.lastMessage}
                                    </p>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {conv.unreadCount > 0 && (
                                            <div className="w-5 h-5 bg-[#EF5350] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                                {conv.unreadCount}
                                            </div>
                                        )}
                                        {conv.status === 'sent' && <Check size={14} className="text-gray-400" />}
                                        {conv.status === 'read' && <CheckCheck size={14} className="text-[#3B82F6]" />}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
