import { motion } from 'framer-motion';
import { Shield, Target, Heart, Award, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutus from "/assets/aboutus.png"

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
    <div className="font-sans">
      {/* Hero Section */}
      <section
        className="hero min-h-96 relative"
        style={{ backgroundImage: "url('/assets/aboutt.png')" }}
      >
        <div className="hero-overlay bg-marine-navy/90 mix-blend-multiply"></div>

        <div className="hero-content text-center text-neutral-white relative z-10">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading mb-5 text-5xl font-bold text-white uppercase tracking-wider">
              About Corona Marine
            </h1>
            <p className="font-sans mb-5 text-xl text-neutral-graylight">
              Your Premier Partner for Marine Automation & Spare Parts
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
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl font-bold text-marine-navy mb-6 uppercase tracking-wide">
                Our Story
              </h2>
              <p className="font-sans text-lg text-marine-blue mb-6 leading-relaxed">
                Established in Bhavnagar, Gujarat, Corona Marine has evolved into a global leader in the supply of 
                marine automation systems and high-quality spare parts. As a premier **Dealer and Stockist**, we bridge the gap 
                between quality and affordability by sourcing premium components from the world-renowned Alang ship breaking yard.
              </p>
              <p className="font-sans text-lg text-marine-blue mb-6 leading-relaxed">
                We specialize in **Marine Automation**, offering a comprehensive range of navigation equipment, 
                engine control systems, and auxiliary machinery. Our expertise lies in identifying and refurbishing 
                critical marine electronics to ensure they meet the rigorous demands of modern shipping.
              </p>
              <p className="font-sans text-lg text-marine-blue mb-8 leading-relaxed">
                Whether you need a hard-to-find spare part or a complete automation retrofit, Corona Marine is your 
                trusted partner. We serve ship owners, management companies, and trading houses worldwide with 
                unmatched reliability and technical support.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded hover:bg-white hover:text-marine-navy transition-all shadow-lg hover:shadow-marine-aqua/20"
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={aboutus}
                alt="Marine Automation in Action"
                className="rounded-lg shadow-xl border border-marine-aqua/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-marine-navy">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Our Core Values
            </h2>
            <p className="font-sans text-lg text-neutral-graylight max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-marine-aqua/10"
                >
                  <div className="w-12 h-12 bg-marine-aqua/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-marine-aqua" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-marine-navy mb-3 uppercase tracking-wide">
                    {value.title}
                  </h3>
                  <p className="font-sans text-marine-blue leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services/Expertise Section */}
      <section className="py-20 bg-neutral-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-bold text-marine-navy mb-4 uppercase tracking-wide">
              Our Expertise
            </h2>
            <p className="font-sans text-lg text-marine-blue max-w-2xl mx-auto">
              Comprehensive solutions for the maritime industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-neutral-graylight rounded-xl border border-marine-aqua/10 hover:border-marine-aqua/30 transition-all">
              <h3 className="font-heading text-2xl font-bold text-marine-navy mb-4">Marine Automation</h3>
              <p className="font-sans text-marine-blue">
                Specialized in PLC systems, engine monitoring, and control panels. We provide testing and repair services for all major automation brands.
              </p>
            </div>
            <div className="p-8 bg-neutral-graylight rounded-xl border border-marine-aqua/10 hover:border-marine-aqua/30 transition-all">
              <h3 className="font-heading text-2xl font-bold text-marine-navy mb-4">Spare Parts Stockist</h3>
              <p className="font-sans text-marine-blue">
                Massive inventory of reconditioned spares including hydraulic pumps, motors, and navigation electronics sourced directly from Alang.
              </p>
            </div>
            <div className="p-8 bg-neutral-graylight rounded-xl border border-marine-aqua/10 hover:border-marine-aqua/30 transition-all">
              <h3 className="font-heading text-2xl font-bold text-marine-navy mb-4">Global Supply</h3>
              <p className="font-sans text-marine-blue">
                Efficient logistics network ensuring timely delivery of critical spares to any port in the world, minimizing vessel downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-graylight">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-4xl font-bold text-marine-navy mb-6 uppercase tracking-wide">
              Ready to Transform Your Operations?
            </h2>
            <p className="font-sans text-lg text-marine-blue mb-8">
              Let's discuss how our marine automation solutions can enhance your vessel's performance and efficiency.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded hover:bg-marine-navy hover:text-white transition-all shadow-lg"
            >
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;