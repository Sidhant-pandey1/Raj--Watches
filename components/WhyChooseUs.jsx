import React from 'react';
import { Shield, Truck, Award, Clock, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-6 w-6 stroke-[1.5px] text-[#c9a84c]" />,
      title: "Assured Warranty",
      description:
        "Comprehensive warranty coverage on all our premium timepieces with free servicing.",
    },
    {
      icon: <Truck className="h-6 w-6 stroke-[1.5px] text-[#c9a84c]" />,
      title: "Free Shipping",
      description:
        "Complimentary shipping on all orders above ₹2000 with express delivery options.",
    },
    {
      icon: <Award className="h-6 w-6 stroke-[1.5px] text-[#c9a84c]" />,
      title: "Certified Quality",
      description:
        "All watches are certified for authenticity and quality by international standards.",
    },
    {
      icon: <Clock className="h-6 w-6 stroke-[1.5px] text-[#c9a84c]" />,
      title: "Expert Craftsmanship",
      description:
        "Over 56 years of expertise in creating exceptional timepieces.",
    },
    {
      icon: <Star className="h-6 w-6 stroke-[1.5px] text-[#c9a84c]" />,
      title: "Premium Experience",
      description:
        "Luxury shopping experience with personalized service and exclusive collections.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf9f6] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1a1a2e] mb-4 tracking-tight">
            Why Choose Raj Watches
          </h2>
          <p className="text-sm sm:text-[15px] text-[#6b7280] max-w-xl mx-auto leading-relaxed">
            Where heritage meets modern elegance — experience the elevated world of fine watches and exclusive customer care.
          </p>
        </div>

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full mb-6">
          {features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="bg-white border border-[#e5e7eb] rounded-xl p-8 text-center hover:border-[#c9a84c] hover:shadow-lg hover:-translate-y-1 transition-all duration-400 flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center mb-5 bg-[#c9a84c]/10 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-sm sm:text-[15px] font-semibold uppercase tracking-wide text-[#1a1a2e] mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full max-w-[760px]">
          {features.slice(3).map((feature, idx) => (
            <div key={idx + 3} className="bg-white border border-[#e5e7eb] rounded-xl p-8 text-center hover:border-[#c9a84c] hover:shadow-lg hover:-translate-y-1 transition-all duration-400 flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center mb-5 bg-[#c9a84c]/10 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-sm sm:text-[15px] font-semibold uppercase tracking-wide text-[#1a1a2e] mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Luxe Community Section */}
        <div className="mt-16 w-full max-w-3xl bg-white border border-[#e5e7eb] p-8 sm:p-12 text-center rounded-xl hover:border-[#c9a84c] hover:shadow-lg transition-all duration-500">
          <h3 className="text-[15px] font-semibold tracking-wide uppercase text-[#1a1a2e] mb-4">
            Join Our Premium Community
          </h3>
          <p className="text-sm text-[#6b7280] tracking-wide max-w-xl mx-auto mb-8 leading-relaxed">
            Become part of an exclusive circle — enjoy special privileges, early access to new collections, and tailored recommendations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-1 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                50,000+
              </div>
              <div className="text-xs font-medium tracking-wide uppercase text-[#6b7280]">
                Happy Customers
              </div>
            </div>

            <div className="h-8 w-[2px] bg-[#c9a84c]/30 hidden sm:block rounded-full" />

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-1 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                56+
              </div>
              <div className="text-xs font-medium tracking-wide uppercase text-[#6b7280]">
                Years of Excellence
              </div>
            </div>

            <div className="h-8 w-[2px] bg-[#c9a84c]/30 hidden sm:block rounded-full" />

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-1 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                3,000+
              </div>
              <div className="text-xs font-medium tracking-wide uppercase text-[#6b7280]">
                Premium Timepieces
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}