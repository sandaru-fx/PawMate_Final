import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Particles = (props: any) => {
    const ref = useRef<any>();
    // Generate particles in a sphere
    const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }));

    useFrame((state, delta) => {
        // Rotate the particle cloud slowly
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffaa00" // Golden/Dog color hint
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

const DogThemedBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-background-light dark:bg-black transition-colors duration-500">
            {/* 1. High Quality Dog Image Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-1000"
                style={{
                    // Using a high-quality Unsplash image of dogs playing
                    backgroundImage: `url('https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop')`
                }}
            ></div>

            {/* 2. Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-white/10 dark:from-black dark:via-black/50 dark:to-transparent transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-white/20 dark:bg-black/30 backdrop-blur-[2px] transition-colors duration-500"></div>

            {/* 3. Three.js Particle Layer */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Particles />
                </Canvas>
            </div>
        </div>
    );
};

export default DogThemedBackground;
