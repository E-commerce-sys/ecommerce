import CartItem from "./CartItem";
import CartItems from '../../assets/img/Cart.png'
import FullStar from "../../assets/icons/filled-star-Icon.svg"
import HalfStar from "../../assets/icons/half-filled-Icon.svg"
function CartSummary() {
  return (<div>
    <CartItem img={CartItems}/>
      <p>RGB liquid CPU Cooler</p>  {/*This to be replaced with a prop for product name*/}
      <span className="text-[rgb(var(--color-primary-dark))] gap-3">$160</span> <span style={{ textDecoration: 'line-through' }}>$170</span>
      <div className="px-0.5 flex flex-row">
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={HalfStar}/>
      <span className="text-[rgb(var(--color-text-light))] text-sm m-2">(65)</span> {/*Also a prop to be added later for number of reviewers */}
      </div>
    </div>);
}

export default CartSummary;
