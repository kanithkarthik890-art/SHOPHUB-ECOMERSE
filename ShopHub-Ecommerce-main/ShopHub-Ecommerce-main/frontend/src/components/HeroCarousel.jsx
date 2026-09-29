import { useState, useEffect } from "react";

function HeroCarousel() {
  

  const slides = [
  {
    image:
      "https://res.cloudinary.com/dif0ubomz/image/upload/v1781006815/ChatGPT_Image_Jun_9_2026_05_35_33_PM_nufc7x.png",
    title: "Latest Gadgets",
    subtitle:
      "Discover premium electronics at unbeatable prices.",
  },

  {
    image:
      "https://res.cloudinary.com/dif0ubomz/image/upload/v1781005827/The_Ultimate_Work_Headphone_Guide__Find_the_Perfect_Match_for_Style_and_Function_udspiw.jpg",
    title: "Premium Audio",
    subtitle:
      "Headphones, Earbuds and Speakers for every lifestyle.",
  },

  {
    image:
      "https://res.cloudinary.com/dif0ubomz/image/upload/v1781123521/apple_wne76l.jpg",
    title: "Latest Laptops",
    subtitle:
      "Powerful laptops for coding and productivity.",
  },

  {
    image:
      "https://res.cloudinary.com/dif0ubomz/image/upload/v1781119149/Camera_SX679__qb1imu.jpg",
    title: "Canon EOS R6",
    subtitle:
      " 24.2MP DSLR Camera (24-105 mm Lens, CMOS Sensor.",
  },

  {
    image:
      "https://res.cloudinary.com/dif0ubomz/image/upload/v1781121826/gamingGoze_r0kcdj.png",
    title: "Gaming Zone",
    subtitle:
      "Consoles, Accessories and Gaming Gear for champions.",
  },
];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
  const timer = setInterval(() => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  }, 5000);

  return () => clearInterval(timer);
}, []);

  const nextSlide = () => {
    setCurrent(
      (prev) => (prev + 1) % slides.length
    );
  };

  const prevSlide = () => {
    setCurrent(
      (prev) =>
        prev === 0
          ? slides.length - 1
          : prev - 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mb-12">

      <img
        src={slides[current].image}
        alt="banner"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/1600x600?text=Banner+Image";
        }}
        className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover transition-all duration-700"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex items-center">

        <div className="px-6 md:px-16 text-white max-w-2xl">

  <span className="inline-block bg-blue-600 px-4 py-1 rounded-full text-sm mb-4">
  🚀 New Collection
</span>

          <h1
  className="
  text-4xl
  sm:text-5xl
  md:text-7xl
  font-extrabold
  text-white
  leading-tight
  drop-shadow-xl
"
>
            {slides[current].title}
          </h1>

        <p
  className="
  mt-5
  text-lg
  sm:text-xl
  text-gray-200
  max-w-xl
  leading-relaxed
"
>
            {slides[current].subtitle}
          </p>

          <button
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
              className="
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-full
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                hover:bg-white/20
                transition-all
                duration-300
                text-white
                text-sm
                font-semibold
                shadow-lg
                mb-6
              "
          >
            <span className="relative z-10">
             🛒 Shop Now →
            </span>

            
          </button>
          
        </div>

      </div>

      {/* Left Arrow */}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white w-12 h-12 rounded-full"
      >
        ❮
      </button>

      {/* Right Arrow */}

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white w-12 h-12 rounded-full"
      >
        ❯
      </button>

      {/* Dots */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index
                ? "bg-white"
                : "bg-white/50"
            }`}
          />
        ))}

      </div>

    </div>
  );
}

export default HeroCarousel;