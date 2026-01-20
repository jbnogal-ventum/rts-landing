// hooks/useSmoothScroll.js
import { useLenis } from '@studio-freight/react-lenis';
import { useEffect } from 'react';

export const useSmoothScroll = (onScroll) => {
  const lenis = useLenis({
    duration: 1.2,
    smoothWheel: true,
  });

  useEffect(() => {
    if (!lenis) return;
    
    const handleScroll = ({ scroll }) => {
      onScroll?.(scroll);
      ScrollTrigger.update();
    };
    
    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [lenis, onScroll]);
};

// hooks/useNavTheme.js
export const useNavTheme = (pathname) => {
  const [navMode, setNavMode] = useState('dark');
  
  useEffect(() => {
    const isHome = pathname === '/';
    setNavMode(isHome ? 'light' : 'dark');
  }, [pathname]);
  
  return navMode;
};

// Componente App simplificado
export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const navMode = useNavTheme(location.pathname);
  
  useSmoothScroll((scroll) => {
    // Lógica de scroll simplificada
  });
  
  if (isLoading) return <Loader onComplete={() => setIsLoading(false)} />;
  
  return (
    <Lenis root>
      <ThemeProvider navMode={navMode}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hub" element={<HubPage />} />
          {/* ... */}
        </Routes>
      </ThemeProvider>
    </Lenis>
  );
}