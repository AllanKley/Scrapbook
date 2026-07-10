import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { PageShell } from './components/layout/PageShell';
import { ChangelogDetail } from './pages/ChangelogDetail';
import { DevlogEntryDetail } from './pages/DevlogEntryDetail';
import { DevlogIndex } from './pages/DevlogIndex';
import { Home } from './pages/Home';
import { Top10Detail } from './pages/Top10Detail';
import { Top10Index } from './pages/Top10Index';
import { ThemeProvider } from './theme/ThemeProvider';

// import.meta.env.DEV is a compile-time constant Vite replaces with `false`
// in production builds, so Rollup dead-code-eliminates this entire branch
// (and the ./admin chunk it references) out of the shipped bundle.
const AdminApp = import.meta.env.DEV ? lazy(() => import('./admin/AdminApp').then((m) => ({ default: m.AdminApp }))) : null;

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Header />
        <PageShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top10" element={<Top10Index />} />
            <Route path="/top10/:slug" element={<Top10Detail />} />
            <Route path="/devlog" element={<DevlogIndex />} />
            <Route path="/devlog/entry/:slug" element={<DevlogEntryDetail />} />
            <Route path="/devlog/changelog/:slug" element={<ChangelogDetail />} />
            {AdminApp && (
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<p>loading admin…</p>}>
                    <AdminApp />
                  </Suspense>
                }
              />
            )}
          </Routes>
        </PageShell>
        <Footer />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
