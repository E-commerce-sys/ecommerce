/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import RelatedItems from "./RelatedItems";
import ProductShowcase from "./ProductShowcase";

function ProductDelail() {
  return (
    <div className="mt-20 md:mt-17">
      <ProductShowcase />
      <RelatedItems />
    </div>
  );
}

export default ProductDelail;
