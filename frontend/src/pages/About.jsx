import { motion } from 'framer-motion';
import { Shield, Target, Heart, Award, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutus   from "/assets/aboutus.png"
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
  <section
    className="hero min-h-96 relative"
    style={{ backgroundImage: "url('/assets/aboutt.png')" }}
  >
        <div className="hero-overlay bg-gradient-to-r from-blue-900/30 via-cyan-800/30 to-teal-900/70"></div>

    <div className="hero-content text-center text-neutral-white">
      <motion.div
        className="max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-heading mb-5 text-5xl font-bold text-marine-sky">
          About Corona Marine
        </h1>
        <p className="font-sans mb-5 text-xl text-neutral-graylight">
          Empowering the maritime industry through intelligent automation since 2005.
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
          <p className="font-sans text-lg text-marine-blue mb-6">
            Founded in 1985, Corona Marine started with a clear mission: to transform marine operations 
            with cutting-edge automation technology. From humble beginnings, we’ve become a trusted name 
            in marine innovation and control systems.
          </p>
          <p className="font-sans text-lg text-marine-blue mb-6">
            We specialize in the integration of intelligent systems that improve vessel safety, 
            performance, and energy efficiency — tailored for today’s dynamic maritime demands.
          </p>
          <p className="font-sans text-lg text-marine-blue mb-8">
            Our solutions are deployed globally, trusted by commercial fleets, offshore platforms, and 
            port authorities who depend on automation for reliable, round-the-clock operations.
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
            src={aboutus}
            alt="Marine Automation in Action"
            className="rounded-2xl shadow-2xl border-4 border-marine-seafoam"
          />
        </motion.div>
      </div>
    </div>
  </section>
</div>


  );
};

export default About;