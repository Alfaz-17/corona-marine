import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import api from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); 
  // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await api.post("/contact", formData);

      if (res.status === 200 || res.status === 201) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 9376502550"],
      action: "tel:+919376502550",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["coronamarine5050@gmail.com"],
      action: "mailto:coronamarine5050@gmail.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Bhavnagar, Gujarat, India"],
      action: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Mon - Fri: 8:00 AM - 6:00 PM",
        "Sat: 9:00 AM - 4:00 PM",
        "Sun: Emergency Only",
      ],
      action: null,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero min-h-96 relative"
        style={{ backgroundImage: "url('/assets/contact.png')" }}
      >
        <div className="hero-overlay bg-marine-navy/90 mix-blend-multiply"></div>
        <div className="hero-content text-center text-white">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-heading mb-5 text-5xl font-extrabold drop-shadow-lg tracking-wide">
              Contact Us
            </h1>
            <p className="font-sans mb-5 text-xl text-marine-aqua">
              Get in touch with our marine experts today
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a
                href="tel:+919376502550"
                className="btn bg-cyan-500 hover:bg-cyan-600 border-0 text-white"
              >
                Call Now
              </a>
              <a
                href="#contact-form"
                className="btn bg-teal-500 hover:bg-teal-600 border-0 text-white"
              >
                Get Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-marine-navy mb-4">
              Get In Touch
            </h2>
            <p className="font-sans text-xl text-cyan-700">
              We're here to help with all your marine service needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="card bg-white shadow-lg border border-cyan-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-body">
                  <info.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-heading card-title justify-center text-slate-800 mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="font-sanstext-gray-600">
                        {info.action && idx === 0 ? (
                          <a
                            href={info.action}
                            className="text-cyan-700 hover:text-teal-600 transition-colors font-medium"
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-b mt-[-150px] from-cyan-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="card bg-white border  border-cyan-100 shadow-xl">
                <div className="card-body">
                  <h3 className="font-heading card-title text-2xl text-marine-navy mb-6">
                    Send Us a Message
                  </h3>

                  {status === "success" ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <CheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                      <h4 className="font-sans text-xl font-semibold text-teal-600 mb-2">
                        Message Sent Successfully!
                      </h4>
                      <p className="font-sans text-gray-600">
                        We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="font-sanslabel-text font-semibold">Full Name *</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            className="input input-bordered w-full"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="font-sans label-text font-semibold">Email *</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            className="input input-bordered w-full"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="font-sans label-text font-semibold">Phone</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+91 9376502550"
                            className="input input-bordered w-full"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="font-sans label-text font-semibold">Company</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            placeholder="Your company name"
                            className="input input-bordered w-full"
                            value={formData.company}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="font-sans label-text font-semibold">Message *</span>
                        </label>
                        <textarea
                          name="message"
                          placeholder="Tell us about your marine service needs..."
                          className="textarea textarea-bordered w-full h-32"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn bg-teal-600 hover:bg-teal-700 text-white w-full"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? "Sending..." : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>

                      {status === "error" && (
                        <p className="font-sans text-red-500 text-sm text-center">
                          ❌ Something went wrong. Please try again later.
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
                 <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {/* Mock Map */}
     <div className="rounded-2xl overflow-hidden shadow-xl h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5709!2d72.1416!3d21.7645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQ1JzUyLjIiTiA3MsKwMDgnMjguMCJF!5e0!3m2!1sen!2sin!4v1670000000000"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        {/* Emergency Contact */}
        <div className="card bg-red-50 mt-10 border border-red-200 shadow-lg">
          <div className="card-body">
            <h3 className="font-heading card-title text-red-700 mb-4">
              Emergency Marine Services
            </h3>
            <p className="font-sans text-red-600 mb-4">
              Available 24/7 for urgent marine assistance and emergency repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a href="tel:+919376502550" className="btn bg-red-600 hover:bg-red-700 text-white flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Hotline
              </a>
              <a href="mailto:coronamarine5050@gmail.com" className="btn btn-outline border-red-600 text-red-600 hover:bg-red-100 flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Emergency Email
              </a>
            </div>
          </div>
        </div>
      </motion.div> 
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white relative"> 
  <div className="container mx-auto px-4 text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold mb-4 text-teal-300">
        Ready to Get Started?
      </h2>
      <p className="font-sans text-xl mb-8 text-slate-200">
        Contact our marine experts today for a free consultation
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="tel:+919376502550" className="btn btn-primary btn-lg">
          <Phone className="w-5 h-5 mr-2" />
          Call Now
        </a>
        <a href="#contact-form" className="btn btn-accent btn-lg">
          Get Quote
        </a>
      </div>
    </motion.div>
  </div>

  {/* Wave Divider */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
    <svg
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      className="w-full h-20"
    >
      <path
        d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
        className="fill-slate-800"
      ></path>
    </svg>
  </div>
</section>
    </div>
  );
};

export default Contact;
