import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
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
                    color="#8b5cf6"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSuccess(false);

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
    };

    return (
        <div className="relative w-full h-auto min-h-screen bg-black overflow-hidden flex flex-col">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Stars />
                </Canvas>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex flex-col items-center justify-center">

                {/* Header */}
                <div className="text-center space-y-6 mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md">
                        <span className="text-violet-400 text-sm font-semibold tracking-wide uppercase">Get In Touch</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white">
                        Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">Conversation</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have questions about PawMate? We're here to help you finding the perfect partner for your furry friend.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">

                    {/* Contact Info */}
                    <div className="space-y-8 flex flex-col justify-center">
                        {[
                            { icon: 'mail', title: 'Email Us', desc: 'hello@pawmate.com' },
                            { icon: 'call', title: 'Call Us', desc: '+1 (555) 123-4567' },
                            { icon: 'location_on', title: 'Visit Us', desc: '123 Dogwood Lane, Petsville' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center space-x-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
                                <div className="flex-shrink-0 size-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                                    <span className="material-symbols-outlined text-white text-2xl">{item.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <p className="text-gray-400 text-base">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                        {isSuccess ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-green-500 text-4xl">check_circle</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400 mb-8">We'll get back to you as soon as possible.</p>
                                <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">First Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="John" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            className={`w-full bg-black/20 border ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-violet-500'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all custom-input`} 
                                        />
                                        {errors.firstName && <p className="text-xs text-red-500 ml-1">{errors.firstName}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Last Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Doe" 
                                            value={formData.lastName}
                                            onChange={(e) => updateField('lastName', e.target.value)}
                                            className={`w-full bg-black/20 border ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-violet-500'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all custom-input`} 
                                        />
                                        {errors.lastName && <p className="text-xs text-red-500 ml-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        value={formData.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                        className={`w-full bg-black/20 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-violet-500'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all custom-input`} 
                                    />
                                    {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
                                    <textarea 
                                        rows={4} 
                                        placeholder="How can we help?" 
                                        value={formData.message}
                                        onChange={(e) => updateField('message', e.target.value)}
                                        className={`w-full bg-black/20 border ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-violet-500'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all resize-none custom-input`}
                                    ></textarea>
                                    {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message}</p>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ContactUs;
