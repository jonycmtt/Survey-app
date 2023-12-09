import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <div className='flex items-center'>
          <img src={logo} alt="" />
          <span className='text-2xl font-bold'>FIMRO</span>
          </div>
          <p>
            FIMRO Industries Ltd.
            <br />
            Providing reliable tech since 2023
          </p>
        </aside>
        <nav>
          <header className="footer-title">Survey</header>
          <a className="link link-hover">Technology</a>
          <a className="link link-hover">Science</a>
          <a className="link link-hover">Business</a>
          <a className="link link-hover">Playing</a>
        </nav>
        <nav>
          <header className="footer-title">Pages</header>
          <Link to='/' className="link link-hover">Home</Link>
          <Link to='/survey' className="link link-hover">Survey</Link>
          <Link to='/proUser' className="link link-hover">Pro Users</Link>
          <Link to='/contact' className="link link-hover">Contact us</Link>
          <Link to='/about' className="link link-hover">About us</Link>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
