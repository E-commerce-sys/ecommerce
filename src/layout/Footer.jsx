import Facebook from '../assets/icons/Icon-Facebook.svg'
import Instagram from '../assets/icons/Icon-instagram.svg'
import Linkedin from '../assets/icons/Icon-Linkedin.svg'
import Twitter from '../assets/icons/Icon-Twitter.svg'
import GooglePlay from '../assets/img/Google_Play_Store_badge_EN.svg'
import AppleStore from '../assets/img/Download_on_the_App_Store_Badge.svg'
import { Link } from "react-router-dom"

function Footer() {
  return (<footer className="bg-[rgb(var(--color-bg-dark))] text-white py-28.5  h-82.75 gap-2.5 flex items-center justify-center">
      
      <div className="gap-30 flex flex-row justify-center content-baseline h-fit" >
            <div className=" flex flex-col gap-4 ">
            <h3 className="font-bold text-lg ">Exclusive</h3>
            <p className="font-semibold text-gray-400">Subscribe</p>
            <p className="text-gray-400 ">Get 10% off your first order</p>
            <Link to='/about' className="text-gray-400  hover:text-white transition-colors">About us</Link>
            </div>


            <div className=" flex flex-col gap-4 ">
            <h3 className="font-semibold text-lg">Account</h3>
            <p><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Login / Register</Link></p>
            <p><Link to="/cart" className="text-gray-400 hover:text-white transition-colors">Cart</Link></p>
            <p><Link to="/wishlist" className="text-gray-400 hover:text-white transition-colors">Wishlist</Link></p>
            <p><Link to="/" className="text-gray-400 hover:text-white transition-colors">Shop</Link></p>
            </div>
            <div className=" flex flex-col gap-4 ">
            <h3 className="font-semibold text-lg ">Quick Link</h3>
            <p><a className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></p>
            <p><a className="text-gray-400 hover:text-white transition-colors">Terms Of Use</a></p>
            <p><a className="text-gray-400 hover:text-white transition-colors">FAQ</a></p>
            <p><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></p>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">Download App</h3>
          <p className="text-gray-400 text-xs mb-3">Save $3 with App New User Only</p>
          <div className="flex gap-2 mb-4">
            <div className="bg-white p-1 rounded w-16 h-16" /> 
            <div className="flex flex-col gap-2">
              <img src={GooglePlay} className="h-7" />
              <img src={AppleStore} className="h-7" />
            </div>
          </div>
            
            <div className=" flex flex-row gap-4 ">
            <img src={Facebook} size={18} className="hover:text-white cursor-pointer transition-colors" />
            <img src={Twitter} size={18} className="hover:text-white cursor-pointer transition-colors" />
            <img src={Instagram} size={18} className="hover:text-white cursor-pointer transition-colors" />
            <img src={Linkedin} size={18} className="hover:text-white cursor-pointer transition-colors" />
            </div>
            </div>
      </div>
    </footer>);
}

export default Footer;
