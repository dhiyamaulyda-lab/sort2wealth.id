import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Nasabah,
  MitraBank,
  PickupRequest,
  Transaction,
  WastePriceItem,
  EduArticle,
  AppNotification,
  PickupStatus,
  EcoReward
} from '../types';
import {
  initialNasabah,
  initialMitraList,
  initialPickupRequests,
  initialTransactions,
  initialWastePrices,
  initialEduArticles,
  initialNotifications
} from '../data/mockData';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  logout: () => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  selectedMitraTab: string;
  setSelectedMitraTab: (tab: string) => void;
  nasabah: Nasabah;
  nasabahList: Nasabah[];
  updateNasabah: (data: Partial<Nasabah>) => void;
  addNasabahAccount: (data: { name: string; email: string; phone: string; address?: string }) => Nasabah;
  deleteNasabahAccount: (id: string) => void;
  loginAsNasabah: (emailOrPhone: string) => boolean;
  mitraList: MitraBank[];
  activeMitraAdmin: MitraBank;
  updateMitraAdmin: (updated: Partial<MitraBank>) => void;
  pickupRequests: PickupRequest[];
  addPickupRequest: (request: Omit<PickupRequest, 'id' | 'code' | 'createdAt' | 'status'>) => PickupRequest;
  updatePickupStatus: (id: string, status: PickupStatus, extraData?: { driverName?: string; driverPhone?: string; finalWeightKg?: number; finalAmountRp?: number; finalPoints?: number }) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'code' | 'date'>) => Transaction;
  wastePrices: WastePriceItem[];
  updateWastePriceItem: (id: string, newPrice: number, newPoint: number) => void;
  eduArticles: EduArticle[];
  addEduArticle: (article: Omit<EduArticle, 'id' | 'date' | 'views'>) => void;
  updateEduArticle: (id: string, updated: Partial<EduArticle>) => void;
  deleteEduArticle: (id: string) => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  redeemReward: (reward: EcoReward, targetNumber: string) => boolean;
  selectedMitraForDetail: MitraBank | null;
  setSelectedMitraForDetail: (mitra: MitraBank | null) => void;
  isPickupModalOpen: boolean;
  setIsPickupModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authInitialTab: 'nasabah' | 'mitra';
  authInitialMode: 'login' | 'register';
  openAuthModal: (tab?: 'nasabah' | 'mitra', mode?: 'login' | 'register') => void;
  addMitraBank: (data: Omit<MitraBank, 'id' | 'slug' | 'rating' | 'reviewsCount' | 'lat' | 'lng' | 'prices' | 'isVerified'>) => MitraBank;
  setActiveMitraAdminId: (id: string) => void;
  setActiveNasabahId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('ecobank_user_role');
      return (saved as UserRole) || 'public';
    } catch {
      return 'public';
    }
  });

  const [activeNavTab, setActiveNavTab] = useState<string>(() => {
    try {
      const savedRole = localStorage.getItem('ecobank_user_role');
      if (savedRole === 'nasabah') return 'portal_nasabah';
      if (savedRole === 'admin_mitra') return 'dashboard_mitra';
    } catch {
      // fallback
    }
    return 'beranda';
  });

  const [selectedMitraTab, setSelectedMitraTab] = useState<string>('overview');

  const [nasabahList, setNasabahList] = useState<Nasabah[]>(() => {
    try {
      const saved = localStorage.getItem('ecobank_nasabah_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [
      initialNasabah,
      {
        id: 'nas-002',
        name: 'Siti Rahma',
        email: 'siti.rahma@gmail.com',
        phone: '081398765432',
        address: 'Jl. Dago No. 102, Bandung',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        balanceRp: 185000,
        rewardPoints: 620,
        totalWasteKg: 64.0,
        level: 'Nasabah Aktif',
        memberSince: '15 Maret 2024',
        co2SavedKg: 92.8,
        treesSaved: 5
      },
      {
        id: 'nas-003',
        name: 'Andhika Wahyu',
        email: 'andhikawatyu@gmail.com',
        phone: '085711223344',
        address: 'Jl. Pemuda No. 88, Surabaya',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        balanceRp: 520000,
        rewardPoints: 2100,
        totalWasteKg: 210.5,
        level: 'Pahlawan Hijau Utama',
        memberSince: '5 Januari 2024',
        co2SavedKg: 305.2,
        treesSaved: 17
      }
    ];
  });

  const [activeNasabahId, setActiveNasabahId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ecobank_active_nasabah_id');
      return saved || initialNasabah.id;
    } catch {
      return initialNasabah.id;
    }
  });

  const [mitraList, setMitraList] = useState<MitraBank[]>(() => {
    try {
      const saved = localStorage.getItem('ecobank_mitra_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return initialMitraList;
  });

  const [activeMitraAdminId, setActiveMitraAdminId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ecobank_active_mitra_id');
      return saved || 'mitra-01';
    } catch {
      return 'mitra-01';
    }
  });

  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>(() => {
    try {
      const saved = localStorage.getItem('ecobank_pickups');
      return saved ? JSON.parse(saved) : initialPickupRequests;
    } catch {
      return initialPickupRequests;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('ecobank_transactions');
      return saved ? JSON.parse(saved) : initialTransactions;
    } catch {
      return initialTransactions;
    }
  });

  const [wastePrices, setWastePrices] = useState<WastePriceItem[]>(() => {
    try {
      const saved = localStorage.getItem('ecobank_waste_prices');
      return saved ? JSON.parse(saved) : initialWastePrices;
    } catch {
      return initialWastePrices;
    }
  });

  const [eduArticles, setEduArticles] = useState<EduArticle[]>(() => {
    try {
      const saved = localStorage.getItem('ecobank_articles');
      return saved ? JSON.parse(saved) : initialEduArticles;
    } catch {
      return initialEduArticles;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('ecobank_notifications');
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [selectedMitraForDetail, setSelectedMitraForDetail] = useState<MitraBank | null>(null);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialTab, setAuthInitialTab] = useState<'nasabah' | 'mitra'>('nasabah');
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');

  const nasabah = nasabahList.find(n => n.id === activeNasabahId) || nasabahList[0] || initialNasabah;
  const activeMitraAdmin = mitraList.find(m => m.id === activeMitraAdminId) || mitraList[0];

  const logout = () => {
    setUserRole('public');
    setActiveNavTab('beranda');
    try {
      localStorage.setItem('ecobank_user_role', 'public');
    } catch {
      // ignore
    }
  };

  const openAuthModal = (tab: 'nasabah' | 'mitra' = 'nasabah', mode: 'login' | 'register' = 'login') => {
    setAuthInitialTab(tab);
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const addNasabahAccount = (data: { name: string; email: string; phone: string; address?: string }): Nasabah => {
    const newNasabah: Nasabah = {
      id: `nasabah-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address || 'Jl. Pemuda No. 123, Jakarta',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      balanceRp: 25000, // bonus pendaftaran
      rewardPoints: 50,
      totalWasteKg: 0,
      level: 'Nasabah Pemula',
      memberSince: 'Hari ini',
      co2SavedKg: 0,
      treesSaved: 0
    };

    setNasabahList(prev => [newNasabah, ...prev]);
    setActiveNasabahId(newNasabah.id);
    return newNasabah;
  };

  const deleteNasabahAccount = (id: string) => {
    setNasabahList(prev => {
      const filtered = prev.filter(n => n.id !== id);
      if (filtered.length > 0) {
        if (activeNasabahId === id) {
          setActiveNasabahId(filtered[0].id);
        }
        return filtered;
      } else {
        const defaultAccount: Nasabah = {
          id: `nasabah-${Date.now()}`,
          name: 'Nasabah Baru',
          email: 'nasabah@gmail.com',
          phone: '081234567890',
          address: 'Jl. Pemuda No. 123, Jakarta',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          balanceRp: 0,
          rewardPoints: 0,
          totalWasteKg: 0,
          level: 'Nasabah Pemula',
          memberSince: 'Hari ini',
          co2SavedKg: 0,
          treesSaved: 0
        };
        setActiveNasabahId(defaultAccount.id);
        return [defaultAccount];
      }
    });
  };

  const loginAsNasabah = (emailOrPhone: string): boolean => {
    const cleanInput = emailOrPhone.trim();
    if (!cleanInput) return false;

    const found = nasabahList.find(
      n => n.email.toLowerCase() === cleanInput.toLowerCase() ||
           n.phone === cleanInput ||
           n.name.toLowerCase() === cleanInput.toLowerCase()
    );

    if (found) {
      setActiveNasabahId(found.id);
    } else {
      // Create a brand new personalized Nasabah account with the entered name/email
      const isEmail = cleanInput.includes('@');
      const formattedName = isEmail 
        ? cleanInput.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : cleanInput;

      const newNasabah = addNasabahAccount({
        name: formattedName || 'Nasabah Baru',
        email: isEmail ? cleanInput : `${cleanInput.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        phone: !isEmail && /^\d+$/.test(cleanInput) ? cleanInput : '08' + Math.floor(1000000000 + Math.random() * 9000000000),
        address: 'Jl. Merdeka No. 12, Jakarta'
      });
      setActiveNasabahId(newNasabah.id);
    }
    setUserRole('nasabah');
    setActiveNavTab('portal_nasabah');
    return true;
  };

  const addMitraBank = (data: Omit<MitraBank, 'id' | 'slug' | 'rating' | 'reviewsCount' | 'lat' | 'lng' | 'prices' | 'isVerified'>): MitraBank => {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newMitra: MitraBank = {
      ...data,
      id: `mitra-${Date.now()}`,
      slug,
      rating: 5.0,
      reviewsCount: 1,
      lat: -6.2000 + (Math.random() - 0.5) * 0.1,
      lng: 106.8166 + (Math.random() - 0.5) * 0.1,
      prices: wastePrices,
      isVerified: true
    };
    setMitraList(prev => [newMitra, ...prev]);
    setActiveMitraAdminId(newMitra.id);
    return newMitra;
  };

  // Sync state to local storage safely
  useEffect(() => {
    try {
      localStorage.setItem('ecobank_user_role', userRole);
    } catch {}
  }, [userRole]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_nasabah_list', JSON.stringify(nasabahList));
    } catch {}
  }, [nasabahList]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_active_nasabah_id', activeNasabahId);
    } catch {}
  }, [activeNasabahId]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_mitra_list', JSON.stringify(mitraList));
    } catch {}
  }, [mitraList]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_active_mitra_id', activeMitraAdminId);
    } catch {}
  }, [activeMitraAdminId]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_pickups', JSON.stringify(pickupRequests));
    } catch {}
  }, [pickupRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_transactions', JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_waste_prices', JSON.stringify(wastePrices));
    } catch {}
  }, [wastePrices]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_articles', JSON.stringify(eduArticles));
    } catch {}
  }, [eduArticles]);

  useEffect(() => {
    try {
      localStorage.setItem('ecobank_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const updateNasabah = (data: Partial<Nasabah>) => {
    setNasabahList(prev =>
      prev.map(n => (n.id === nasabah.id ? { ...n, ...data } : n))
    );
  };

  const updateMitraAdmin = (updated: Partial<MitraBank>) => {
    setMitraList(prev =>
      prev.map(m => (m.id === activeMitraAdmin.id ? { ...m, ...updated } : m))
    );
  };

  const addPickupRequest = (
    requestData: Omit<PickupRequest, 'id' | 'code' | 'createdAt' | 'status'>
  ): PickupRequest => {
    const randomCode = `PKP-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(100 + Math.random() * 900)}`;
    const newReq: PickupRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      code: randomCode,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setPickupRequests(prev => [newReq, ...prev]);

    // Add Notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Permintaan Penjemputan Baru',
      message: `Jadwal penjemputan (${newReq.code}) telah terkirim ke ${newReq.mitraName}.`,
      timestamp: 'Baru saja',
      isRead: false,
      type: 'pickup'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newReq;
  };

  const updatePickupStatus = (
    id: string,
    status: PickupStatus,
    extraData?: {
      driverName?: string;
      driverPhone?: string;
      finalWeightKg?: number;
      finalAmountRp?: number;
      finalPoints?: number;
    }
  ) => {
    setPickupRequests(prev =>
      prev.map(req => {
        if (req.id !== id) return req;
        const updatedReq: PickupRequest = {
          ...req,
          status,
          ...(extraData || {})
        };

        // If completed, trigger automatic transaction logging and balance update
        if (status === 'Selesai' && req.status !== 'Selesai' && extraData?.finalAmountRp) {
          const txCode = `TRX-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(100 + Math.random() * 900)}`;
          const newTx: Transaction = {
            id: `trx-${Date.now()}`,
            code: txCode,
            date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
            nasabahId: req.nasabahId,
            nasabahName: req.nasabahName,
            mitraId: req.mitraId,
            mitraName: req.mitraName,
            type: 'PENJEMPUTAN',
            details: req.items.map(item => ({
              categoryName: item.categoryName,
              weightKg: item.estimatedKg,
              pricePerKg: Math.round((extraData.finalAmountRp || 0) / (extraData.finalWeightKg || 1)),
              subtotalRp: Math.round((extraData.finalAmountRp || 0) / req.items.length)
            })),
            totalWeightKg: extraData.finalWeightKg || 0,
            totalRp: extraData.finalAmountRp || 0,
            pointsEarned: extraData.finalPoints || Math.floor((extraData.finalAmountRp || 0) / 500),
            paymentStatus: 'Lunas',
            notes: `Diselesaikan oleh ${extraData.driverName || 'Petugas Mitra'}`
          };

          setTransactions(txPrev => [newTx, ...txPrev]);

          // Update Nasabah stats in nasabahList
          setNasabahList(nasPrevList =>
            nasPrevList.map(nasPrev => {
              if (nasPrev.id !== req.nasabahId) return nasPrev;
              const addedKg = extraData.finalWeightKg || 0;
              const addedRp = extraData.finalAmountRp || 0;
              const addedPts = extraData.finalPoints || 0;
              return {
                ...nasPrev,
                balanceRp: nasPrev.balanceRp + addedRp,
                rewardPoints: nasPrev.rewardPoints + addedPts,
                totalWasteKg: nasPrev.totalWasteKg + addedKg,
                co2SavedKg: Number((nasPrev.co2SavedKg + addedKg * 1.45).toFixed(1)),
                treesSaved: Math.floor((nasPrev.totalWasteKg + addedKg) / 12)
              };
            })
          );
        }

        return updatedReq;
      })
    );
  };

  const addTransaction = (txData: Omit<Transaction, 'id' | 'code' | 'date'>): Transaction => {
    const txCode = `TRX-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(100 + Math.random() * 900)}`;
    const newTx: Transaction = {
      ...txData,
      id: `trx-${Date.now()}`,
      code: txCode,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setTransactions(prev => [newTx, ...prev]);

    // Update Nasabah Balance
    setNasabahList(nasPrevList =>
      nasPrevList.map(prev => {
        if (prev.id !== newTx.nasabahId) return prev;
        let balanceDiff = 0;
        let pointsDiff = 0;
        let wasteDiff = 0;

        if (newTx.type === 'SETORAN' || newTx.type === 'PENJEMPUTAN') {
          balanceDiff = newTx.totalRp;
          pointsDiff = newTx.pointsEarned;
          wasteDiff = newTx.totalWeightKg;
        } else if (newTx.type === 'PENARIKAN_SALDO') {
          balanceDiff = -newTx.totalRp;
        }

        return {
          ...prev,
          balanceRp: Math.max(0, prev.balanceRp + balanceDiff),
          rewardPoints: Math.max(0, prev.rewardPoints + pointsDiff),
          totalWasteKg: prev.totalWasteKg + wasteDiff,
          co2SavedKg: Number((prev.co2SavedKg + wasteDiff * 1.45).toFixed(1))
        };
      })
    );

    return newTx;
  };

  const updateWastePriceItem = (id: string, newPrice: number, newPoint: number) => {
    setWastePrices(prev =>
      prev.map(item => (item.id === id ? { ...item, pricePerUnit: newPrice, pointPerUnit: newPoint } : item))
    );
  };

  const addEduArticle = (article: Omit<EduArticle, 'id' | 'date' | 'views'>) => {
    const newArticle: EduArticle = {
      ...article,
      id: `edu-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      views: 0
    };
    setEduArticles(prev => [newArticle, ...prev]);
  };

  const updateEduArticle = (id: string, updated: Partial<EduArticle>) => {
    setEduArticles(prev => prev.map(art => (art.id === id ? { ...art, ...updated } : art)));
  };

  const deleteEduArticle = (id: string) => {
    setEduArticles(prev => prev.filter(art => art.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const redeemReward = (reward: EcoReward, targetNumber: string): boolean => {
    if (nasabah.rewardPoints < reward.pointsRequired) {
      return false;
    }

    setNasabahList(prevList =>
      prevList.map(prev => (prev.id === nasabah.id ? { ...prev, rewardPoints: prev.rewardPoints - reward.pointsRequired } : prev))
    );

    const txCode = `RWD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(100 + Math.random() * 900)}`;
    const newTx: Transaction = {
      id: `trx-${Date.now()}`,
      code: txCode,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      nasabahId: nasabah.id,
      nasabahName: nasabah.name,
      mitraId: 'ecobank-system',
      mitraName: 'From Waste To Wealth Rewards',
      type: 'PENUKARAN_POIN',
      details: [
        {
          categoryName: `Penukaran ${reward.title} (${targetNumber})`,
          weightKg: 0,
          pricePerKg: 0,
          subtotalRp: reward.valueRp
        }
      ],
      totalWeightKg: 0,
      totalRp: reward.valueRp,
      pointsEarned: -reward.pointsRequired,
      paymentStatus: 'Lunas',
      notes: `Kategori: ${reward.category}, No. Tujuan: ${targetNumber}`
    };

    setTransactions(prev => [newTx, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Penukaran Reward Berhasil',
      message: `Tukar ${reward.title} sebesar ${reward.pointsRequired} Poin berhasil dikirim ke ${targetNumber}.`,
      timestamp: 'Baru saja',
      isRead: false,
      type: 'reward'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return true;
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        logout,
        activeNavTab,
        setActiveNavTab,
        selectedMitraTab,
        setSelectedMitraTab,
        nasabah,
        nasabahList,
        updateNasabah,
        addNasabahAccount,
        deleteNasabahAccount,
        loginAsNasabah,
        mitraList,
        activeMitraAdmin,
        updateMitraAdmin,
        pickupRequests,
        addPickupRequest,
        updatePickupStatus,
        transactions,
        addTransaction,
        wastePrices,
        updateWastePriceItem,
        eduArticles,
        addEduArticle,
        updateEduArticle,
        deleteEduArticle,
        notifications,
        markNotificationAsRead,
        redeemReward,
        selectedMitraForDetail,
        setSelectedMitraForDetail,
        isPickupModalOpen,
        setIsPickupModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authInitialTab,
        authInitialMode,
        openAuthModal,
        addMitraBank,
        setActiveMitraAdminId,
        setActiveNasabahId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
