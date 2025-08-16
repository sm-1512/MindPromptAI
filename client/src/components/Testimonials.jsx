import { assets } from "../assets/assets";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "Using ContentAI feels like having a full creative team in my pocket. The ideas, the writing, the polish — it’s all next-level.",
      rating: 4,
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Jane Smith",
      title: "Content Creator, TechCorp",
      content:
        "I can go from concept to publish-ready content in minutes, not days. It’s become my go-to tool for everything I create.",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: "David Lee",
      title: "Content Writer, TechCorp",
      content:
        "What impresses me most is how natural and engaging the AI’s writing feels. My workflow has never been this smooth.",
      rating: 4,
    },
  ];

  return (
    <div className="relative px-4 sm:px-20 xl:px-32 py-24">
      {/* Soft gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-indigo-50/20 to-white">
        <div className="absolute top-10 left-10 w-[220px] h-[220px] bg-primary/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-10 right-10 w-[220px] h-[220px] bg-pink-300/10 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
          Loved by Creators
        </h2>
        <p className="text-gray-600 mt-4 text-base sm:text-lg">
          Hear directly from the creators, marketers, and innovators who’ve
          transformed their work with ContentAI.
        </p>
      </div>

      {/* Testimonials */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyTestimonialData.map((testimonial, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white/70 shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 
            hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            {/* Star rating */}
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, starIndex) => (
                  <img
                    key={starIndex}
                    src={
                      starIndex < testimonial.rating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    className="w-4 h-4"
                    alt="star"
                  />
                ))}
            </div>

            {/* Review text */}
            <p className="text-gray-600 text-sm mt-5 mb-6 italic leading-relaxed">
              “{testimonial.content}”
            </p>

            <hr className="mb-6 border-gray-200" />

            {/* Reviewer info */}
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                className="w-12 h-12 object-cover rounded-full border border-gray-200"
                alt={testimonial.name}
              />
              <div className="text-sm text-gray-700">
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-xs text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
