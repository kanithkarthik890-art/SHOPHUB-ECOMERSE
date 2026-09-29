import { useState } from "react";
import toast from "react-hot-toast";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success(
      "Subscribed Successfully 🚀"
    );

    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-20 px-4">

      {/* Premium Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-indigo-950"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_40%)]"></div>

      <div className="relative max-w-5xl mx-auto px-4">

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center">

          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6">
            🚀 Join 10,000+ Tech Lovers
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Exclusive Deals
          </h2>

          <p className="mt-5 text-gray-300 text-lg max-w-2xl mx-auto">
            Subscribe and get early access to new arrivals,
            exclusive discounts and premium gadgets.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email address"
              className="
                w-full md:w-[420px]
                px-6 py-4
                rounded-2xl
                bg-white/10
                border border-white/10
                text-white
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <button
              onClick={handleSubscribe}
              className="
                px-8 py-4
                rounded-2xl
                font-bold
                text-white
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                hover:scale-105
                hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
                transition-all
                duration-300
              "
            >
              Subscribe →
            </button>

          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">

            <span>✅ No Spam</span>

            <span>⚡ Weekly Tech Updates</span>

            <span>🔒 Privacy Protected</span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;