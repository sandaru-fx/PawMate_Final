import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Default initial state matching the design
const INITIAL_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAizicY95Tdns6kZpIZ2DktESP9ZO7AeVFs0rUP2Hudoduue6jVUMA4MVg0leTiVdp7uD9ecL0Opf48AaKZjbFP1RbdjQ8IZHL327B2NgESj4GKgh-4-u9dsh_I37U1k5eA_gzokMdOw7Ayljs5AJCTPlptdYarOz3U31iyxeRUV1GEVaCBbqu78L035sjmpPZLVG9qs3lOzxoKp6ljnZKZEaRkbK4zeBW3ofx57cQ4_WKZKxdy8WjHsaFNgOAQYOJpbqovU1SEFkk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCvVsVnvqgGsqR_4etLt-ZGfgtddgRsAlUykLgmsHFMskGQz_oPgNBFHSM3L0JPVyf339DrmLc1Pr-8ERpmt_Abl9iKeZUiUS0482VcznGn-j7wIqRXm61dewugUJBsUkAeJVYHOHsx-uSnT_FQ2nKW8y0GVmoKzo8GaR24WsYmdkt4kWhLjDQ_7aqtN6vTyrt1nR4OpjJF7U600FYE1mTeenJsr99fwuxaAuQQKLkv6Ye_ut5TZjcyMKlw0bgcZ_TC2OmfMcGhmpE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAXup6iAGi_3r8N76HefIPhDwz-OHAufnvt-Ky9PrmeHx7-lL6Pr8k49V-rF_AaOdthkzpHRpUufYrmcAcvTZU-4Nfw5jT8hVAQ1aTJxO8-d4F6yObykCReRMk5zFrGN1P1VwE2amLMTk8t_ruU1x6LRJxSuvurnyAW51jyACZrA-Qo4WV3Lk_d2-pK7Sb8zdOc1hdd7eO1q9lojL3qQONSeD8m-RHGIwlw3FGNQeNrU7ApWnFpNj0cvGqX1y9L9eFLqMqoLeQwdus"
];

