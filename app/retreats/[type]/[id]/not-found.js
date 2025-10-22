function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This Cabin/Room could not be found :(
      </h1>
      <a
        href="/retreats"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back to the retreats list.
      </a>
    </main>
  );
}

export default NotFound;
