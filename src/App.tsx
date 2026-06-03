import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet } from
'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CasesList } from './pages/CasesList';
import { CaseDetail } from './pages/CaseDetail';
import { HearingsList } from './pages/HearingsList';
import { HearingDetail } from './pages/HearingDetail';
import { SearchResults } from './pages/SearchResults';
import { CourtLayout } from './components/court/CourtLayout';
import { CourtLogin } from './pages/court/CourtLogin';
import { CourtDashboard } from './pages/court/CourtDashboard';
import { CourtCasesList } from './pages/court/CourtCasesList';
import { CourtCaseCreate } from './pages/court/CourtCaseCreate';
import { CourtCaseDetail } from './pages/court/CourtCaseDetail';
import { CourtHearingsList } from './pages/court/CourtHearingsList';
import { CourtHearingDetail } from './pages/court/CourtHearingDetail';
import { CourtParticipants } from './pages/court/CourtParticipants';
import { CourtParticipantProfile } from './pages/court/CourtParticipantProfile';
import { CourtLawyersJudges } from './pages/court/CourtLawyersJudges';
import { CourtDispositions } from './pages/court/CourtDispositions';
import { CourtGreffiers } from './pages/court/CourtGreffiers';
import { CourtGreffierProfile } from './pages/court/CourtGreffierProfile';
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function PublicLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 font-sans text-slate-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>);

}
export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Portal */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cases" element={<CasesList />} />
          <Route path="/cases/:id" element={<CaseDetail />} />
          <Route path="/hearings" element={<HearingsList />} />
          <Route path="/hearings/:id" element={<HearingDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>

        {/* Court Panel — authenticated */}
        <Route path="/court/login" element={<CourtLogin />} />
        <Route path="/court" element={<CourtLayout />}>
          <Route index element={<CourtDashboard />} />
          <Route path="cases" element={<CourtCasesList />} />
          <Route path="cases/new" element={<CourtCaseCreate />} />
          <Route path="cases/:id" element={<CourtCaseDetail />} />
          <Route path="hearings" element={<CourtHearingsList />} />
          <Route path="hearings/:id" element={<CourtHearingDetail />} />
          <Route path="participants" element={<CourtParticipants />} />
          <Route
            path="participants/:id"
            element={<CourtParticipantProfile />} />
          
          <Route path="lawyers-judges" element={<CourtLawyersJudges />} />
          <Route path="dispositions" element={<CourtDispositions />} />
          <Route path="greffiers" element={<CourtGreffiers />} />
          <Route path="greffiers/:id" element={<CourtGreffierProfile />} />
          {/* Documents & Dockets are surfaced within Case Detail tabs */}
          <Route path="documents" element={<CourtCasesList />} />
          <Route path="dockets" element={<CourtCasesList />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}