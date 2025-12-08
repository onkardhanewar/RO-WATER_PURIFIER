import About from "../About";

export default function AboutExample() {
  return <About onContactClick={() => console.log("Contact clicked")} />;
}
