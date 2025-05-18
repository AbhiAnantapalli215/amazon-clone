import logo from "../images/logo.png";
import cart from "../images/cart.png";
import SearchIcon from '@mui/icons-material/Search';
function Header() {
  const name=(localStorage.getItem('name')==='null')?"sign in":localStorage.getItem('name');
  return (
    <div className="header">
      <div className="primary-navbar">
        <div className="logo-container">
          <a href="/"><img src={logo} alt="logo" className="logo" /></a>
        </div>
        <div className="address-container">
          <p className="delivery-text">Delivery to Hyderabad,500555</p>
          <p className="update-address">Update Address</p>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search Amazon.in" className="search-bar" />
          <button className="btn btn-warning rounded-end-3 rounded-start-0"><SearchIcon/></button>
        </div>
        <a href="/Accounts">
          <div className="account-container">
            <p className="greeting">Hello ,{name}</p>
            <p className="account-link">Accounts & Lists</p>
          </div>
        </a>
        <div className="orders-container">
          <p className="returns">Returns</p>
          <p className="orders">& Orders</p>
        </div>
        <div className="cart-container">
          <a href="/cart"><img src={cart} alt="cart" className="cart-icon" /></a>
          <p className="cart">cart</p>
        </div>
      </div>
    </div>
  );
}

export default Header;