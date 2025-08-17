import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/navbar_main';
import Footer from '../components/footer/mainfooter';


const MainLayout = () => {

  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default MainLayout