import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Heart, Award, Users, Globe } from 'lucide-react';

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
            <h1 className="mb-5 text-5xl font-bold">About MarineServ</h1>
            <p className="mb-5 text-xl">
              Your trusted partner in marine services since 1985
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 1985, MarineServ has grown from a small maritime parts supplier to become 
                one of the most trusted names in marine services. Our journey began with a simple 
                mission: to provide reliable, high-quality marine equipment and exceptional service 
                to the maritime industry.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Over the decades, we have built strong relationships with leading manufacturers and 
                suppliers worldwide, enabling us to offer comprehensive solutions for all types of 
                marine vessels and offshore installations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we serve customers across six continents, maintaining the same commitment to 
                quality and customer satisfaction that has been our foundation since day one.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg"
                alt="Marine Operations"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-base-200">
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
                  <Target className="w-8 h-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-slate-800">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600">
                  To be the leading provider of marine equipment and services, delivering innovative 
                  solutions that enhance maritime operations while ensuring safety, reliability, and 
                  environmental responsibility.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-cyan-500 mr-3" />
                  <h2 className="text-3xl font-bold text-slate-800">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600">
                  To create a safer, more efficient maritime world by providing cutting-edge 
                  marine solutions and fostering long-term partnerships with our clients 
                  across the global maritime industry.
                </p>
              </motion.div>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-8">Our Values</h2>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <value.icon className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Captain James Morrison',
                role: 'Chief Executive Officer',
                image: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg',
              },
              {
                name: 'Dr. Sarah Chen',
                role: 'Technical Director',
                image: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg',
              },
              {
                name: 'Mike Rodriguez',
                role: 'Operations Manager',
                image: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg',
              },
              {
                name: 'Lisa Thompson',
                role: 'Customer Relations',
                image: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="card bg-base-100 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <figure>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body text-center">
                  <h3 className="card-title justify-center text-slate-800">{member.name}</h3>
                  <p className="text-cyan-500 font-medium">{member.role}</p>
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