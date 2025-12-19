import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Paperclip, Mic, Send, Play, MoreHorizontal } from 'lucide-react';

interface Message {
    id: string;
    text?: string;
    type: 'text' | 'voice' | 'image';
    sender: 'me' | 'other';
    time: string;
    image?: string;
    duration?: string;
}

export default function ChatDetail() {
    const navigate = useNavigate();
    const { id: _id } = useParams();
    const [message, setMessage] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Mock Messages
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hi, my name is Kate, nice fur, i would like to know more about you',
            type: 'text',
            sender: 'me',
            time: '11.14 AM'
        },
        {
            id: '2',
            text: 'Nice to meet you my name is Kaine',
            type: 'text',
            sender: 'other',
            time: '11.14 AM'
        },
        {
            id: '3',
            type: 'voice',
            sender: 'me',
            time: '11.14 AM',
            duration: '0:20'
        },
        {
            id: '4',
            image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop',
            text: 'I really love you 💕',
            type: 'image',
            sender: 'other', // From design it looks like left side, so 'other'
            time: '11.14 AM'
        }
    ]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: message,
            type: 'text',
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-[100dvh] bg-surface-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
            {/* Header */}
            <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 shrink-0">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900">
                    <ArrowLeft size={24} />
                </button>
                <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=200&auto=format&fit=crop"
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-900 truncate">Ms_Tamayo</h2>
                    <p className="text-[11px] text-gray-400">Online for 10 mins</p>
                </div>
                <button className="p-2 text-gray-400">
                    <MoreHorizontal size={20} />
                </button>
            </header>

            {/* Message Stream */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 bg-white no-scrollbar"
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                    >
                        {/* Bubble */}
                        <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${msg.sender === 'me'
                            ? 'bg-red-50 text-gray-800 rounded-tr-none'
                            : 'bg-gray-50 text-gray-800 rounded-tl-none'
                            }`}>
                            {msg.type === 'text' && (
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                            )}

                            {msg.type === 'voice' && (
                                <div className="flex items-center gap-3 w-48">
                                    <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                        <Play size={16} className="fill-gray-600 ml-0.5" />
                                    </button>
                                    <div className="flex-1 h-1 bg-gray-200 rounded-full relative">
                                        <div className="absolute left-0 top-0 h-full w-1/3 bg-[#EF5350] rounded-full" />
                                        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#EF5350] rounded-full" />
                                    </div>
                                    <span className="text-[11px] text-gray-500">{msg.duration}</span>
                                </div>
                            )}

                            {msg.type === 'image' && (
                                <div className="space-y-3">
                                    <div className="rounded-xl overflow-hidden aspect-square h-48 w-48">
                                        <img src={msg.image} alt="Sent" className="w-full h-full object-cover" />
                                    </div>
                                    {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                                </div>
                            )}
                        </div>

                        {/* Time */}
                        <span className="text-[10px] text-gray-400 mt-1.5 px-1">
                            {msg.time}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-gray-50 bg-white pb-8 shrink-0">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <button className="text-gray-400 p-1">
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button className="text-gray-400 p-1">
                        <Mic size={20} />
                    </button>
                    <button
                        onClick={handleSendMessage}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${message.trim() ? 'bg-[#EF5350] text-white' : 'bg-red-400/80 text-white'
                            }`}
                    >
                        <Send size={18} className="rotate-45 -ml-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
