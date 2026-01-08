import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Shield, Users, Bone } from 'lucide-react';
import * as THREE from 'three';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- 3D Components ---
const FloatingPaw = ({ position, rotation, scale, color }: any) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Simplified Paw Shape using spheres */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-0.35, 0.4, 0]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.35, 0.4, 0]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <FloatingPaw position={[2, 0, 0]} rotation={[0, -0.5, 0.2]} scale={1.2} color="#f59e0b" />
      <FloatingPaw position={[-2.5, 1, -2]} rotation={[0, 0.5, -0.2]} scale={0.8} color="#8b5cf6" />
      <FloatingPaw position={[1.5, -2, -1]} rotation={[0.2, 0, 0]} scale={0.6} color="#ec4899" />
    </>
  );
};

// --- Landing Page Component ---
const LandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Scroll Animations with Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation or specific element reveals could go here
      gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0f0f13] text-white overflow-x-hidden selection:bg-primary selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <Bone className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">PawMate</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#community" className="hover:text-primary transition-colors">Community</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold hover:text-white text-gray-300 transition-colors">Log In</Link>
          <Link to="/register" className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/20">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <HeroScene />
          </Canvas>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f13]/50 to-[#0f0f13] z-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-300">The #1 Community for Dog Lovers</span>
            </div>
            
            <h1 ref={textRef} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-600">
              Find the Perfect <br />
              <span className="text-primary">Playdate</span> Partner.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with local dog owners, arrange safe meetups, and build a vibrant social life for your furry companion using our AI-powered matching.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="group relative px-8 py-4 bg-primary text-white font-bold text-lg rounded-full overflow-hidden shadow-2xl shadow-primary/30 transition-all hover:scale-105">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative flex items-center gap-2">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
              <Link to="/login" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-lg rounded-full backdrop-blur-sm transition-all">
                Explore Breeds
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section relative py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need for <span className="text-primary">happy paws</span>.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We've built a suite of tools to help you manage your dog's social life and health with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Smart Matching",
                desc: "Our algorithm connects you with dogs of similar size, energy level, and play style.",
                color: "bg-blue-500/10 border-blue-500/20"
              },
              {
                icon: <Shield className="w-8 h-8 text-green-400" />,
                title: "Verified Profiles",
                desc: "Community safety is our priority. Every profile is vetted for authenticity and vaccination status.",
                color: "bg-green-500/10 border-green-500/20"
              },
              {
                icon: <Heart className="w-8 h-8 text-red-400" />,
                title: "Health Tracking",
                desc: "Keep track of vaccinations, vet visits, and allergies all in one secure place.",
                color: "bg-red-500/10 border-red-500/20"
              }
            ].map((feature, i) => (
              <div key={i} className={`feature-card p-8 rounded-3xl border backdrop-blur-sm transition-transform hover:-translate-y-2 ${feature.color}`}>
                <div className="mb-6 p-4 rounded-2xl bg-black/20 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase / Parallax Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Connect globally, <br />
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">locally</span>.
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Whether you're in New York, London, or Tokyo, PawMate helps you find the best spots for dog walking and the friendliest groups in town.
            </p>
            
            <ul className="space-y-4 mb-8">
              {['Real-time chat with other owners', 'Interactive dog-friendly maps', 'Group event scheduling'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 size-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Link to="/register" className="text-primary font-bold hover:text-white transition-colors inline-flex items-center gap-2">
              Learn more about our community <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1962&auto=format&fit=crop" 
                alt="Happy dogs playing" 
                className="w-full h-auto"
              />
              {/* Floating UI Elements */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="size-10 rounded-full border-2 border-black bg-gray-300 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">500+ New Members</p>
                  <p className="text-xs text-green-400">Joined this week</p>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 size-64 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 size-64 bg-blue-500/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 bg-gradient-to-r from-[#1a1a20] to-[#25252b] rounded-[3rem] p-12 md:p-20 text-center border border-white/5 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to join the pack?</h2>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Create your profile in minutes and start exploring the world of PawMate today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-colors shadow-xl">
              Sign Up Now
            </Link>
            <Link to="/contact" className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/5 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0a0a0c] text-sm text-gray-500 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Bone className="w-4 h-4 text-primary" />
            <span className="font-bold text-white">PawMate</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <p>© 2024 PawMate Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
