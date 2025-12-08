import Products from "../Products";

export default function ProductsExample() {
  return <Products onBuyNow={(id) => console.log("Buy product:", id)} />;
}
