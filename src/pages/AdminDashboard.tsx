import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Package, MapPin, TrendingUp, Users, Eye, Settings, BarChart3 } from 'lucide-react';
import InventoryTable from '../components/InventoryTable';
import BoutiquesTable from '../components/BoutiquesTable';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'inventory' | 'boutiques'>('inventory');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      onNavigate('home');
    }
  }, [isAdmin, onNavigate]);

  if (!isAdmin) return null;

  const stats = [
    { icon: Package, label: 'Total Products', value: '142', change: '+12%', trend: 'up' },
    { icon: MapPin, label: 'Boutiques', value: '48', change: '+3', trend: 'up' },
    { icon: TrendingUp, label: 'Revenue', value: '$2.4M', change: '+18%', trend: 'up' },
    { icon: Users, label: 'Active Users', value: '8,432', change: '+24%', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background Overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#0a0a0a]" />
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#a37e2c] blur-sm opacity-10"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Luxury Header with Blur */}
      <header
        className="sticky top-0 z-50 border-b border-[#a37e2c]/10 transition-all duration-300"
        style={{
          background: scrollY > 20 ? 'rgba(10, 10, 10, 0.8)' : 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: scrollY > 20 ? '0 8px 32px rgba(163, 126, 44, 0.1)' : 'none',
        }}
      >
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Left Side: Logo & Title */}
            <div className="flex items-center gap-6">
              {/* Animated Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#a37e2c]/20 blur-xl rounded-full animate-pulse" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#a37e2c] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(163,126,44,0.3)]">
                  <Clock size={28} className="text-black" />
                </div>
              </div>

              {/* Title Section */}
              <div>
                <h1
                  className="text-white mb-1"
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '2rem',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                  }}
                >
                  Administration
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-[#a37e2c] to-transparent" />
                  <span
                    className="text-[#a37e2c] tracking-[0.2em]"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    MANAGEMENT PORTAL
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-4">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center gap-6 px-6 py-3 bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#a37e2c]/20 rounded-full">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-[#a37e2c]" />
                  <span className="text-white text-sm font-semibold">142</span>
                  <span className="text-[#666] text-xs">Products</span>
                </div>
                <div className="h-4 w-px bg-[#a37e2c]/20" />
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#a37e2c]" />
                  <span className="text-white text-sm font-semibold">48</span>
                  <span className="text-[#666] text-xs">Locations</span>
                </div>
              </div>

              {/* Settings Button */}
              <button className="p-3 bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#a37e2c]/20 rounded-full hover:border-[#a37e2c]/60 hover:bg-[#a37e2c]/10 transition-all group">
                <Settings size={20} className="text-[#a37e2c] group-hover:rotate-90 transition-transform duration-500" />
              </button>

              {/* Return Button */}
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 px-6 py-3 bg-[#a37e2c]/10 backdrop-blur-xl border border-[#a37e2c]/30 text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-all duration-300 rounded-full group"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                RETURN TO SITE
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-[1800px] mx-auto px-8 py-12">
        {/* Stats Grid with Glass Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-6 bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#a37e2c]/20 rounded-xl hover:border-[#a37e2c]/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(163,126,44,0.15)] overflow-hidden"
                style={{
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#a37e2c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#a37e2c]/10 rounded-full flex items-center justify-center group-hover:bg-[#a37e2c]/20 transition-all duration-300 group-hover:scale-110">
                        <Icon className="text-[#a37e2c]" size={24} />
                      </div>
                    </div>
                    <p
                      className="text-[#999999] mb-2 tracking-[0.1em]"
                      style={{
                        fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="text-white mb-2"
                      style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: '2rem',
                        fontWeight: 400,
                      }}
                    >
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4ade80] text-sm font-semibold">{stat.change}</span>
                      <span className="text-[#666] text-xs">vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Dashboard Card */}
        <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#a37e2c]/20 rounded-2xl p-8 shadow-[0_20px_80px_rgba(163,126,44,0.1)]">
          {/* Tabs Navigation */}
          <div className="mb-10">
            <div className="flex items-center gap-1 p-1 bg-black/40 backdrop-blur-md border border-[#a37e2c]/10 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`relative px-8 py-4 rounded-lg transition-all duration-300 ${
                  activeTab === 'inventory'
                    ? 'bg-gradient-to-br from-[#d4af37] to-[#a37e2c] text-black shadow-[0_8px_30px_rgba(163,126,44,0.4)]'
                    : 'text-[#999999] hover:text-white'
                }`}
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                }}
              >
                <Package size={18} className="inline-block mr-2 mb-1" />
                INVENTORY
              </button>
              <button
                onClick={() => setActiveTab('boutiques')}
                className={`relative px-8 py-4 rounded-lg transition-all duration-300 ${
                  activeTab === 'boutiques'
                    ? 'bg-gradient-to-br from-[#d4af37] to-[#a37e2c] text-black shadow-[0_8px_30px_rgba(163,126,44,0.4)]'
                    : 'text-[#999999] hover:text-white'
                }`}
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                }}
              >
                <MapPin size={18} className="inline-block mr-2 mb-1" />
                BOUTIQUES
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fadeIn">
            {activeTab === 'inventory' ? (
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-8 w-1 bg-gradient-to-b from-[#a37e2c] to-transparent" />
                    <h2
                      className="text-white"
                      style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: '2rem',
                        fontWeight: 400,
                      }}
                    >
                      Product Catalog
                    </h2>
                  </div>
                  <p
                    className="text-[#999999] ml-8"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Manage your exclusive timepiece collection. Update pricing, inventory levels, and product specifications.
                  </p>
                </div>

                {/* Table Wrapper with luxury styling */}
                <div className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-[#a37e2c]/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  {/* Your actual InventoryTable component with full functionality */}
                  <InventoryTable />
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-8 w-1 bg-gradient-to-b from-[#a37e2c] to-transparent" />
                    <h2
                      className="text-white"
                      style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: '2rem',
                        fontWeight: 400,
                      }}
                    >
                      Global Network
                    </h2>
                  </div>
                  <p
                    className="text-[#999999] ml-8"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Oversee your worldwide boutique locations. Update addresses, contact information, and operating hours.
                  </p>
                </div>

                {/* Enhanced Action Bar for Boutiques */}
                <div className="mb-6 p-6 bg-gradient-to-r from-[#0a0a0a]/80 to-[#0a0a0a]/60 backdrop-blur-xl border border-[#a37e2c]/20 rounded-xl shadow-[0_8px_32px_rgba(163,126,44,0.1)]">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#a37e2c] text-black hover:from-[#e5c158] hover:to-[#b8883d] transition-all rounded-lg font-semibold text-sm shadow-[0_4px_20px_rgba(163,126,44,0.3)] hover:shadow-[0_6px_30px_rgba(163,126,44,0.5)] hover:-translate-y-0.5">
                        <span className="text-lg">+</span>
                        ADD NEW LOCATION
                      </button>
                      <button className="flex items-center gap-2 px-5 py-3 border border-[#a37e2c]/40 text-[#a37e2c] hover:bg-[#a37e2c]/10 hover:border-[#a37e2c] transition-all rounded-lg text-sm font-medium backdrop-blur-sm">
                        <MapPin size={16} />
                        VIEW ON MAP
                      </button>
                      <button className="flex items-center gap-2 px-5 py-3 border border-[#a37e2c]/40 text-[#a37e2c] hover:bg-[#a37e2c]/10 hover:border-[#a37e2c] transition-all rounded-lg text-sm font-medium backdrop-blur-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        PERFORMANCE
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a37e2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search locations..."
                          className="pl-11 pr-4 py-3 w-64 bg-black/60 backdrop-blur-md border border-[#a37e2c]/30 text-white placeholder-[#666] rounded-lg focus:outline-none focus:border-[#a37e2c] focus:ring-2 focus:ring-[#a37e2c]/20 transition-all"
                          style={{ fontFamily: '-apple-system, Helvetica Neue, sans-serif', fontSize: '0.875rem' }}
                        />
                      </div>
                      <select className="px-4 py-3 bg-black/60 backdrop-blur-md border border-[#a37e2c]/30 text-white rounded-lg focus:outline-none focus:border-[#a37e2c] focus:ring-2 focus:ring-[#a37e2c]/20 transition-all">
                        <option>All Regions</option>
                        <option>Europe</option>
                        <option>Americas</option>
                        <option>Asia Pacific</option>
                        <option>Middle East</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Table Wrapper with luxury styling */}
                <div className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-[#a37e2c]/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  {/* Your actual BoutiquesTable component with full functionality */}
                  <BoutiquesTable />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default AdminDashboard;