import Services from "../Services";

export default function ServicesExample() {
  return <Services onServiceClick={(id) => console.log("Service clicked:", id)} />;
}
