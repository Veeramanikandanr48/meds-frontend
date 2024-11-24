import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Layout = (props) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;