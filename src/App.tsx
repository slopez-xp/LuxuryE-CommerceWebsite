import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Homepage } from './components/Homepage';
import { CollectionsPage } from './components/CollectionsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { HeritagePage } from './components/HeritagePage';
import { Boutiques } from './components/Boutiques';
import { Support } from './components/Support';
import { PageTransition } from './components/PageTransition';

type Page = 'home' | 'collections' | 'product' | 'heritage' | 'boutiques' | 'support';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [productId, setProductId] = useState<string>('datejust');
  // measure navbar height and use it as top padding so there's no hardcoded gap
  const [navHeight, setNavHeight] = useState<number>(0);
  useEffect(() => {
    const update = () => {
      const el = document.getElementById('site-nav');
      setNavHeight(el ? el.offsetHeight : 0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, prodId?: string) => {
    setCurrentPage(page as Page);
    if (prodId) {
      setProductId(prodId);
    }
  };

  // compute the page component once
  const pageComponent = (() => {
    if (currentPage === 'home') return <Homepage onNavigate={handleNavigate} navHeight={navHeight} />;
    if (currentPage === 'collections') return <CollectionsPage onNavigate={handleNavigate} />;
    if (currentPage === 'product') return <ProductDetailPage productId={productId} onNavigate={handleNavigate} />;
    if (currentPage === 'heritage') return <HeritagePage />;
    if (currentPage === 'boutiques') return <Boutiques onNavigate={handleNavigate} />;
    if (currentPage === 'support') return <Support onNavigate={handleNavigate} />;
    return null;
  })();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {/* single transition wrapper handles enter/exit between pages */}
      <main style={{ paddingTop: navHeight }} className="pt-0">
        <PageTransition pageKey={currentPage} duration={300}>
          {pageComponent}
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
