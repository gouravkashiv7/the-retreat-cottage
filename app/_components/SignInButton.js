import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="w-full group relative flex items-center justify-center gap-4 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 border border-white/80">
        {/* Subtle hover sheen */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-xl" />

        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="22"
          width="22"
          className="relative z-10"
        />
        <span className="relative z-10">Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
