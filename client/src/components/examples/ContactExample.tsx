import Contact from "../Contact";

export default function ContactExample() {
  return <Contact onSubmit={(data) => console.log("Form submitted:", data)} />;
}
