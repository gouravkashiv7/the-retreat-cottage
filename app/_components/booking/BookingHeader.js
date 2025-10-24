export default function BookingHeader({ title, subtitle, description, stats }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-400 mb-4">
        {title}
      </h1>
      <p className="text-xl text-primary-300 mb-6">{subtitle}</p>
      <div className="bg-accent-500/20 border border-accent-400 rounded-lg p-6 max-w-4xl mx-auto">
        <p className="text-lg text-accent-300 font-semibold">{description}</p>
        {stats && <p className="text-primary-200 mt-2 text-lg">{stats}</p>}
      </div>
    </div>
  );
}
