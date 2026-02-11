import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

function Layout() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <>
      <Header />
      {!isHomepage && <Breadcrumb />}
      <main className={isHomepage ? 'hq-main hq-main--homepage' : 'hq-main'}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
