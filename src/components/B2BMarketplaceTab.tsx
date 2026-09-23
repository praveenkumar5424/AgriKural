import React, { useState, useEffect } from 'react';
import {
  Store,
  PlusCircle,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  Truck,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  UserCheck,
  DollarSign,
  Layers,
  Building2,
  Users,
  Check,
  ChevronRight,
  AlertCircle,
  BadgeCheck,
  Calculator,
  RefreshCw,
  X,
  Package,
} from 'lucide-react';
import { B2BUser, CropListing, B2BOrder, UserRole, CropCategory, ListingStatus } from '../types';
import { INITIAL_B2B_USERS, INITIAL_CROP_LISTINGS, INITIAL_B2B_ORDERS } from '../data/b2bMarketplaceData';
import { useLanguage } from '../context/LanguageContext';

interface B2BMarketplaceTabProps {
  selectedDistrict: string;
  onDistrictSelect?: (district: string) => void;
}

export const B2BMarketplaceTab: React.FC<B2BMarketplaceTabProps> = ({
  selectedDistrict,
  onDistrictSelect,
}) => {
  const { t, language } = useLanguage();
  // State
  const [users, setUsers] = useState<B2BUser[]>(INITIAL_B2B_USERS);
  const [currentUser, setCurrentUser] = useState<B2BUser>(INITIAL_B2B_USERS[0]); // Default to Farmer
  const [listings, setListings] = useState<CropListing[]>(INITIAL_CROP_LISTINGS);
  const [orders, setOrders] = useState<B2BOrder[]>(INITIAL_B2B_ORDERS);

  const [loading, setLoading] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState<'browse' | 'my-listings' | 'my-orders' | 'admin-dashboard'>('browse');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterDistrict, setFilterDistrict] = useState<string>('All');
  const [filterOrganicOnly, setFilterOrganicOnly] = useState(false);

  // New Listing Modal State (Farmer)
  const [showNewListingModal, setShowNewListingModal] = useState(false);
  const [newListingForm, setNewListingForm] = useState({
    cropName: 'Samba Paddy (CR 1009 Sub-1)',
    tamilName: 'சம்பா நெல் (சி.ஆர் 1009)',
    category: 'Grains' as CropCategory,
    variety: 'CR 1009 Super Fine',
    quantityAvailable: 100,
    unit: 'Quintals',
    pricePerUnit: 2400,
    district: selectedDistrict || 'Thanjavur',
    villageLocation: '',
    harvestDate: new Date().toISOString().split('T')[0],
    qualityGrade: 'Grade-A (Export / Premium)' as any,
    organicCertified: false,
    fpoName: '',
    description: '',
  });

  // Order Inquiry Modal State (Client)
  const [selectedListingForOrder, setSelectedListingForOrder] = useState<CropListing | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(50);
  const [orderOfferPrice, setOrderOfferPrice] = useState<number>(0);
  const [orderDeliveryAddress, setOrderDeliveryAddress] = useState<string>('');
  const [orderInquiryMessage, setOrderInquiryMessage] = useState<string>('');
  const [orderPaymentTerms, setOrderPaymentTerms] = useState<string>('50% Advance DBT + 50% on Delivery');

  // AI Deal Arbitrator State
  const [aiDealResult, setAiDealResult] = useState<any>(null);
  const [aiDealLoading, setAiDealLoading] = useState(false);

  // Success Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Fetch initial data from server if reachable
  const fetchMarketplaceData = async () => {
    setLoading(true);
    try {
      const [resUsers, resListings, resOrders] = await Promise.all([
        fetch('/api/b2b/users').then((r) => r.json()).catch(() => null),
        fetch('/api/listings?status=all').then((r) => r.json()).catch(() => null),
        fetch('/api/orders').then((r) => r.json()).catch(() => null),
      ]);

      if (resUsers?.users?.length) {
        setUsers(resUsers.users);
      }
      if (resListings?.listings?.length) {
        setListings(resListings.listings);
      }
      if (resOrders?.orders?.length) {
        setOrders(resOrders.orders);
      }
    } catch {
      // fallback in-memory already active
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  // Switch Role
  const handleSwitchUser = (user: B2BUser) => {
    setCurrentUser(user);
    if (user.role === 'farmer') {
      setActiveViewMode('browse');
    } else if (user.role === 'client') {
      setActiveViewMode('browse');
    } else {
      setActiveViewMode('admin-dashboard');
    }
    showToast(`Switched active role to: ${user.name} (${user.role.toUpperCase()})`);
  };

  // Handle Post New Listing (Farmer)
  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...newListingForm,
        farmerId: currentUser._id,
        farmerName: currentUser.name,
        farmerPhone: currentUser.phone,
        farmerDistrict: newListingForm.district,
      };

      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success && data.listing) {
        setListings([data.listing, ...listings]);
        setShowNewListingModal(false);
        showToast('🎉 Harvest listing published! Wholesale buyers across Tamil Nadu can now send direct purchase orders.');
      } else {
        // Local fallback
        const localListing: CropListing = {
          _id: `lst-${Date.now()}`,
          farmerId: currentUser._id,
          farmerName: currentUser.name,
          farmerPhone: currentUser.phone,
          farmerDistrict: newListingForm.district,
          cropName: newListingForm.cropName,
          tamilName: newListingForm.tamilName,
          category: newListingForm.category,
          variety: newListingForm.variety,
          quantityAvailable: Number(newListingForm.quantityAvailable),
          unit: newListingForm.unit,
          pricePerUnit: Number(newListingForm.pricePerUnit),
          mandiBenchmarkPrice: Math.round(Number(newListingForm.pricePerUnit) * 0.93),
          district: newListingForm.district,
          villageLocation: newListingForm.villageLocation || `${newListingForm.district} Agricultural Area`,
          harvestDate: newListingForm.harvestDate,
          qualityGrade: newListingForm.qualityGrade,
          organicCertified: newListingForm.organicCertified,
          fpoName: newListingForm.fpoName,
          status: 'active',
          description: newListingForm.description || 'Direct farm gate harvest available with zero broker commission.',
          createdAt: new Date().toISOString(),
        };
        setListings([localListing, ...listings]);
        setShowNewListingModal(false);
        showToast('🎉 Harvest listing added successfully!');
      }
    } catch {
      showToast('Listing submitted.');
      setShowNewListingModal(false);
    }
  };

  // Open Order Modal for Client
  const handleOpenOrderModal = (listing: CropListing) => {
    setSelectedListingForOrder(listing);
    setOrderQuantity(Math.min(listing.quantityAvailable, 50));
    setOrderOfferPrice(listing.pricePerUnit);
    setOrderDeliveryAddress(`Warehouse / Processing Unit in ${currentUser.district}`);
    setOrderInquiryMessage(`Requesting ${Math.min(listing.quantityAvailable, 50)} ${listing.unit} of ${listing.cropName} directly from your farm.`);
    setAiDealResult(null);
  };

  // Run AI Deal Negotiator & Freight Evaluation
  const handleRunAiDealAssist = async () => {
    if (!selectedListingForOrder) return;
    setAiDealLoading(true);
    try {
      const res = await fetch('/api/b2b/ai-deal-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: selectedListingForOrder.cropName,
          category: selectedListingForOrder.category,
          originDistrict: selectedListingForOrder.district,
          buyerDistrict: currentUser.district,
          quantity: orderQuantity,
          unit: selectedListingForOrder.unit,
          farmerPrice: selectedListingForOrder.pricePerUnit,
          buyerOfferPrice: orderOfferPrice,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiDealResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiDealLoading(false);
    }
  };

  // Submit Order (Client to Farmer)
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListingForOrder) return;

    try {
      const payload = {
        clientId: currentUser._id,
        clientName: currentUser.name,
        clientPhone: currentUser.phone,
        clientCompany: currentUser.businessType,
        clientDistrict: currentUser.district,
        farmerId: selectedListingForOrder.farmerId,
        farmerName: selectedListingForOrder.farmerName,
        farmerPhone: selectedListingForOrder.farmerPhone,
        listingId: selectedListingForOrder._id,
        cropName: selectedListingForOrder.cropName,
        tamilName: selectedListingForOrder.tamilName,
        quantityRequested: Number(orderQuantity),
        unit: selectedListingForOrder.unit,
        pricePerUnit: Number(orderOfferPrice),
        deliveryDistrict: currentUser.district,
        deliveryAddress: orderDeliveryAddress,
        inquiryMessage: orderInquiryMessage,
        paymentTerms: orderPaymentTerms,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success && data.order) {
        setOrders([data.order, ...orders]);
      } else {
        const localOrder: B2BOrder = {
          _id: `ord-${Date.now()}`,
          clientId: currentUser._id,
          clientName: currentUser.name,
          clientPhone: currentUser.phone,
          clientCompany: currentUser.businessType,
          clientDistrict: currentUser.district,
          farmerId: selectedListingForOrder.farmerId,
          farmerName: selectedListingForOrder.farmerName,
          farmerPhone: selectedListingForOrder.farmerPhone,
          listingId: selectedListingForOrder._id,
          cropName: selectedListingForOrder.cropName,
          tamilName: selectedListingForOrder.tamilName,
          quantityRequested: Number(orderQuantity),
          unit: selectedListingForOrder.unit,
          pricePerUnit: Number(orderOfferPrice),
          totalAmount: Number(orderQuantity) * Number(orderOfferPrice),
          estimatedFreightInr: 6500,
          middlemanSavingsInr: Math.round(Number(orderQuantity) * Number(orderOfferPrice) * 0.15),
          distanceKm: 210,
          deliveryDistrict: currentUser.district,
          deliveryAddress: orderDeliveryAddress,
          status: 'pending',
          inquiryMessage: orderInquiryMessage,
          paymentTerms: orderPaymentTerms,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setOrders([localOrder, ...orders]);
      }

      setSelectedListingForOrder(null);
      setActiveViewMode('my-orders');
      showToast('🚀 Direct Purchase Order placed! The farmer has been notified to confirm dispatch.');
    } catch {
      setSelectedListingForOrder(null);
      showToast('Order inquiry sent successfully.');
    }
  };

  // Update Order Status (Farmer or Admin)
  const handleUpdateOrderStatus = async (orderId: string, nextStatus: 'accepted' | 'dispatched' | 'completed' | 'cancelled') => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: nextStatus, updatedAt: new Date().toISOString() } : o))
      );

      if (nextStatus === 'accepted') {
        showToast('✅ Order Accepted! Preparing packing and logistics schedule.');
      } else if (nextStatus === 'dispatched') {
        showToast('🚚 Order Marked as Dispatched! Truck tracking active.');
      } else if (nextStatus === 'completed') {
        showToast('💰 Order Completed! Direct DBT payout confirmed.');
      } else {
        showToast(`Order status updated to ${nextStatus}`);
      }
    } catch {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: nextStatus } : o))
      );
    }
  };

  // Filter listings
  const filteredListings = listings.filter((item) => {
    if (filterDistrict !== 'All' && item.district.toLowerCase() !== filterDistrict.toLowerCase()) {
      return false;
    }
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (filterOrganicOnly && !item.organicCertified) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.cropName.toLowerCase().includes(q) || item.tamilName.toLowerCase().includes(q);
      const matchLoc = item.district.toLowerCase().includes(q) || item.farmerName.toLowerCase().includes(q);
      const matchVar = item.variety.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchVar) return false;
    }
    return true;
  });

  // Calculate Market Totals
  const totalVolumeQuintals = listings.reduce((acc, curr) => acc + (Number(curr.quantityAvailable) || 0), 0);
  const totalTradeValueInr = orders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
  const totalMiddlemanSavedInr = orders.reduce((acc, curr) => acc + (Number(curr.middlemanSavingsInr) || 0), 0);

  // My filtered items
  const myListings = listings.filter((l) => l.farmerId === currentUser._id);
  const myOrders = currentUser.role === 'farmer'
    ? orders.filter((o) => o.farmerId === currentUser._id)
    : orders.filter((o) => o.clientId === currentUser._id);

  return (
    <div id="b2b-marketplace-container" className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-emerald-700 text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center justify-between animate-fadeIn border border-emerald-600">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-200 hover:text-white transition-colors ml-4 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner & Multi-Role Authenticator Switcher */}
      <div className="bg-gradient-to-br from-[#083B2B] via-[#0E4D3A] to-[#165B46] rounded-2xl p-6 text-white shadow-xl border border-emerald-800/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-400/30">
              <Store className="w-3.5 h-3.5" />
              <span>Tamil Nadu Direct Farmer to Client (B2C) Agro Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.b2bMarketplaceTitle}
            </h1>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              {t.b2bMarketplaceSubtitle}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-emerald-950/50 backdrop-blur-sm p-3.5 rounded-xl border border-emerald-700/50">
            <div className="text-center px-2">
              <div className="text-xs text-emerald-300 font-medium">Available Volume</div>
              <div className="text-lg font-bold text-white mt-0.5">{totalVolumeQuintals.toLocaleString()} <span className="text-xs font-normal">Qtl</span></div>
            </div>
            <div className="text-center px-2 border-x border-emerald-700/50">
              <div className="text-xs text-emerald-300 font-medium">Active Deals</div>
              <div className="text-lg font-bold text-white mt-0.5">₹{(totalTradeValueInr / 100000).toFixed(1)} <span className="text-xs font-normal">Lakhs</span></div>
            </div>
            <div className="text-center px-2">
              <div className="text-xs text-emerald-300 font-medium">Middleman Saved</div>
              <div className="text-lg font-bold text-emerald-300 mt-0.5">₹{(totalMiddlemanSavedInr / 1000).toFixed(0)}k</div>
            </div>
          </div>
        </div>

        {/* Role Authenticator Switcher Bar */}
        <div className="mt-6 pt-5 border-t border-emerald-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              Simulate Active Role:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {users.map((u) => {
              const isSelected = u._id === currentUser._id;
              const roleBadgeColor =
                u.role === 'farmer'
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/30'
                  : u.role === 'client'
                  ? 'bg-blue-500/20 text-blue-200 border-blue-500/30'
                  : 'bg-purple-500/20 text-purple-200 border-purple-500/30';

              return (
                <button
                  key={u._id}
                  onClick={() => handleSwitchUser(u)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-white text-emerald-950 shadow-md font-bold border-white'
                      : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800/80 border-emerald-700/50'
                  }`}
                >
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${roleBadgeColor}`}>
                    {u.role.toUpperCase()}
                  </span>
                  <span>{u.name}</span>
                  <span className="text-[11px] opacity-75">({u.district})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active User Summary Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
            currentUser.role === 'farmer' ? 'bg-emerald-600' : currentUser.role === 'client' ? 'bg-blue-600' : 'bg-purple-600'
          }`}>
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{currentUser.name}</span>
              {currentUser.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                {currentUser.district}, TN
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{currentUser.businessType}</p>
          </div>
        </div>

        {/* View Tabs & Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setActiveViewMode('browse')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeViewMode === 'browse'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Marketplace Catalog</span>
          </button>

          {currentUser.role === 'farmer' && (
            <button
              onClick={() => setActiveViewMode('my-listings')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeViewMode === 'my-listings'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>My Harvest Listings ({myListings.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveViewMode('my-orders')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeViewMode === 'my-orders'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>
              {currentUser.role === 'farmer' ? 'Incoming Client Orders' : 'My Direct Orders (B2C)'} ({myOrders.length})
            </span>
          </button>

          {currentUser.role === 'farmer' && (
            <button
              onClick={() => setShowNewListingModal(true)}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post New Harvest</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: BROWSE CATALOG (Clients & Farmers) */}
      {activeViewMode === 'browse' && (
        <div className="space-y-5">
          {/* Filters Bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search crop, variety, or farmer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Grains">Grains & Cereals (Paddy, Maize)</option>
                  <option value="Vegetables">Vegetables (Shallots, Chillies)</option>
                  <option value="Fruits">Fruits (Banana, Mango, Grapes)</option>
                  <option value="Spices">Spices & GI Tags (Turmeric)</option>
                  <option value="Oilseeds">Oilseeds & Pulses (Urad, Groundnut)</option>
                  <option value="Commercial">Commercial (Cotton, Sugarcane)</option>
                </select>
              </div>

              {/* District Filter */}
              <div>
                <select
                  value={filterDistrict}
                  onChange={(e) => setFilterDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="All">All Tamil Nadu Districts</option>
                  <option value="Thanjavur">Thanjavur (Cauvery Delta)</option>
                  <option value="Perambalur">Perambalur (Shallots Hub)</option>
                  <option value="Erode">Erode (Turmeric GI)</option>
                  <option value="Theni">Theni (Cumbum Valley)</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Salem">Salem</option>
                  <option value="Tiruchirappalli">Tiruchirappalli</option>
                  <option value="Cuddalore">Cuddalore</option>
                </select>
              </div>

              {/* Organic Certified Toggle */}
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={filterOrganicOnly}
                    onChange={(e) => setFilterOrganicOnly(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                  />
                  <span>100% Organic Certified Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((listing) => {
              const mandiDiff = listing.pricePerUnit - listing.mandiBenchmarkPrice;
              const isOwner = listing.farmerId === currentUser._id;

              return (
                <div
                  key={listing._id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3.5">
                    {/* Header: Category & Grade */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {listing.category}
                      </span>
                      {listing.organicCertified && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-300">
                          🌿 Organic Certified
                        </span>
                      )}
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {listing.qualityGrade}
                      </span>
                    </div>

                    {/* Crop Title */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{listing.cropName}</h3>
                      <p className="text-xs font-medium text-emerald-700 mt-0.5">{listing.tamilName}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 italic">{listing.variety}</p>
                    </div>

                    {/* Pricing & Stock Details */}
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-slate-500">Farm-Gate Price:</span>
                        <div className="text-right">
                          <span className="text-lg font-bold text-emerald-800">₹{listing.pricePerUnit.toLocaleString()}</span>
                          <span className="text-xs text-slate-500 font-normal"> / {listing.unit}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span>Regulated Mandi Rate:</span>
                        <span>₹{listing.mandiBenchmarkPrice.toLocaleString()} / {listing.unit}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                        <span>Zero Broker Savings:</span>
                        <span>~15% directly saved</span>
                      </div>
                    </div>

                    {/* Farmer & Location Info */}
                    <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-slate-800">{listing.farmerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{listing.villageLocation || listing.district}</span>
                      </div>
                      {listing.fpoName && (
                        <div className="flex items-center gap-2 text-[11px] text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">FPO: {listing.fpoName}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {listing.description}
                    </p>
                  </div>

                  {/* Card Footer: Stock & Action Button */}
                  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Available Lot</div>
                      <div className="text-xs font-bold text-slate-800">{listing.quantityAvailable} {listing.unit}</div>
                    </div>

                    {currentUser.role === 'client' ? (
                      <button
                        onClick={() => handleOpenOrderModal(listing)}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Direct (B2C)</span>
                      </button>
                    ) : isOwner ? (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md">
                        Your Listing
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOpenOrderModal(listing)}
                        className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Inspect Harvest
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No crop listings match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try adjusting your search query, switching categories, or clearing the organic certification filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setFilterDistrict('All');
                  setFilterOrganicOnly(false);
                }}
                className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: MY LISTINGS (Farmer Mode) */}
      {activeViewMode === 'my-listings' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Harvest Listings posted by {currentUser.name}
            </h2>
            <button
              onClick={() => setShowNewListingModal(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Another Harvest Lot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myListings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    listing.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {listing.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500">Harvest: {listing.harvestDate}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{listing.cropName}</h3>
                  <p className="text-xs text-emerald-700 font-medium">{listing.tamilName}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stock Available:</span>
                    <span className="font-bold text-slate-800">{listing.quantityAvailable} {listing.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Listed Rate:</span>
                    <span className="font-bold text-emerald-800">₹{listing.pricePerUnit} / {listing.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Lot Value:</span>
                    <span className="font-bold text-slate-800">₹{(listing.quantityAvailable * listing.pricePerUnit).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      const newQty = prompt('Enter new stock quantity in Quintals:', String(listing.quantityAvailable));
                      if (newQty) {
                        setListings(listings.map((l) => (l._id === listing._id ? { ...l, quantityAvailable: Number(newQty) } : l)));
                        showToast('Stock quantity updated.');
                      }
                    }}
                    className="flex-1 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                  >
                    Adjust Stock
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this listing from the marketplace?')) {
                        setListings(listings.filter((l) => l._id !== listing._id));
                        showToast('Listing removed.');
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {myListings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
              <Package className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No active listings for this profile</h3>
              <p className="text-xs text-slate-500">Post your fresh crop harvest to connect directly with wholesale clients.</p>
              <button
                onClick={() => setShowNewListingModal(true)}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold"
              >
                Post First Harvest
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: ORDERS / INQUIRIES WORKFLOW */}
      {activeViewMode === 'my-orders' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              {currentUser.role === 'farmer' ? 'Incoming Direct Client Orders' : 'My Direct Farm Orders (B2C)'}
            </h2>
            <div className="text-xs font-semibold text-slate-500">
              Total Deals: {myOrders.length}
            </div>
          </div>

          <div className="space-y-4">
            {myOrders.map((order) => {
              const isFarmer = currentUser.role === 'farmer';

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{order._id}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        order.status === 'accepted'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : order.status === 'dispatched'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : order.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        Status: {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Produce Details */}
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">Commodity & Quantity</div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{order.cropName}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        <span className="font-bold text-emerald-800">{order.quantityRequested} {order.unit}</span> @ ₹{order.pricePerUnit}/{order.unit}
                      </p>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        Total: ₹{order.totalAmount.toLocaleString()}
                      </div>
                    </div>

                    {/* Counterparty & Logistics */}
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">
                        {isFarmer ? 'Buyer Information' : 'Producer Farmer'}
                      </div>
                      <div className="text-sm font-bold text-slate-800 mt-1">
                        {isFarmer ? order.clientName : order.farmerName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {isFarmer ? order.clientCompany : `${order.farmerDistrict} Ayacut`}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isFarmer ? order.clientPhone : order.farmerPhone}</span>
                      </div>
                    </div>

                    {/* Savings & Terms */}
                    <div className="bg-emerald-50/60 rounded-lg p-3 border border-emerald-100 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Transit Route:</span>
                        <span className="font-medium text-slate-800">{order.distanceKm} km (Est. ₹{order.estimatedFreightInr})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Middleman Saved:</span>
                        <span className="font-bold text-emerald-700">₹{order.middlemanSavingsInr?.toLocaleString()}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-emerald-200/60">
                        <span className="font-medium">Terms: </span>
                        {order.paymentTerms}
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Message */}
                  {order.inquiryMessage && (
                    <div className="text-xs bg-slate-50 p-3 rounded-lg text-slate-700 italic border border-slate-100">
                      "{order.inquiryMessage}"
                    </div>
                  )}

                  {/* Workflow Status Actions (Farmer & Client Controls) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    {/* Status Step Indicators */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <span className={order.status === 'pending' ? 'font-bold text-slate-900' : 'text-emerald-700'}>
                        1. Inquiry Sent
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className={order.status === 'accepted' ? 'font-bold text-blue-700' : order.status === 'dispatched' || order.status === 'completed' ? 'text-emerald-700' : ''}>
                        2. Confirmed
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className={order.status === 'dispatched' ? 'font-bold text-amber-700' : order.status === 'completed' ? 'text-emerald-700' : ''}>
                        3. Dispatched
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className={order.status === 'completed' ? 'font-bold text-emerald-700' : ''}>
                        4. Completed
                      </span>
                    </div>

                    {/* Farmer Action Buttons */}
                    {isFarmer && (
                      <div className="flex items-center gap-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateOrderStatus(order._id, 'accepted')}
                              className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                            >
                              Accept Order Deal
                            </button>
                            <button
                              onClick={() => handleUpdateOrderStatus(order._id, 'cancelled')}
                              className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium border border-rose-200"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {order.status === 'accepted' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order._id, 'dispatched')}
                            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Mark Lorry Dispatched</span>
                          </button>
                        )}
                        {order.status === 'dispatched' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order._id, 'completed')}
                            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Confirm Delivery & Payment</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {myOrders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
              <Clock className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No active deal orders</h3>
              <p className="text-xs text-slate-500">
                {currentUser.role === 'farmer'
                  ? 'When commercial buyers send purchase requests for your harvests, they will appear here.'
                  : 'Browse the crop catalog and send a direct inquiry to start procuring from farmers.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: ADMIN DASHBOARD (State Regulator Mode) */}
      {activeViewMode === 'admin-dashboard' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-700" />
              <span>Tamil Nadu Agricultural Marketing Board (TNSAMB) B2C Oversight</span>
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real-time monitoring of direct farm-gate transactions across 38 Tamil Nadu districts. Facilitating direct farmer-to-client linkages with zero mandi broker deductions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Registered Farmers</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {users.filter((u) => u.role === 'farmer').length}
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">100% Aadhaar/Pattadhar verified</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Direct Clients & Buyers</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {users.filter((u) => u.role === 'client').length}
                </div>
                <div className="text-[11px] text-blue-700 mt-0.5">Verified Retail & Client Hubs</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Live Harvest Lots</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">{listings.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{totalVolumeQuintals} Quintals aggregate</div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <div className="text-xs text-emerald-800 font-medium">Total Broker Commission Saved</div>
                <div className="text-2xl font-bold text-emerald-900 mt-1">
                  ₹{totalMiddlemanSavedInr.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">+15% extra income to growers</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: POST NEW HARVEST LISTING (Farmer Mode) */}
      {showNewListingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#083B2B] text-white rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold">Post New Farm Harvest Lot</h3>
                <p className="text-xs text-emerald-200">Tamil Nadu Farmer Direct B2C Produce Listing</p>
              </div>
              <button
                onClick={() => setShowNewListingModal(false)}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Crop Name (English)</label>
                  <input
                    type="text"
                    required
                    value={newListingForm.cropName}
                    onChange={(e) => setNewListingForm({ ...newListingForm, cropName: e.target.value })}
                    placeholder="e.g. Samba Paddy (CR 1009 Sub-1)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">பயிர் பெயர் (தமிழ்)</label>
                  <input
                    type="text"
                    value={newListingForm.tamilName}
                    onChange={(e) => setNewListingForm({ ...newListingForm, tamilName: e.target.value })}
                    placeholder="e.g. சம்பா நெல் (சி.ஆர் 1009)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Commodity Category</label>
                  <select
                    value={newListingForm.category}
                    onChange={(e) => setNewListingForm({ ...newListingForm, category: e.target.value as CropCategory })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option value="Grains">Grains & Cereals</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Spices">Spices & Condiments</option>
                    <option value="Oilseeds">Oilseeds & Pulses</option>
                    <option value="Commercial">Commercial / Cash Crops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Variety / Strain</label>
                  <input
                    type="text"
                    value={newListingForm.variety}
                    onChange={(e) => setNewListingForm({ ...newListingForm, variety: e.target.value })}
                    placeholder="e.g. TNAU Hybrid / GI Tagged"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity Available</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      min={1}
                      value={newListingForm.quantityAvailable}
                      onChange={(e) => setNewListingForm({ ...newListingForm, quantityAvailable: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                    />
                    <select
                      value={newListingForm.unit}
                      onChange={(e) => setNewListingForm({ ...newListingForm, unit: e.target.value })}
                      className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Quintals">Quintals</option>
                      <option value="KGs">KGs</option>
                      <option value="Tonnes">Tonnes</option>
                      <option value="Bunches">Bunches</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Price per {newListingForm.unit} (₹)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newListingForm.pricePerUnit}
                    onChange={(e) => setNewListingForm({ ...newListingForm, pricePerUnit: Number(e.target.value) })}
                    placeholder="e.g. 2400"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                  <select
                    value={newListingForm.district}
                    onChange={(e) => setNewListingForm({ ...newListingForm, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Thanjavur">Thanjavur</option>
                    <option value="Perambalur">Perambalur</option>
                    <option value="Erode">Erode</option>
                    <option value="Theni">Theni</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Salem">Salem</option>
                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                    <option value="Cuddalore">Cuddalore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Village / Ayacut Location</label>
                  <input
                    type="text"
                    value={newListingForm.villageLocation}
                    onChange={(e) => setNewListingForm({ ...newListingForm, villageLocation: e.target.value })}
                    placeholder="e.g. Papanasam Taluk, Cauvery Delta"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newListingForm.organicCertified}
                    onChange={(e) => setNewListingForm({ ...newListingForm, organicCertified: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>100% Certified Organic Harvest</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Harvest Description & Quality Notes</label>
                <textarea
                  rows={2}
                  value={newListingForm.description}
                  onChange={(e) => setNewListingForm({ ...newListingForm, description: e.target.value })}
                  placeholder="Describe moisture level, head rice recovery, packing type, or pickup readiness..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewListingModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#083B2B] hover:bg-emerald-800 text-white rounded-lg shadow-sm transition-colors"
                >
                  Publish Harvest Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SEND DIRECT PURCHASE INQUIRY (Client to Farmer) */}
      {selectedListingForOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-blue-900 text-white rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold">Direct Farmer-to-Client Purchase Inquiry (B2C)</h3>
                <p className="text-xs text-blue-200">
                  Client: {currentUser.name} ({currentUser.businessType})
                </p>
              </div>
              <button
                onClick={() => setSelectedListingForOrder(null)}
                className="text-blue-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
              {/* Selected Commodity Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">{selectedListingForOrder.cropName}</span>
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {selectedListingForOrder.district}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Producer: <strong>{selectedListingForOrder.farmerName}</strong></span>
                  <span>Listed Rate: <strong>₹{selectedListingForOrder.pricePerUnit} / {selectedListingForOrder.unit}</strong></span>
                </div>
              </div>

              {/* Inquiry Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Requested Quantity ({selectedListingForOrder.unit})
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={selectedListingForOrder.quantityAvailable}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Available in stock: {selectedListingForOrder.quantityAvailable} {selectedListingForOrder.unit}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Offer Price per {selectedListingForOrder.unit} (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={orderOfferPrice}
                    onChange={(e) => setOrderOfferPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Total Estimated: ₹{(orderQuantity * orderOfferPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* AI Deal Arbitrator Trigger */}
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-900">AI Deal Negotiator & Freight Estimator</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRunAiDealAssist}
                    disabled={aiDealLoading}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    {aiDealLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Calculator className="w-3 h-3" />}
                    <span>Evaluate Fair Deal</span>
                  </button>
                </div>

                {aiDealResult && (
                  <div className="text-xs space-y-2 pt-2 border-t border-emerald-200 text-emerald-950">
                    <div className="flex justify-between font-bold">
                      <span>AI Suggested Fair Price:</span>
                      <span className="text-emerald-800">₹{aiDealResult.recommendedFairPrice} / {selectedListingForOrder.unit}</span>
                    </div>
                    <div className="text-[11px] text-emerald-800">
                      <strong>Verdict:</strong> {aiDealResult.priceVerdict} ({aiDealResult.tamilVerdict})
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="bg-white/80 p-2 rounded border border-emerald-200">
                        <span className="text-slate-500 block">Est. Road Freight:</span>
                        <span className="font-bold text-slate-800">₹{aiDealResult.freightCostEstimateInr?.toLocaleString()} ({aiDealResult.estimatedDistanceKm} km)</span>
                      </div>
                      <div className="bg-white/80 p-2 rounded border border-emerald-200">
                        <span className="text-slate-500 block">Middleman Fee Saved:</span>
                        <span className="font-bold text-emerald-700">₹{aiDealResult.totalMiddlemanCommissionEliminatedInr?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-600 italic">
                      {aiDealResult.transitRouteInfo}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Destination & Warehouse Address
                </label>
                <input
                  type="text"
                  required
                  value={orderDeliveryAddress}
                  onChange={(e) => setOrderDeliveryAddress(e.target.value)}
                  placeholder="e.g. Mill Facility, Ambattur SIDCO, Chennai"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment & Inspection Terms
                </label>
                <select
                  value={orderPaymentTerms}
                  onChange={(e) => setOrderPaymentTerms(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="50% Advance DBT + 50% on Delivery Inspection">50% Advance DBT + 50% on Delivery Inspection</option>
                  <option value="100% Instant IMPS on Weighbridge Unloading">100% Instant IMPS on Weighbridge Unloading</option>
                  <option value="Direct Verified Escrow via TNSAMB">Direct Verified Escrow via TNSAMB</option>
                  <option value="Letter of Credit (For Export Consignments)">Letter of Credit (For Export Consignments)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Direct Message / Truck Loading Instructions
                </label>
                <textarea
                  rows={2}
                  value={orderInquiryMessage}
                  onChange={(e) => setOrderInquiryMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedListingForOrder(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-sm transition-colors"
                >
                  Confirm & Send Direct B2C Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
