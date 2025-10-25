import Navigation from "@/app/_components/navigation/Navigation";
import Logo from "@/app/_components/Logo";
import { auth } from "../_lib/auth";

async function Header() {
  const session = await auth();
  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-primary-950/95 backdrop-blur-sm border-b border-primary-800 px-4 py-3 z-50 md:hidden">
        {" "}
        <div className="flex justify-between items-center w-full">
          <Logo />
          <Navigation />
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:block border-b border-primary-900 px-8 py-6 bg-primary-950 overflow-hidden">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <Logo />
          <Navigation session={session} />
        </div>
      </header>

      {/* Mobile Spacer */}
      <div className="h-16 md:h-0"></div>
    </>
  );
}
export default Header;