const CreateDogProfile: React.FC = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        dob: '',
        gender: '',
        location: 'San Francisco, CA', // Default for now
        coordinates: [-122.4194, 37.7749], // Default GeoJSON
        images: INITIAL_IMAGES,
        spayedNeutered: true,
        microchipped: true,
        breedingRights: false,
        lastRabiesShot: '',
        nextVaccinationDue: '',
        knownAllergies: '',
        geneticConditions: [] as string[]
    });

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.breed) newErrors.breed = 'Breed is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors: Record<string, string> = {};
        
        // Simple logic check: Next vaccination should be after last rabies shot if both exist
        if (formData.lastRabiesShot && formData.nextVaccinationDue) {
            const lastShot = new Date(formData.lastRabiesShot);
            const nextDue = new Date(formData.nextVaccinationDue);
            if (nextDue <= lastShot) {
                newErrors.vaccinationDates = "Next vaccination must be after the last shot";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (step === 1) {
            if (!validateStep1()) return;
        }
        if (step === 2) {
            if (formData.images.length === 0) {
                alert("Please add at least one photo of your dog.");
                return;
            }
        }
        setStep(prev => Math.min(prev + 1, 3));
    };
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!validateStep3()) return;

        // In a real app, send data to backend here
        console.log("Submitting Dog Profile:", formData);
        
        // Simulate success and redirect
        setTimeout(() => {
            navigate('/home');
        }, 500);
    };

    // --- STEP 1: Basic Details ---
    const renderStep1 = () => (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white tracking-tight mb-2">Add New Profile</h1>
                        <p className="text-text-muted">Let's set up a profile for your furry friend.</p>
                    </div>
                    <div className="md:text-right">
                        <p className="text-primary font-bold text-sm uppercase tracking-wider mb-1">Step 1 of 3</p>
                        <p className="text-sm font-medium text-text-main dark:text-white">Basic Details</p>
                    </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
                    <div className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(238,140,43,0.5)]" style={{ width: '33%' }}></div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-border dark:border-[#3e342a] overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-3/5 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-text-main dark:text-white mb-2">Who is the new lucky pup?</h2>
                        <p className="text-text-muted text-sm">Tell us a bit about them so we can find the perfect match.</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-text-main dark:text-white">What's their name?</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">pets</span>
                                </div>
                                <input 
                                    value={formData.name}
                                    onChange={(e) => updateField('name', e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 bg-input-bg dark:bg-[#362b23] border ${errors.name ? 'border-red-500' : 'border-border dark:border-[#4a3b30]'} rounded-xl text-text-main dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`} placeholder="e.g. Charlie" type="text" 
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-text-main dark:text-white">What breed are they?</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <select 
                                    value={formData.breed}
                                    onChange={(e) => updateField('breed', e.target.value)}
                                    className={`w-full pl-10 pr-10 py-3 bg-input-bg dark:bg-[#362b23] border ${errors.breed ? 'border-red-500' : 'border-border dark:border-[#4a3b30]'} rounded-xl text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none cursor-pointer`}
                                >
                                    <option disabled value="">Select a breed...</option>
                                    <option value="Golden Retriever">Golden Retriever</option>
                                    <option value="Labrador Retriever">Labrador Retriever</option>
                                    <option value="French Bulldog">French Bulldog</option>
                                    <option value="Pug">Pug</option>
                                    <option value="Australian Shepherd">Australian Shepherd</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                </div>
                            </div>
                            {errors.breed && <p className="text-xs text-red-500 mt-1">{errors.breed}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-text-main dark:text-white">Date of Birth</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                </div>
                                <input 
                                    value={formData.dob}
                                    onChange={(e) => updateField('dob', e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 bg-input-bg dark:bg-[#362b23] border ${errors.dob ? 'border-red-500' : 'border-border dark:border-[#4a3b30]'} rounded-xl text-text-main dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none`} type="date" 
                                />
                            </div>
                            {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
                            <p className="text-xs text-text-muted ml-1">We use this to calculate their age automatically.</p>
                        </div>

                        <div className="space-y-2">
                            <span className="block text-sm font-semibold text-text-main dark:text-white">Gender</span>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="relative cursor-pointer group">
                                    <input 
                                        className="peer sr-only" name="gender" type="radio" value="Male" 
                                        checked={formData.gender === 'Male'}
                                        onChange={() => updateField('gender', 'Male')}
                                    />
                                    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${errors.gender && !formData.gender ? 'border-red-500' : 'border-border dark:border-[#4a3b30]'} bg-input-bg dark:bg-[#362b23] text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all duration-200`}>
                                        <span className="material-symbols-outlined text-3xl mb-1">male</span>
                                        <span className="font-semibold text-sm">Male</span>
                                    </div>
                                </label>
                                <label className="relative cursor-pointer group">
                                    <input 
                                        className="peer sr-only" name="gender" type="radio" value="Female" 
                                        checked={formData.gender === 'Female'}
                                        onChange={() => updateField('gender', 'Female')}
                                    />
                                    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${errors.gender && !formData.gender ? 'border-red-500' : 'border-border dark:border-[#4a3b30]'} bg-input-bg dark:bg-[#362b23] text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all duration-200`}>
                                        <span className="material-symbols-outlined text-3xl mb-1">female</span>
                                        <span className="font-semibold text-sm">Female</span>
                                    </div>
                                </label>
                            </div>
                            {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
                        </div>

                        <div className="flex items-center justify-between pt-6 mt-4 border-t border-border dark:border-[#4a3b30]">
                            <button type="button" onClick={() => navigate('/home')} className="text-sm font-semibold text-gray-500 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/30 transform transition hover:-translate-y-0.5 active:translate-y-0">
                                Continue
                                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="hidden md:block w-2/5 relative overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBN4TY25PmG37EIzvoiwJBsTabAdkxlkXRkEjK5_s2f0WVEKD79L_KoEqiba6i2n9a26-pKRirMwN5KuPb8x_sW9NG1QyZLEa7rdmMLutPYWJBEhNaPCIF3TI5z8u_7bxARrv7rBA3Q6H0QQ1Pd7eNxaCFyR7_0k6_CYUFnMIMa6PEi7mPZYDuB_ufGlNhezkxRiVhNc69FB9PD7R0DTTltuB2aRf4_WUQeZtXNpb8fsxecyxVOCnrS1XCHihfWq9vBjBTCGFB84K8")' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                                <span className="material-symbols-outlined text-yellow-400">tips_and_updates</span>
                            </div>
                            <span className="text-sm font-bold tracking-wide uppercase opacity-90">Pro Tip</span>
                        </div>
                        <p className="text-lg font-medium leading-relaxed drop-shadow-md">
                            "Detailed profiles get 3x more match requests. Don't skip the small stuff!"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- STEP 2: Photos ---
    const renderStep2 = () => (
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 px-4 md:px-10 lg:px-20 xl:px-40">
            {/* Left Column: Wizard & Form */}
            <div className="lg:col-span-8 flex flex-col gap-8">
                {/* Progress Bar Component */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-6 justify-between items-center">
                        <p className="text-base font-medium leading-normal text-text-main dark:text-white">Step 2 of 3</p>
                        <span className="text-sm text-text-muted font-medium">66% Completed</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#e7dbcf] dark:bg-[#3a2e22] overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(238,140,43,0.5)]" style={{ width: '66%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs font-medium tracking-wide uppercase text-text-muted mt-1">
                        <span>Basic Info</span>
                        <span className="text-primary">Photos</span>
                        <span className="opacity-50">Health</span>
                    </div>
                </div>
                {/* Page Heading Component */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-text-main dark:text-white">Show off your Dog</h1>
                    <p className="text-text-muted text-lg font-normal leading-relaxed max-w-2xl">
                        Add at least 3 photos to get more matches. The first photo will be your main profile picture seen by others.
                    </p>
                </div>
                {/* Upload Area */}
                <div className="group relative flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-[#e7dbcf] dark:border-[#3a2e22] bg-surface-light dark:bg-surface-dark px-6 py-12 transition-all hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                    <div className="z-10 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                    </div>
                    <div className="z-10 flex max-w-[480px] flex-col items-center gap-2 text-center">
                        <p className="text-lg font-bold leading-tight text-text-main dark:text-white">Drag & drop photos here</p>
                        <p className="text-sm text-text-muted">or browse to upload from your computer (JPG, PNG)</p>
                    </div>
                    <button className="z-10 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all">
                        <span className="material-symbols-outlined text-xl">folder_open</span>
                        <span>Browse Files</span>
                    </button>
                </div>
                {/* Image Grid Component */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-text-main dark:text-white">Your Gallery <span className="text-text-muted font-normal text-sm ml-2">({formData.images.length} photos added)</span></h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Main Photo */}
                        <div className="group relative col-span-2 row-span-2 aspect-square md:aspect-auto md:h-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                            <div className="absolute top-3 left-3 z-10 rounded-lg bg-black/60 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white shadow-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-primary">star</span>
                                Main Photo
                            </div>
                            <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${formData.images[0]}")` }}></div>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button className="size-10 rounded-full bg-white/20 backdrop-blur hover:bg-white text-white hover:text-primary transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                                <button className="size-10 rounded-full bg-white/20 backdrop-blur hover:bg-red-500 text-white transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                        {/* Secondary Photos */}
                        {formData.images.slice(1).map((img, i) => (
                            <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${img}")` }}></div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button className="size-8 rounded-full bg-white/20 backdrop-blur hover:bg-red-500 text-white transition-colors flex items-center justify-center">
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Empty Placeholder Slot */}
                        <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#e7dbcf] dark:border-[#3a2e22] bg-surface-light/50 dark:bg-surface-dark/50 text-text-muted hover:bg-primary/5 hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-3xl">add</span>
                            <span className="text-xs font-bold">Add Photo</span>
                        </div>
                    </div>
                </div>
                {/* Navigation Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-[#f3ede7] dark:border-[#3a2e22] pt-8">
                    <button onClick={prevStep} className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-text-muted hover:text-text-main dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back
                    </button>
                    <button onClick={nextStep} className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all">
                        Save & Continue
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
            {/* Right Column: Tips Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="sticky top-28 rounded-2xl bg-surface-light dark:bg-surface-dark p-6 shadow-sm border border-[#f3ede7] dark:border-[#3a2e22]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-2 text-yellow-600 dark:text-yellow-500">
                            <span className="material-symbols-outlined">lightbulb</span>
                        </div>
                        <h3 className="text-lg font-bold text-text-main dark:text-white">Tips for Great Photos</h3>
                    </div>
                    <ul className="flex flex-col gap-4">
                        {[
                            { title: 'Use natural lighting', desc: 'Outdoor photos or near windows work best. Avoid dark or grainy shots.' },
                            { title: 'Show the face clearly', desc: "Matches want to see your dog's eyes and expression. Get on their eye level!" },
                            { title: 'Variety is key', desc: 'Includes action shots, sleeping poses, and full body pictures.' }
                        ].map((tip, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <span className="material-symbols-outlined text-primary mt-0.5 text-xl">check_circle</span>
                                <div>
                                    <p className="text-sm font-bold mb-1 text-text-main dark:text-white">{tip.title}</p>
                                    <p className="text-xs text-text-muted leading-relaxed">{tip.desc}</p>
                                </div>
                            </li>
                        ))}
                        <li className="flex gap-3 items-start opacity-60">
                            <span className="material-symbols-outlined text-red-500 mt-0.5 text-xl">cancel</span>
                            <div>
                                <p className="text-sm font-bold mb-1 text-text-main dark:text-white">No group photos</p>
                                <p className="text-xs text-text-muted leading-relaxed">Avoid photos with other pets or people to keep the focus on your dog.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* Small Help Link */}
                <div className="text-center">
                    <a className="text-sm font-medium text-text-muted hover:text-primary transition-colors" href="#">Need help uploading?</a>
                </div>
            </div>
        </div>
    );

    // --- STEP 3: Health & Vaccinations ---
    const renderStep3 = () => (
        <div className="flex-1 flex justify-center py-8 px-4 sm:px-6">
            <div className="w-full max-w-[800px] flex flex-col gap-8">
                {/* Progress Bar Section */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-6 justify-between items-end">
                        <p className="text-text-main dark:text-white text-base font-medium leading-normal">Step 3 of 3</p>
                        <span className="text-text-muted text-sm">Almost done!</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-2 flex-1 rounded-full bg-primary"></div>
                        <div className="h-2 flex-1 rounded-full bg-primary"></div>
                        <div className="h-2 flex-1 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-text-muted text-sm font-normal leading-normal">Basic Info • Appearance • <span className="text-primary font-medium">Health & Vaccination</span></p>
                </div>
                {/* Page Heading */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-text-main dark:text-white tracking-tight text-3xl sm:text-4xl font-bold leading-tight">Health & Vaccinations</h1>
                    <p className="text-text-muted text-base font-normal leading-relaxed max-w-xl">
                        Help other owners trust your pet by providing accurate health details. These details are verified to earn the "Verified Health" badge.
                    </p>
                </div>
                {/* Main Form Card */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-lg p-6 sm:p-8 shadow-sm border border-border dark:border-[#3a2e22] flex flex-col gap-8">
                    {/* Section: General Health */}
                    <div>
                        <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">verified_user</span> General Health
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { key: 'spayedNeutered', label: 'Spayed / Neutered', sub: 'Recommended for non-breeding pets' },
                                { key: 'microchipped', label: 'Microchipped', sub: 'For safety and identification' },
                                { key: 'breedingRights', label: 'Breeding Rights', sub: 'Available for mating' }
                            ].map((item) => (
                                <label key={item.key} className="flex items-center gap-x-3 p-4 rounded-lg border border-border dark:border-[#3a2e22] hover:bg-background-light dark:hover:bg-background-dark/50 cursor-pointer transition-colors group">
                                    <input 
                                        type="checkbox" 
                                        checked={!!formData[item.key as keyof typeof formData]}
                                        onChange={(e) => updateField(item.key, e.target.checked)}
                                        className="size-5 rounded border-border dark:border-[#3a2e22] bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all" 
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-text-main dark:text-white text-base font-medium">{item.label}</p>
                                        <p className="text-text-muted text-xs">{item.sub}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <hr className="border-border dark:border-[#3a2e22]" />
                    {/* Section: Vaccination Records */}
                    <div>
                        <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">vaccines</span> Vaccination Records
                        </h3>
                        <div className="flex flex-col gap-6">
                            {/* File Upload */}
                            <div className="border-2 border-dashed border-border dark:border-[#3a2e22] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-background-light/50 dark:bg-background-dark/50 hover:bg-background-light dark:hover:bg-background-dark transition-colors cursor-pointer group">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl text-primary">upload_file</span>
                                </div>
                                <p className="text-text-main dark:text-white font-bold text-sm mb-1">Upload Records</p>
                                <p className="text-text-muted text-xs">PDF, JPG or PNG (Max 5MB)</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-text-main dark:text-white text-sm font-medium">Last Rabies Shot</label>
                                    <input 
                                        type="date" 
                                        value={formData.lastRabiesShot}
                                        onChange={(e) => updateField('lastRabiesShot', e.target.value)}
                                        className="w-full bg-background-light dark:bg-background-dark border border-border dark:border-[#3a2e22] rounded-lg px-3 py-2.5 text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm" 
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-text-main dark:text-white text-sm font-medium">Next Due Date</label>
                                    <input 
                                        type="date" 
                                        value={formData.nextVaccinationDue}
                                        onChange={(e) => updateField('nextVaccinationDue', e.target.value)}
                                        className="w-full bg-background-light dark:bg-background-dark border border-border dark:border-[#3a2e22] rounded-lg px-3 py-2.5 text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm" 
                                    />
                                </div>
                            </div>
                            {errors.vaccinationDates && (
                                <p className="text-xs text-red-500 mt-1">{errors.vaccinationDates}</p>
                            )}
                        </div>
                    </div>
                    <hr className="border-border dark:border-[#3a2e22]" />
                    {/* Section: Medical History */}
                    <div>
                         <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">medical_information</span> Medical History
                        </h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-text-main dark:text-white text-sm font-medium">Known Allergies</label>
                                <textarea 
                                    value={formData.knownAllergies}
                                    onChange={(e) => updateField('knownAllergies', e.target.value)}
                                    className="w-full bg-background-light dark:bg-background-dark border border-border dark:border-[#3a2e22] rounded-lg px-3 py-2.5 text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm min-h-[80px] resize-none" placeholder="e.g. Chicken, Grain, Pollen (Leave empty if none)"
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-text-main dark:text-white text-sm font-medium">Genetic Conditions</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-primary/20">
                                        Hip Dysplasia
                                        <button className="hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                    </span>
                                </div>
                                <input className="w-full bg-background-light dark:bg-background-dark border border-border dark:border-[#3a2e22] rounded-lg px-3 py-2.5 text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-sm" placeholder="Type to add condition..." type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Action Bar */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4 pb-12">
                    <button className="text-text-muted hover:text-text-main dark:hover:text-white text-sm font-medium py-2 px-4 transition-colors">
                        Save as Draft
                    </button>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button onClick={prevStep} className="flex-1 sm:flex-none py-3 px-6 rounded-lg border border-border dark:border-[#3a2e22] text-text-main dark:text-white bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark font-bold text-sm transition-colors">
                            Back
                        </button>
                        <button onClick={handleSubmit} className="flex-1 sm:flex-none py-3 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-md shadow-primary/20 transition-all transform hover:scale-[1.02]">
                            Complete Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </>
    );
};

export default CreateDogProfile;
