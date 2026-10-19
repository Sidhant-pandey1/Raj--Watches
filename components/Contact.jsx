"use client"
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    company: "",
    message: "",
  });

  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    if (form) {
      gsap.fromTo(
        form,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: form,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          company: formData.company,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        publicKey
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          setFormData({ from_name: "", from_email: "", company: "", message: "" });
        },
        (error) => {
          alert("❌ Something went wrong. Please try again later.");
        }
      );
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      details: "Praveen.chhatwani@gmail.com",
      subtitle: "Replies within 24 hours",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Us",
      details: "9776321190",
      subtitle: "Mon–Sun 9AM–10PM IST",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Visit Us",
      details: "BISRA ROAD, ROURKELA, ROURKELA, Sundargarh, Odisha, 769001",
      subtitle: "By appointment only",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-24 bg-white overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1a1a2e] mb-5 tracking-tight">
            Let's Start Your Timeless Journey
          </h2>
          <p className="text-[15px] sm:text-base text-[#6b7280] max-w-2xl mx-auto leading-relaxed">
            Every second counts — let's make yours timeless. Get in touch with us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#faf9f6] border border-[#e5e7eb] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[#1a1a2e] mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>Why Choose Us?</h3>
              <ul className="space-y-3 text-[#4b5563] text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-[#c9a84c] rounded-full mt-1.5 mr-3 flex-shrink-0"></span>Bespoke discounts for businesses & connoisseurs</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-[#c9a84c] rounded-full mt-1.5 mr-3 flex-shrink-0"></span>Expedited, secure shipping on all premium orders</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-[#c9a84c] rounded-full mt-1.5 mr-3 flex-shrink-0"></span>One-on-one guidance for collection curation</li>
              </ul>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-[#faf9f6] border border-[#e5e7eb] rounded-xl hover:border-[#c9a84c] transition-all duration-300"
                >
                  <div className="text-[#c9a84c] mr-3 mt-0.5">{info.icon}</div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e] mb-0.5 text-sm">{info.title}</h4>
                    <p className="text-[#4b5563] text-sm">{info.details}</p>
                    <p className="text-[#9ca3af] text-xs mt-0.5">{info.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 bg-[#faf9f6] border border-[#e5e7eb] rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                Message *
              </label>
              <textarea
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements or questions..."
                className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 resize-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a1a2e] text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-[#c9a84c] transition-all duration-300 flex items-center justify-center text-sm tracking-wide"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
