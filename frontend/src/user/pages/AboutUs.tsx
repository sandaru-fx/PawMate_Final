import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props: any) => {
    const ref = useRef<any>();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const AboutUs: React.FC = () => {
    return (
        <div className="relative w-full h-auto min-h-screen bg-black overflow-hidden flex flex-col">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Stars />
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col gap-24">

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center text-center space-y-8 mt-10">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
                        <span className="text-purple-400 text-sm font-semibold tracking-wide uppercase">Our Story</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pb-4">
                        We Connect <br /> Hearts & Paws.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light leading-relaxed">
                        Building the world's most trusted community for dog lovers. We're on a mission to ensure every furry friend finds their perfect match and a loving home.
                    </p>
                </div>

                {/* Glassmorphism Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Happy Matches', value: '15k+' },
                        { label: 'Active Users', value: '50k+' },
                        { label: 'Countries', value: '30+' }
                    ].map((stat, i) => (
                        <div key={i} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-500">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-30 transition duration-500 blur-lg"></div>
                            <div className="relative">
                                <h3 className="text-5xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-gray-400 font-medium tracking-wide uppercase">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mission Section */}
                <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                            alt="Happy Dog"
                            className="w-full h-[400px] object-cover rounded-2xl shadow-2xl shadow-purple-500/20"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl font-bold text-white">More Than Just an App</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            PawMate was born from a simple idea: every dog deserves a friend. What started as a small project has grown into a global movement of responsible breeding, playdates, and community support.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            We leverage cutting-edge technology to ensure safe, verified interactions, keeping your data secure and your pets safer.
                        </p>
                        <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200">
                            Join Our Journey
                        </button>
                    </div>
                </div>

                {/* Team Section Placeholder */}
                <div className="text-center space-y-12">
                    <h2 className="text-4xl font-bold text-white">Meet the Pack Leaders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col items-center space-y-4">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=Member+${i}&background=random`}
                                        alt="Team Member"
                                        className="w-full h-full rounded-full border-4 border-black"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Team Member {i}</h4>
                                    <p className="text-purple-400 text-sm">Co-Founder</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
