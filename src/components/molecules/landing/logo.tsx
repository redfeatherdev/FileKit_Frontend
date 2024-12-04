import { Link } from "react-router-dom"

import { useWindowScroll } from "@/hooks/useWindowScroll";

const Logo = () => {
  const windowScroll = useWindowScroll();
  const isScrolled = windowScroll > 10;

  return (
    <Link
      aria-label="Filekit Logo"
      to="/"
      className="relative inline-flex max-h-full text-3xl font-semibold shrink-0 outline-none focus-visible:opacity-90"
    >
      <span className={`dark:text-steel-100 ${isScrolled ? 'text-[#141D25]' : 'text-white'}`}>
        FileKit
      </span>
    </Link >
  )
}

export default Logo;