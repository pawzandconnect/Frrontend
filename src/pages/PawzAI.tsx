import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Plus, Trash2, X, Paperclip, Mic, Send, ExternalLink, Sparkles } from 'lucide-react';

interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    time: string;
}

interface HistoryItem {
    id: string;
    title: string;
}

export default function PawzAI() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([
        { id: '1', title: 'My new maine coon' },
        { id: '2', title: 'I miss my dog so much. He passed away last...' },
        { id: '3', title: 'My new maine coon' },
        { id: '4', title: 'My new maine coon' },
        { id: '5', title: 'My new maine coon' },
        { id: '6', title: 'My new maine coon' },
        { id: '7', title: 'My pet routine was ruined because of the...' }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        'Can dogs eat cake?',
        'Help me choose healthy treats',
        'How often should I bathe my dog?',
        'Tips for cat poop',
        'Recommend local pet grooming centers'
    ];

    const handleSendMessage = (text: string = inputText) => {
        if (!text.trim()) return;

        const newUserMsg: ChatMessage = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');

        // Mock AI Response
        setTimeout(() => {
            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: "That's a great question! I'm here to help with all your pet needs. Let me look that up for you...",
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    const deleteHistoryItem = (id: string) => {
        setHistory(prev => prev.filter(item => item.id !== id));
        setShowDeleteModal(null);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-white relative overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-50 shrink-0">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Pawz AI <Sparkles size={18} className="text-purple-500 fill-purple-500" />
                    </h1>
                </div>
                <button
                    onClick={() => setIsHistoryOpen(true)}
                    className="p-2 text-gray-900"
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto relative no-scrollbar" ref={scrollRef}>
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center">
                        <div className="w-24 h-24 mb-8">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uploaded_image_4_1766170393344-removebg-preview-L3E8R9J0K1L2M3N4O5P6Q7R8S9T0U1.png"
                                alt="Paw Icon"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">How can I help?</h2>

                        <div className="flex flex-wrap justify-center gap-3 max-w-sm">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSendMessage(s)}
                                    className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors bg-white shadow-sm"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-6 space-y-8">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`max-w-[85%] rounded-2xl p-4 ${msg.sender === 'user'
                                        ? 'bg-gray-100 text-gray-800 rounded-tr-none'
                                        : 'bg-white text-gray-800'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Credit Warning Banner */}
            {messages.length > 2 && (
                <div className="mx-4 mb-4 p-3 bg-gray-900 text-white rounded-xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center bg-gray-700 rounded-md">
                            <Sparkles size={12} className="text-purple-400" />
                        </div>
                        <p className="text-[11px] leading-tight flex-1">
                            You have used up your free AI credit.<br />
                            <span className="opacity-60">Upgrade your plan for more</span>
                        </p>
                    </div>
                    <button className="text-[11px] font-bold text-orange-400 flex items-center gap-1 ml-4 whitespace-nowrap">
                        Upgrade <ExternalLink size={12} />
                    </button>
                </div>
            )}

            {/* Input Bar */}
            <div className="p-4 bg-white shrink-0">
                <div className="relative mb-2">
                    <div className="flex flex-col gap-2 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <textarea
                            placeholder="Type a message"
                            className="w-full text-sm outline-none bg-transparent placeholder-gray-400 resize-none min-h-[40px] max-h-[120px]"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            rows={1}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button className="text-gray-400 p-1">
                                    <Paperclip size={20} />
                                </button>
                                <button className="text-gray-400 p-1">
                                    <Mic size={20} />
                                </button>
                            </div>
                            <button
                                onClick={() => handleSendMessage()}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-[#EF5350] text-white' : 'bg-gray-200 text-gray-400'
                                    }`}
                            >
                                <Send size={18} className="rotate-45 -ml-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-[10px] text-gray-400 text-center">
                    Not a substitute for veterinary advice. Contact vet for emergencies
                </p>
            </div>

            {/* History Sidebar */}
            {isHistoryOpen && (
                <div className="absolute inset-0 z-[60] flex">
                    <div
                        className="flex-1 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsHistoryOpen(false)}
                    />
                    <div className="w-[85%] bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="relative flex-1 mr-4">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm outline-none focus:ring-1 focus:ring-purple-400"
                                    />
                                </div>
                                <button onClick={() => setIsHistoryOpen(false)} className="text-gray-900">
                                    <X size={24} />
                                </button>
                            </div>

                            <button className="w-full flex items-center gap-2 p-3 text-red-500 font-bold mb-8">
                                <Plus size={20} /> New Chat
                            </button>

                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-gray-400 px-3 py-2 uppercase tracking-wider">Chat History</p>
                                <div className="overflow-y-auto no-scrollbar max-h-[calc(100vh-250px)]">
                                    {history.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            <span className={`text-sm flex-1 truncate ${item.id === '7' ? 'text-red-500' : 'text-gray-700'}`}>
                                                {item.title}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowDeleteModal(item.id);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="absolute inset-0 z-[70] flex items-end justify-center bg-black/40 px-4 pb-12">
                    <div className="w-full bg-white rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-300">
                        <div className="flex justify-center mb-6">
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete Chat?</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            This will delete <span className="font-bold text-gray-900">
                                {history.find(h => h.id === showDeleteModal)?.title}
                            </span> chat. Are you sure you want to proceed?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-900 hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteHistoryItem(showDeleteModal)}
                                className="flex-1 py-4 bg-red-500 rounded-2xl font-bold text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-colors"
                            >
                                Delete Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
