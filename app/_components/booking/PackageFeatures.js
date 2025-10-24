export default function PackageFeatures({ title, features }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((featureGroup, index) => (
          <ul key={index} className="space-y-2 text-gray-600">
            {featureGroup.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
