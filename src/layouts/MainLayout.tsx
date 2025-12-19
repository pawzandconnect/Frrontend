import { Outlet } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';

export default function MainLayout() {
    return (
        <div className="flex flex-col h-screen bg-surface-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto no-scrollbar relative">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
