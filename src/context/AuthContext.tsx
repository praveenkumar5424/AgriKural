import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  displayNameTa?: string;
  phone: string;
  districtId: string;
  districtName: string;
  landAcres: number;
  farmerCategory: 'Marginal (<2.5 acres)' | 'Small (2.5 - 5 acres)' | 'Semi-Medium (5 - 10 acres)' | 'Large (>10 acres)';
  primaryCrops: string[];
  isVerifiedGoogle: boolean;
  kisanCreditCard: boolean;
  soilHealthCard: boolean;
  pmKisanId?: string;
  joinedDate: string;
  avatarLetter: string;
  avatarBgColor: string;
  role: string;
}

export interface NewFarmerAccountInput {
  email: string;
  name: string;
  phone: string;
  districtId: string;
  districtName: string;
  landAcres: number;
  farmerCategory: 'Marginal (<2.5 acres)' | 'Small (2.5 - 5 acres)' | 'Semi-Medium (5 - 10 acres)' | 'Large (>10 acres)';
  primaryCrops: string[];
  kisanCreditCard?: boolean;
  soilHealthCard?: boolean;
  pmKisanId?: string;
}

export const SPECIFIC_GOOGLE_USER: UserProfile = {
  id: 'user_praveen_20026',
  email: 'praveenkumar20026@gmail.com',
  name: 'Praveen Kumar',
  displayNameTa: 'பிரவீன் குமார்',
  phone: '+91 98421 82910',
  districtId: 'ariyalur',
  districtName: 'Ariyalur',
  landAcres: 4.5,
  farmerCategory: 'Small (2.5 - 5 acres)',
  primaryCrops: ['Samba Paddy (CR 1009 Sub-1)', 'Cashew (VRI-3)', 'Sugarcane'],
  isVerifiedGoogle: true,
  kisanCreditCard: true,
  soilHealthCard: true,
  pmKisanId: 'TN-PMK-2024-8849',
  joinedDate: 'September 2024',
  avatarLetter: 'P',
  avatarBgColor: 'bg-emerald-600',
  role: 'Verified TNAU Farmer User',
};

