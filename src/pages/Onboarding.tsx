import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full bg-white flex flex-col relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
                <div className="absolute top-[20%] right-[-10%] w-[60%] h-[50%] bg-orange-50/50 rounded-full blur-3xl" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">

                {/* Circular Pet Grid Visualization */}
                <div className="relative w-full max-w-sm aspect-square mb-12">
                    {/* Concentric Circles */}
                    <div className="absolute inset-0 border border-surface-100 rounded-full scale-100" />
                    <div className="absolute inset-0 border border-surface-100 rounded-full scale-75" />

                    {/* Center Pet */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-pink-300 to-blue-300">
                        <img
                            src="https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=200&auto=format&fit=crop"
                            className="w-full h-full rounded-full object-cover border-2 border-white"
                            alt="Center Cat"
                        />
                    </div>

                    {/* Orbiting Pets */}
                    {/* Top Right - Snake */}
                    <div className="absolute top-[15%] right-[20%] w-16 h-16 rounded-full p-0.5 bg-orange-400">
                        <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover border border-white" alt="Snake" />
                    </div>

                    {/* Right - Rabbit */}
                    <div className="absolute top-[45%] right-[5%] w-16 h-16 rounded-full p-0.5 bg-red-400">
                        <img src="https://images.unsplash.com/photo-1585110396067-bfde08528dc8?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover border border-white" alt="Rabbit" />
                    </div>

                    {/* Bottom Right - Spider */}
                    <div className="absolute bottom-[20%] right-[15%] w-16 h-16 rounded-full p-0.5 bg-yellow-400">
                        <img src="https://images.unsplash.com/photo-1596766858688-09b89c906770?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover border border-white" alt="Spider" />
                    </div>

                    {/* Bottom - Hamster */}
                    <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full p-0.5 bg-purple-400">
                        <img src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover border border-white" alt="Hamster" />
                    </div>

                    {/* Bottom Left - Dog */}
                    <div className="absolute bottom-[20%] left-[15%] w-16 h-16 rounded-full p-0.5 bg-green-400">
                        <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover border border-white" alt="Dog" />
                    </div>

                    {/* Left - Bird */}
                    <div className="absolute top-[45%] left-[5%] w-16 h-16 rounded-full p-0.5 bg-teal-400">
                        <img src="https://images.unsplash.com/photo-1552728089-57bdde30ebd1?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover border border-white" alt="Bird" />
                    </div>

                    {/* Top Left - Cat */}
                    <div className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full p-0.5 bg-cyan-400">
                        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover border border-white" alt="Cat" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-3xl font-bold text-surface-900 text-center leading-tight mb-12 max-w-xs">
                    Built for pets to meet, play, and find their pack.
                </h1>

                {/* CTA Button */}
                <button
                    onClick={() => navigate('/discover')}
                    className="w-full max-w-xs bg-[#E15656] text-white font-semibold py-4 rounded-full shadow-lg shadow-red-200 active:scale-95 transition-all"
                >
                    Get Started
                </button>

                {/* Legal Text */}
                <p className="text-xs text-surface-400 text-center mt-6 px-8 leading-relaxed">
                    By continuing, you agree to our <span className="text-[#E15656] font-medium">Terms and Conditions</span> and acknowledge that you understand the <span className="text-[#E15656] font-medium">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}
