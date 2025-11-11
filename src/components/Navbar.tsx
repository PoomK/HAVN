import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import whoofIcon from "@/assets/dog-icon.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Why Havn", href: "#problem" },
    { label: "how it works", href: "#solution" },
    { label: "Pricing", href: "#pricing" },
    { label: "Pre-order now", href: "#preorder", isButton: true },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // account for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="w-full bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-2 font-semibold text-xl tracking-tight"
            >
              {/* <img src={whoofIcon} alt="HAVN logo" className="h-6 w-6" /> */}
              <span>HAVN</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10 group">
              {navLinks
                .filter((link) => !link.isButton)
                .map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="
                      relative text-[13px] font-semibold tracking-[0.18em] uppercase
                      text-white transition-all duration-200
                      group-hover:text-white/50
                      hover:text-white
                      group-hover:hover:text-white
                      after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                      after:w-0 after:bg-white after:transition-all after:duration-300
                      hover:after:w-full
                    "
                  >
                    {link.label}
                  </button>
                ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <Button
                onClick={() => scrollToSection('#preorder')}
                className="rounded-full bg-white text-black hover:bg-white/90 text-[11px] font-semibold tracking-[0.16em] px-6 py-2 uppercase"
              >
                Pre-order now
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] sm:w-[360px] bg-black text-white border-l border-white/10"
              >
                <div className="mt-6 flex flex-col gap-6">
                  {/* Mobile logo */}
                  <button
                    onClick={() => scrollToSection('#home')}
                    className="flex items-center gap-2 font-semibold text-lg tracking-tight"
                  >
                    <img src={whoofIcon} alt="HAVN logo" className="h-6 w-6" />
                    <span>HAVN</span>
                  </button>

                  {/* Mobile links */}
                  <div className="flex flex-col gap-4">
                    {navLinks
                      .filter((link) => !link.isButton)
                      .map((link) => (
                        <button
                          key={link.href}
                          onClick={() => scrollToSection(link.href)}
                          className="text-sm font-semibold tracking-[0.16em] uppercase text-white/80 hover:text-white text-left"
                        >
                          {link.label}
                        </button>
                      ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-4">
                    <Button
                      onClick={() => scrollToSection('#preorder')}
                      className="w-full rounded-full bg-white text-black hover:bg-white/90 text-[11px] font-semibold tracking-[0.16em] uppercase py-3"
                    >
                      Pre-order now
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