interface AuthContextType {
  user: UserProfile | null;
  savedAccounts: UserProfile[];
  sessionToken: string | null;
  isLoadingSession: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  requestVerificationCode: (email: string) => Promise<{ success: boolean; code?: string; error?: string }>;
  verifyAndRegister: (params: {
    email: string;
    password: string;
    code: string;
    name?: string;
    districtName?: string;
    districtId?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  loginWithSpecificUser: () => void;
  loginWithGoogleEmail: (email: string, name?: string) => boolean;
  registerAccount: (input: NewFarmerAccountInput) => boolean;
  logout: () => Promise<void>;
  switchAccount: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_ACTIVE_USER_KEY = 'tn_agri_auth_active_user_v4';
const STORAGE_ACCOUNTS_LIST_KEY = 'tn_agri_auth_saved_accounts_v4';
const STORAGE_SESSION_TOKEN_KEY = 'tn_agri_auth_session_token_v4';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number = 30 * 24 * 60 * 60) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    try {
      const storedToken = localStorage.getItem(STORAGE_SESSION_TOKEN_KEY);
      if (storedToken) return storedToken;
      const cookieToken = getCookie('tn_agri_session_token');
      if (cookieToken) return cookieToken;
    } catch {
      // ignore
    }
    // Default to null: starts at Create Your Account home dashboard
    return null;
  });

  const [savedAccounts, setSavedAccounts] = useState<UserProfile[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_ACCOUNTS_LIST_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return [SPECIFIC_GOOGLE_USER];
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_ACTIVE_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // Default to null: user must create and verify account before entering Tamil Nadu Agricultural page
    return null;
  });

  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Synchronize session with backend on mount
  useEffect(() => {
    const verifySession = async () => {
      const token = sessionToken || localStorage.getItem(STORAGE_SESSION_TOKEN_KEY) || getCookie('tn_agri_session_token');
      if (!token) return;

      try {
        setIsLoadingSession(true);
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success && data.user) {
          const syncedUser: UserProfile = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || data.user.email.split('@')[0],
            displayNameTa: data.user.displayNameTa || data.user.name,
            phone: data.user.phone || '+91 98421 82910',
            districtId: data.user.districtId || 'ariyalur',
            districtName: data.user.districtName || 'Ariyalur',
            landAcres: data.user.landAcres || 3.5,
            farmerCategory: data.user.landAcres > 5 ? 'Semi-Medium (5 - 10 acres)' : 'Small (2.5 - 5 acres)',
            primaryCrops: ['Samba Paddy', 'Cashew', 'Turmeric'],
            isVerifiedGoogle: true,
            kisanCreditCard: true,
            soilHealthCard: true,
            joinedDate: 'Active Member',
            avatarLetter: data.user.avatarLetter || data.user.name.charAt(0).toUpperCase(),
            avatarBgColor: 'bg-emerald-700',
            role: 'Verified Farmer User',
          };
          setUser(syncedUser);
          setSavedAccounts((prev) => {
            if (prev.some((a) => a.email.toLowerCase() === syncedUser.email.toLowerCase())) {
              return prev;
            }
            return [syncedUser, ...prev];
          });
        }
      } catch (e) {
        console.warn('Session verification fallback to local persistence:', e);
      } finally {
        setIsLoadingSession(false);
      }
    };

    verifySession();
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_ACTIVE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      if (sessionToken) {
        localStorage.setItem(STORAGE_SESSION_TOKEN_KEY, sessionToken);
        setCookie('tn_agri_session_token', sessionToken);
      } else {
        localStorage.removeItem(STORAGE_SESSION_TOKEN_KEY);
        deleteCookie('tn_agri_session_token');
      }
    } catch {
      // ignore
    }
  }, [sessionToken]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ACCOUNTS_LIST_KEY, JSON.stringify(savedAccounts));
    } catch {
      // ignore
    }
  }, [savedAccounts]);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Request 6-digit verification code
  const requestVerificationCode = async (email: string): Promise<{ success: boolean; code?: string; error?: string }> => {
    try {
      const res = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to generate verification code.' };
      }
      return { success: true, code: data.code };
    } catch (err: any) {
      console.error('Request verification error:', err);
      return { success: false, error: 'Network error requesting verification code.' };
    }
  };

  // Complete verification & registration
  const verifyAndRegister = async (params: {
    email: string;
    password: string;
    code: string;
    name?: string;
    districtName?: string;
    districtId?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/verify-and-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Verification code invalid or expired. Please check and try again.',
        };
      }

      const verifiedUser: UserProfile = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        displayNameTa: data.user.displayNameTa || data.user.name,
        phone: '+91 98421 82910',
        districtId: data.user.districtId || 'ariyalur',
        districtName: data.user.districtName || 'Ariyalur',
        landAcres: data.user.landAcres || 3.5,
        farmerCategory: 'Small (2.5 - 5 acres)',
        primaryCrops: ['Samba Paddy', 'Vegetables'],
        isVerifiedGoogle: true,
        kisanCreditCard: true,
        soilHealthCard: true,
        pmKisanId: `TN-PMK-${Math.floor(1000 + Math.random() * 9000)}`,
        joinedDate: 'Joined Today (Verified)',
        avatarLetter: data.user.avatarLetter || data.user.name.charAt(0).toUpperCase(),
        avatarBgColor: 'bg-emerald-700',
        role: 'Verified Farmer Member',
      };

      setSessionToken(data.token);
      setUser(verifiedUser);
      setSavedAccounts((prev) => [verifiedUser, ...prev.filter((a) => a.email.toLowerCase() !== params.email.toLowerCase())]);
      setIsLoginModalOpen(false);

      return { success: true };
    } catch (err: any) {
      console.error('Verify & register error:', err);
      return { success: false, error: 'Network error during verification. Please try again.' };
    }
  };

  // Direct Signup API (Email and Password only)
  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Failed to create account. Please check your details.',
        };
      }

      const newUserProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        displayNameTa: data.user.displayNameTa || data.user.name,
        phone: '+91 98421 82910',
        districtId: data.user.districtId || 'ariyalur',
        districtName: data.user.districtName || 'Ariyalur',
        landAcres: data.user.landAcres || 3.5,
        farmerCategory: 'Small (2.5 - 5 acres)',
        primaryCrops: ['Samba Paddy', 'Vegetables'],
        isVerifiedGoogle: true,
        kisanCreditCard: true,
        soilHealthCard: true,
        pmKisanId: `TN-PMK-${Math.floor(1000 + Math.random() * 9000)}`,
        joinedDate: 'Joined Today',
        avatarLetter: data.user.avatarLetter || data.user.name.charAt(0).toUpperCase(),
        avatarBgColor: 'bg-emerald-700',
        role: 'Verified Farmer Member',
      };

      setSessionToken(data.token);
      setUser(newUserProfile);
      setSavedAccounts((prev) => [newUserProfile, ...prev.filter((a) => a.email.toLowerCase() !== cleanEmail)]);
      setIsLoginModalOpen(false);

      return { success: true };
    } catch (err: any) {
      console.error('Signup error:', err);
      return { success: false, error: 'Network error during signup. Please try again.' };
    }
  };

  // Direct Login API (Email and Password only)
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Invalid email or password. Please check your credentials and try again.',
        };
      }

      const loggedInUser: UserProfile = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        displayNameTa: data.user.displayNameTa || data.user.name,
        phone: '+91 98421 82910',
        districtId: data.user.districtId || 'ariyalur',
        districtName: data.user.districtName || 'Ariyalur',
        landAcres: data.user.landAcres || 3.5,
        farmerCategory: 'Small (2.5 - 5 acres)',
        primaryCrops: ['Samba Paddy', 'Cashew'],
        isVerifiedGoogle: true,
        kisanCreditCard: true,
        soilHealthCard: true,
        pmKisanId: 'TN-PMK-2024-8849',
        joinedDate: 'Active Member',
        avatarLetter: data.user.avatarLetter || data.user.name.charAt(0).toUpperCase(),
        avatarBgColor: 'bg-emerald-700',
        role: 'Verified Farmer Member',
      };

      setSessionToken(data.token);
      setUser(loggedInUser);
      setSavedAccounts((prev) => [loggedInUser, ...prev.filter((a) => a.email.toLowerCase() !== cleanEmail)]);
      setIsLoginModalOpen(false);

      return { success: true };
    } catch (err: any) {
      console.error('Login error:', err);
      return {
        success: false,
        error: 'Network connection issue during login. Please try again.',
      };
    }
  };

  const loginWithSpecificUser = () => {
    setUser(SPECIFIC_GOOGLE_USER);
    setSessionToken('seed_praveen_session_token_2026');
    setSavedAccounts((prev) => {
      if (prev.some((acc) => acc.email.toLowerCase() === SPECIFIC_GOOGLE_USER.email.toLowerCase())) {
        return prev;
      }
      return [SPECIFIC_GOOGLE_USER, ...prev];
    });
    setIsLoginModalOpen(false);
  };

  const loginWithGoogleEmail = (email: string, name?: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes('@gmail.com') && !cleanEmail.includes('@')) {
      return false;
    }

    const existing = savedAccounts.find((acc) => acc.email.toLowerCase() === cleanEmail);
    if (existing) {
      setUser(existing);
      setIsLoginModalOpen(false);
      return true;
    }

    // If matches specific user
    if (cleanEmail === SPECIFIC_GOOGLE_USER.email.toLowerCase()) {
      loginWithSpecificUser();
      return true;
    }

    // Auto-create a standard Google account profile
    const derivedName = name || cleanEmail.split('@')[0].replace(/[._0-9]/g, ' ').trim() || 'Farmer';
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    const newProfile: UserProfile = {
      id: `user_google_${Date.now()}`,
      email: cleanEmail,
      name: formattedName,
      displayNameTa: formattedName,
      phone: '+91 94430 00000',
      districtId: 'ariyalur',
      districtName: 'Ariyalur',
      landAcres: 3.0,
      farmerCategory: 'Small (2.5 - 5 acres)',
      primaryCrops: ['Paddy', 'Vegetables', 'Pulses'],
      isVerifiedGoogle: true,
      kisanCreditCard: true,
      soilHealthCard: true,
      pmKisanId: `TN-PMK-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: 'Joined Today',
      avatarLetter: formattedName.charAt(0).toUpperCase(),
      avatarBgColor: 'bg-emerald-600',
      role: 'Registered Google Mail Farmer',
    };

    setSavedAccounts((prev) => [newProfile, ...prev]);
    setUser(newProfile);
    setIsLoginModalOpen(false);
    return true;
  };

  const registerAccount = (input: NewFarmerAccountInput): boolean => {
    const cleanEmail = input.email.trim().toLowerCase();
    if (!cleanEmail.includes('@gmail.com') && !cleanEmail.includes('@')) {
      return false;
    }

    const newProfile: UserProfile = {
      id: `user_google_${Date.now()}`,
      email: cleanEmail,
      name: input.name.trim(),
      displayNameTa: input.name.trim(),
      phone: input.phone.trim(),
      districtId: input.districtId,
      districtName: input.districtName,
      landAcres: input.landAcres,
      farmerCategory: input.farmerCategory,
      primaryCrops: input.primaryCrops,
      isVerifiedGoogle: true,
      kisanCreditCard: input.kisanCreditCard ?? true,
      soilHealthCard: input.soilHealthCard ?? true,
      pmKisanId: input.pmKisanId || `TN-PMK-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: 'Joined Today',
      avatarLetter: input.name.trim().charAt(0).toUpperCase() || 'F',
      avatarBgColor: 'bg-emerald-700',
      role: 'Verified Google Mail Farmer',
    };

    setSavedAccounts((prev) => {
      const filtered = prev.filter((acc) => acc.email.toLowerCase() !== cleanEmail);
      return [newProfile, ...filtered];
    });
    setUser(newProfile);
    setIsLoginModalOpen(false);
    return true;
  };

  const logout = async (): Promise<void> => {
    try {
      if (sessionToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
      }
    } catch (e) {
      console.warn('Logout API error:', e);
    } finally {
      setUser(null);
      setSessionToken(null);
      try {
        localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
        localStorage.removeItem(STORAGE_SESSION_TOKEN_KEY);
        deleteCookie('tn_agri_session_token');
      } catch {
        // ignore
      }
    }
  };

  const switchAccount = (userId: string) => {
    const target = savedAccounts.find((acc) => acc.id === userId);
    if (target) {
      setUser(target);
      setIsLoginModalOpen(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        savedAccounts,
        sessionToken,
        isLoadingSession,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        signup,
        requestVerificationCode,
        verifyAndRegister,
        loginWithSpecificUser,
        loginWithGoogleEmail,
        registerAccount,
        logout,
        switchAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
