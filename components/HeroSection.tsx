export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Book Your Favorite <br />
            <span className="text-orange-400">Movies Anytime, Anywhere</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-gray-300">
            Discover the latest blockbusters and timeless classics. Reserve your
            seats now!
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-orange-400 font-semibold text-black   px-6 py-3 rounded-lg hover:bg-yellow-300 transition">
              Book Tickets
            </button>
            <button className="bg-gray-800 font-semibold text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
              Browse Movies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
