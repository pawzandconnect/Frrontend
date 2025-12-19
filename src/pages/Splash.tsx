import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icons/uploaded_image_1_1763690591227.png'; // Assuming image_1 is the logo based on order

export default function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fixed inset-0 w-full h-full bg-white flex items-center justify-center z-50">
            <div className="w-40 h-40 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                <img src={logo} alt="Paws & Connect Logo" className="w-full h-full object-contain drop-shadow-xl" />
            </div>
        </div>
    );
}
