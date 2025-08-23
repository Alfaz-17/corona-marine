import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      action: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@marineserv.com', 'support@marineserv.com'],
      action: 'mailto:info@marineserv.com'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Harbor Street', 'Port City, PC 12345', 'United States'],
      action: null
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM', 'Sun: Emergency Only'],
      action: null
    }
  ];

  return (
    <div>
      {/* Hero Section */}
     <section
  className="hero min-h-96 relative"
style={{
    backgroundImage: "url('/assets/contact.png')",
  }}
>
  {/* Marine Gradient Overlay */}
  <div className="hero-overlay "></div>

  <div className="hero-content text-center text-white">
    <motion.div
      className="max-w-4xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >

      <h1 className="mb-5 text-5xl font-extrabold drop-shadow-lg tracking-wide">
        Contact Us
      </h1>
      <p className="mb-5 text-xl  text-cyan-100">
        Get in touch with our marine experts today
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <a
          href="tel:+15551234567"
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


      {/* Contact Information */}
   <section className="py-20 bg-gradient-to-b from-cyan-50 via-white to-teal-50">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-marine-navy mb-4">
        Get In Touch
      </h2>
      <p className="text-xl text-cyan-700">
        We're here to help with all your marine service needs
      </p>
    </motion.div>

    {/* Contact Info Cards */}
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
            {/* Marine Icon */}
            <info.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />

            <h3 className="card-title justify-center text-slate-800 mb-4">
              {info.title}
            </h3>

            <div className="space-y-2">
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600">
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


      {/* Contact Form & Map */}
     <section className="py-20 bg-gradient-to-b from-cyan-50 via-white to-teal-50">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="card bg-white border border-cyan-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-2xl text-marine-navy mb-6">
              Send Us a Message
            </h3>

            {isSubmitted ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-teal-600 mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-gray-600">
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-marine-navy font-semibold">Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      className="input input-bordered w-full border-marine-aqua/50 focus:border-marine-blue"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-marine-navy font-semibold">Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="input input-bordered w-full border-marine-aqua/50 focus:border-marine-blue"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-marine-navy font-semibold">Phone</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      className="input input-bordered w-full border-marine-aqua/50 focus:border-marine-blue"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-marine-navy font-semibold">Company</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Your company name"
                      className="input input-bordered  w-full border-marine-aqua/50 focus:border-marine-blue"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-marine-navy font-semibold">Message *</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your marine service needs..."
                    className="textarea w-full border-marine-aqua/50 focus:border-marine-blue  textarea-bordered h-32 focus:border-teal-500"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn bg-teal-600 hover:bg-teal-700 text-white w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>

      {/* Map & Additional Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {/* Mock Map */}
        <div className="card bg-white border border-cyan-100 shadow-xl mb-6">
          <div className="card-body p-0">
            <div className="w-full h-64 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Our Location</h4>
                <p>Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="card bg-red-50 border border-red-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-red-700 mb-4">
              Emergency Marine Services
            </h3>
            <p className="text-red-600 mb-4">
              Available 24/7 for urgent marine assistance and emergency repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a href="tel:+15551234567" className="btn bg-red-600 hover:bg-red-700 text-white flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Hotline
              </a>
              <a href="mailto:emergency@marineserv.com" className="btn btn-outline border-red-600 text-red-600 hover:bg-red-100 flex-1">
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


      {/* Call to Action */}
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
      <p className="text-xl mb-8 text-slate-200">
        Contact our marine experts today for a free consultation
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="tel:+15551234567" className="btn btn-primary btn-lg">
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