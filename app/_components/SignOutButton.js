import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/server";

function SignOutButton({ onSignOut }) {
  const handleSignOut = () => {
    // Your sign out logic here
    if (onSignOut) {
      onSignOut();
    }
  };
  return (
    <form action={signOutAction}>
      <button
        onClick={handleSignOut}
        className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
      >
        <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
