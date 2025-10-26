import Image from "next/image";

function ImageCarousel({
  accommodations,
  currentImageIndex,
  setCurrentImageIndex,
  hasMultipleAccommodations,
}) {
  const currentAccommodation = accommodations?.[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === accommodations.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? accommodations.length - 1 : prev - 1
    );
  };

  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  return (
    <div className="relative h-48 md:aspect-square md:w-48 flex-shrink-0">
      {accommodations?.length > 0 ? (
        <>
          <Image
            src={currentAccommodation?.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            alt={`${capitalizeFirst(currentAccommodation?.type)} ${
              currentAccommodation?.name
            }`}
            className="object-cover md:border-r border-b md:border-b-0 border-primary-800"
          />

          {hasMultipleAccommodations && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {accommodations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1}/{accommodations.length}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-primary-900 flex items-center justify-center md:border-r border-b md:border-b-0 border-primary-800">
          <span className="text-primary-400 text-sm">No image</span>
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
