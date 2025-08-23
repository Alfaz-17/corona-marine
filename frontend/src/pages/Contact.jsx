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
      <section className="hero min-h-96 relative" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg)',
      }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-5 text-5xl font-bold">Contact Us</h1>
            <p className="mb-5 text-xl">
              Get in touch with our marine experts today
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              We're here to help with all your marine service needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="card bg-base-200 shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-body">
                  <info.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="card-title justify-center text-slate-800 mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {info.action && idx === 0 ? (
                          <a href={info.action} className="hover:text-blue-600 transition-colors">
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
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl text-slate-800 mb-6">
                    Send Us a Message
                  </h3>

                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-green-600 mb-2">
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
                            <span className="label-text font-semibold">Full Name *</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            className="input input-bordered"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-semibold">Email *</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            className="input input-bordered"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-semibold">Phone</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 123-4567"
                            className="input input-bordered"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-semibold">Company</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            placeholder="Your company name"
                            className="input input-bordered"
                            value={formData.company}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">Message *</span>
                        </label>
                        <textarea
                          name="message"
                          placeholder="Tell us about your marine service needs..."
                          className="textarea textarea-bordered h-32"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary w-full">
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
              <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body p-0">
                  <div 
                    className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center"
                  >
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
                    <a href="tel:+15551234567" className="btn btn-error flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Hotline
                    </a>
                    <a href="mailto:emergency@marineserv.com" className="btn btn-outline btn-error flex-1">
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
      <section className="py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact our marine experts today for a free consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+15551234567" className="btn btn-primary btn-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
              <a href="#contact-form" className="btn btn-outline btn-lg">
                Get Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;