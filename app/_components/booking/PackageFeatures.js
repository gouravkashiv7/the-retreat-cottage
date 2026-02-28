export default function PackageFeatures({ title, features }) {
  return (
    <div className="bg-primary-900/40 backdrop-blur-sm border border-accent-400/10 rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-accent-400 mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-accent-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((featureGroup, index) => (
          <ul key={index} className="space-y-4">
            {featureGroup.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3 group">
                <span className="mt-1.5 w-2 h-2 bg-accent-500 rounded-full shadow-[0_0_8px_rgba(236,201,140,0.6)] group-hover:scale-125 transition-transform"></span>
                <span className="text-primary-200 text-sm sm:text-base font-medium group-hover:text-white transition-colors">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
