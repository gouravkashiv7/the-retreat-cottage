import { auth } from "../_lib/auth";
import HeaderClient from "./HeaderClient";

async function Header() {
  const session = await auth();
  return <HeaderClient session={session} />;
}

export default Header;
