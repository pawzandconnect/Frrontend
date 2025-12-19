import { Link, useLocation } from 'react-router-dom';
import { Home, Users } from 'lucide-react';
import aiIcon from '../../assets/icons/uploaded_image_0_1763690591227.png';
import chatIcon from '../../assets/icons/uploaded_image_4_1763690591227.png';
import profileIcon from '../../assets/icons/uploaded_image_3_1763690591227.png';

export default function BottomNav() {
    const location = useLocation();
    const pathname = location.pathname;

    const isActive = (path: string) => {
        if (path === '/discover' && pathname === '/discover') return true;
        if (path === '/profile' && pathname === '/profile') return true;
        if (path === '/chats' && pathname === '/chats') return true;
        if (path === '/pawz-ai' && pathname === '/pawz-ai') return true;
        if (path === '/community' && pathname === '/community') return true;
        return false;
    };

    return (
        <nav className="bg-white border-t border-surface-200 px-6 py-3 flex justify-between items-end z-50 pb-6">
            <Link to="/discover">
                <NavIcon icon={<Home size={24} />} label="Home" active={isActive('/discover')} />
            </Link>

            <Link to="/community">
                <NavIcon icon={<Users size={24} />} label="Community" active={isActive('/community')} />
            </Link>

            <Link to="/pawz-ai" className="flex flex-col items-center gap-1 -mt-8">
                <div className={`p-3 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200 active:scale-95 transition-all ${isActive('/pawz-ai') ? 'ring-2 ring-purple-100 ring-offset-2' : ''}`}>
                    <img src={aiIcon} alt="AI" className="w-6 h-6 brightness-0 invert" />
                </div>
                <span className={`text-[10px] font-medium transition-colors ${isActive('/pawz-ai') ? 'text-purple-600' : 'text-surface-500'}`}>Pawz AI</span>
            </Link>

            <Link to="/chats">
                <NavIcon
                    icon={<MaskedImage src={chatIcon} />}
                    label="Chat"
                    active={isActive('/chats')}
                />
            </Link>

            <Link to="/profile">
                <NavIcon
                    icon={<MaskedImage src={profileIcon} />}
                    label="Profile"
                    active={isActive('/profile')}
                />
            </Link>
        </nav>
    );
}

function NavIcon({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary-500' : 'text-surface-400 hover:text-surface-600'}`}>
            {icon}
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );
}

function MaskedImage({ src }: { src: string }) {
    return (
        <div
            className="w-7 h-7 shrink-0 bg-current"
            style={{
                maskImage: `url(${src})`,
                WebkitMaskImage: `url(${src})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center'
            }}
        />
    );
}
