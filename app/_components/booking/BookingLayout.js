export default function BookingLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary-950 py-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-accent-500/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-accent-600/5 rounded-full blur-3xl -ml-64 -mb-64"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {children}
      </div>
    </div>
  );
}
