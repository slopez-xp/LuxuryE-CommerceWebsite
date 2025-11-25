import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Homepage } from './components/Homepage';
import { CollectionsPage } from './components/CollectionsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import { HeritagePage } from './components/HeritagePage';
import { Boutiques } from './components/Boutiques';
import { Support } from './components/Support';
import { PageTransition } from './components/PageTransition';
import AuthModal from './components/AuthModal';
import { CheckoutPage } from './pages/CheckoutPage';

type Page = 'home' | 'collections' | 'product' | 'heritage' | 'boutiques' | 'support' | 'admin' | 'checkout';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [productId, setProductId] = useState<string>('datejust');
  const [navHeight, setNavHeight] = useState<number>(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById('site-nav');
      setNavHeight(el ? el.offsetHeight : 0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, prodId?: string) => {
    setCurrentPage(page as Page);
    if (prodId) {
      setProductId(prodId);
    }
  };

  const pageComponent = (() => {
    if (currentPage === 'home') return <Homepage onNavigate={handleNavigate} navHeight={navHeight} />;
    if (currentPage === 'collections') return <CollectionsPage onNavigate={handleNavigate} />;
    if (currentPage === 'product') return <ProductDetailPage productId={productId} onNavigate={handleNavigate} />;
    if (currentPage === 'heritage') return <HeritagePage />;
    if (currentPage === 'boutiques') return <Boutiques onNavigate={handleNavigate} />;
    if (currentPage === 'support') return <Support onNavigate={handleNavigate} />;
    if (currentPage === 'admin') return <AdminDashboard onNavigate={handleNavigate} />;
    if (currentPage === 'checkout') return <CheckoutPage onNavigate={handleNavigate} />;
    return null;
  })();

  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-black text-white">
        <PageTransition pageKey={currentPage} duration={300}>
          {pageComponent}
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onShowAuthModal={() => setShowAuthModal(true)} 
      />

      <main style={{ paddingTop: navHeight }} className="pt-0">
        <PageTransition pageKey={currentPage} duration={300}>
          {pageComponent}
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}