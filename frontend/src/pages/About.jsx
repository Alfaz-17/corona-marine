import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Heart, Award, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We maintain the highest standards in all our products and services'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your success is our priority, and we work to exceed your expectations'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Continuous improvement and innovation drive our commitment to excellence'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving maritime professionals worldwide with reliable solutions'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
 {/* Hero Section */}
<section
  className="hero min-h-96 relative"
  style={{
       backgroundImage: "url('/assets/about.png')",

  }}
>
  {/* Deep Marine Overlay */}
  <div className="hero-overlay  "></div>

  <div className="hero-content text-center text-neutral-white">
    <motion.div
      className="max-w-4xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="font-heading mb-5 text-5xl font-bold text-marine-sky">
        About MarineServ
      </h1>
      <p classname="font-sans  mb-5 text-xl text-neutral-graylight">
        Your trusted partner in marine services since 1985
      </p>
    </motion.div>
  </div>
</section>

      {/* Company Profile */}
    <section className="py-20 bg-neutral-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl font-bold text-marine-navy mb-6">
          Our Story
        </h2>
        <p classname="font-sans text-lg text-marine-blue mb-6">
          Founded in 1985, MarineServ has grown from a small maritime parts
          supplier to become one of the most trusted names in marine services.
          Our journey began with a simple mission: to provide reliable,
          high-quality marine equipment and exceptional service to the maritime
          industry.
        </p>
        <p classname="font-sans text-lg text-marine-blue mb-6">
          Over the decades, we have built strong relationships with leading
          manufacturers and suppliers worldwide, enabling us to offer
          comprehensive solutions for all types of marine vessels and offshore
          installations.
        </p>
        <p classname="font-sans text-lg text-marine-blue mb-8">
          Today, we serve customers across six continents, maintaining the same
          commitment to quality and customer satisfaction that has been our
          foundation since day one.
        </p>
        <Link
          to="/about"
          className="btn bg-marine-aqua border-none hover:bg-marine-seafoam text-neutral-white font-semibold rounded-lg shadow-md"
        >
          Learn More
        </Link>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <img
          src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg"
          alt="Marine Operations"
          className="rounded-2xl shadow-2xl border-4 border-marine-seafoam"
        />
      </motion.div>
    </div>
  </div>
</section>

      {/* Mission, Vision, Values */}
  <section className="py-20 bg-neutral-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Mission & Vision */}
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-marine-aqua mr-3" />
            <h2 className="font-heading text-3xl font-bold text-marine-navy">Our Mission</h2>
          </div>
          <p classname="font-sans text-lg text-marine-blue">
            To be the leading provider of marine equipment and services,
            delivering innovative solutions that enhance maritime operations
            while ensuring safety, reliability, and environmental
            responsibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-marine-seafoam mr-3" />
            <h2 className="font-heading text-3xl font-bold text-marine-navy">Our Vision</h2>
          </div>
          <p classname="font-sans text-lg text-marine-blue">
            To create a safer, more efficient maritime world by providing
            cutting-edge marine solutions and fostering long-term partnerships
            with our clients across the global maritime industry.
          </p>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-headingtext-3xl font-bold text-marine-navy mb-8">Our Values</h2>
        <div className="space-y-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="flex items-start bg-marine-light/20 p-4 rounded-xl hover:shadow-md transition"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <value.icon className="w-6 h-6 text-marine-aqua mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-heading text-xl font-semibold text-marine-navy mb-2">
                  {value.title}
                </h3>
                <p classname="font-sans text-marine-blue">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
</section>


      {/* Team Section */}
    <section className="py-20 bg-neutral-white">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-heading text-4xl font-bold text-marine-navy mb-4">
        Our Expert Team
      </h2>
      <p classname="font-sans text-xl text-marine-blue">
        Experienced professionals dedicated to your success
      </p>
    </motion.div>

    {/* Team Members */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          name: 'Captain James Morrison',
          role: 'Chief Executive Officer',
          image:
            'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg',
        },
        {
          name: 'Dr. Sarah Chen',
          role: 'Technical Director',
          image:
            'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg',
        },
        {
          name: 'Mike Rodriguez',
          role: 'Operations Manager',
          image:
            'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg',
        },
        {
          name: 'Lisa Thompson',
          role: 'Customer Relations',
          image:
            'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg',
        },
      ].map((member, index) => (
        <motion.div
          key={index}
          className="card bg-marine-light/20 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <figure>
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-56 object-cover"
            />
          </figure>
          <div className="card-body text-center">
            <h3 className="font-heading card-title justify-center text-marine-navy text-lg font-bold">
              {member.name}
            </h3>
            <p classname="font-sans text-marine-aqua font-medium">{member.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default About;