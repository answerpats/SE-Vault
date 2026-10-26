import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import useSiteSettings from '../hooks/useSiteSettings';

export default function MainLayout() {
  const { settings } = useSiteSettings();
  const hasAnnouncement = settings.announcementEnabled && settings.announcementText;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col w-full max-w-full overflow-x-hidden">
      <TopBar />
      <Navbar />
      <main className={`flex-grow w-full max-w-full overflow-x-hidden pt-28 ${hasAnnouncement ? 'sm:pt-[180px] lg:pt-[196px]' : 'sm:pt-[148px] lg:pt-[164px]'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
