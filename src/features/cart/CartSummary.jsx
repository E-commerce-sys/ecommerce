import CartItem from "./CartItem";
import CartItems from '../../assets/img/Cart.png'
import FullStar from "../../assets/icons/filled-star-Icon.svg"
import HalfStar from "../../assets/icons/half-filled-Icon.svg"
function CartSummary(prop) {
  {/* Call should be like this 
    <CartSummary name="RGB liquid CPU Cooler" prev_price="170$" new_price="160$"/>*/}
  return (<div>
    <CartItem img={CartItems}/>
      <p className="text-[16px] font-medium">{prop.name}</p> 
      <div className="flex flex-row gap-3">
      <span className="text-[rgb(var(--color-primary-main))] gap-3 text-[16px] font-medium">{prop.new_price}</span> 
      <span className="line-through text-[16px] font-medium text-[rgb(var(--color-text-main-1))]">{prop.prev_price}</span>
      </div>
      <div className="px-0.5 flex flex-row">
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={FullStar}/>
      <img src={HalfStar}/>
      <span className="text-[14px] font-semibold text-[rgb(var(--color-text-main-1))] text-sm m-2">(65)</span> {/*Also a prop to be added later for number of reviewers once there is data */}
      </div>
    </div>);
}

export default CartSummary;
