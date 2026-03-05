import CartItem from "./CartItem";
import CartItems from '../../assets/img/Cart.png'
import FullStar from "../../assets/icons/filled-star-Icon.svg"
import HalfStar from "../../assets/icons/half-filled-Icon.svg"
function CartSummary(prop) {
  {/* Call should be like this 
    <CartSummary name="RGB liquid CPU Cooler" prev_price="170$" new_price="160$"/>*/}
  return (<div>
    <CartItem img={CartItems}/>
      <p>{prop.name}</p> 
      <span className="text-[rgb(var(--color-primary-dark))] gap-3">{prop.new_price}</span> <span style={{ textDecoration: 'line-through' }}>{prop.prev_price}</span>
      <div className="px-0.5 flex flex-row">
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={HalfStar}/>
      <span className="text-[rgb(var(--color-text-light))] text-sm m-2">(65)</span> {/*Also a prop to be added later for number of reviewers once there is data */}
      </div>
    </div>);
}

export default CartSummary;
