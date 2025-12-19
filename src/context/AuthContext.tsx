import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (provider: 'google' | 'apple') => void;
    logout: () => void;
    isAuthModalOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
    requireAuth: (callback: () => void) => void;
    isPetIntroModalOpen: boolean;
    openPetIntroModal: () => void;
    closePetIntroModal: () => void;
    hasProfile: boolean;
    completeProfile: () => void;
    isOwnerProfileComplete: boolean;
    completeOwnerProfile: (data: any) => void;
    ownerProfile: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

    const login = () => {
        // Mock login logic
        setIsAuthenticated(true);
        setUser({
            id: 'mock-user-1',
            name: 'Daenerys 🐉',
            email: 'luna@example.com',
            avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop'
        });
        closeAuthModal();

        // Execute pending action if any
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const openAuthModal = () => setIsAuthModalOpen(true);

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        setPendingAction(null); // Clear pending action if user cancels
    };

    const requireAuth = (callback: () => void) => {
        if (isAuthenticated) {
            callback();
        } else {
            setPendingAction(() => callback);
            openAuthModal();
        }
    };

    const [isPetIntroModalOpen, setIsPetIntroModalOpen] = useState(false);
    const openPetIntroModal = () => setIsPetIntroModalOpen(true);
    const closePetIntroModal = () => setIsPetIntroModalOpen(false);

    const [hasProfile, setHasProfile] = useState(false);
    const completeProfile = () => setHasProfile(true);

    const [isOwnerProfileComplete, setIsOwnerProfileComplete] = useState(false);
    const [ownerProfile, setOwnerProfile] = useState<any | null>(null);

    const completeOwnerProfile = (data: any) => {
        setOwnerProfile(data);
        setIsOwnerProfileComplete(true);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout,
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal,
            requireAuth,
            isPetIntroModalOpen,
            openPetIntroModal,
            closePetIntroModal,
            hasProfile,
            completeProfile,
            isOwnerProfileComplete,
            ownerProfile,
            completeOwnerProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
