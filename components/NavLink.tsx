import Link from "next/link";

export const navLinks = [
  { href: "/#projects", label: "Work", id: "projects" },
  { href: "/#bugs", label: "Bugs", id: "bugs" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#skills", label: "Skills", id: "skills" },
  { href: "/resume", label: "Resume", id: "resume" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

/** Section links are plain anchors (the browser and Lenis scroll them); page links go through the router. */
export function NavLink(props: React.ComponentProps<"a"> & { href: string }) {
  return props.href.includes("#") ? <a {...props} /> : <Link {...props} />;
}
