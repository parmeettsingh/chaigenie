"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext"; 
import { Mic, MicOff, Volume2, VolumeX, Languages } from 'lucide-react'; 

// --- Helper Component: Interactive Order Timeline ---
const OrderTimeline = ({ status }) => {
    const steps = [
        { id: 'preparing', label: 'Order Placed', icon: '📝' },
        { id: 'brewing', label: 'Genie is Brewing', icon: '🔥' },
        { id: 'on_way', label: 'In the Air', icon: '🧞‍♂️' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white/5 border-b border-white/10 mb-2 backdrop-blur-md"
        >
            <div className="flex justify-between relative">
                {steps.map((step, idx) => {
                    const isActive = steps.findIndex(s => s.id === status) >= idx;
                    return (
                        <div key={step.id} className="flex flex-col items-center z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                                isActive ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'bg-slate-800 text-white/40'
                            }`}>
                                {step.icon}
                            </div>
                            <span className={`text-[7px] mt-1 uppercase font-black tracking-tighter ${isActive ? 'text-yellow-400' : 'text-white/30'}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
                <div className="absolute top-4 left-0 w-full h-[2px] bg-white/5 -z-0" />
            </div>
        </motion.div>
    );
};

const GenieChat = () => {
    const { data: session } = useSession();
    const { addToCart } = useCart(); 
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'genie', text: 'Salam! I am the Chai Genie. What is your wish today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMuted, setIsMuted] = useState(false); 
    const [lang, setLang] = useState('en'); // --- Feature 1: Language State ---
    const [orderStatus, setOrderStatus] = useState(null); 
    const scrollRef = useRef(null);

    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    const pastOrders = "Masala Chai, Bun Maska";

    // --- Translation Dictionary ---
    const translations = {
        en: {
            greeting: "Salam! I am the Chai Genie. What is your wish today?",
            teaTime: "It is your tea time! Shall I prepare your usual Masala Chai?",
            morning: "A fresh morning wish? What chai shall we start with?",
            error: "The lamp is flickering... Please try your wish again!",
            placeholder: "Type your wish...",
            thinking: "The Genie is thinking...",
            added: "✨ It is done! I have added it to your tray."
        },
        hi: {
            greeting: "नमस्ते! मैं चाय जिन्न हूँ। आज आपकी क्या इच्छा है?",
            teaTime: "यह आपकी चाय का समय है! क्या मैं आपकी सामान्य मसाला चाय तैयार करूँ?",
            morning: "एक ताज़ा सुबह की इच्छा? हम किस चाय से शुरुआत करें?",
            error: "दीपक टिमटिमा रहा है... कृपया अपनी इच्छा फिर से आजमाएं!",
            placeholder: "अपनी इच्छा लिखें...",
            thinking: "जिन्न सोच रहा है...",
            added: "✨ हो गया! मैंने इसे आपकी ट्रे में जोड़ दिया है।"
        }
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recog = new SpeechRecognition();
            recog.continuous = false;
            recog.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'; 

            recog.onstart = () => setIsListening(true);
            recog.onend = () => setIsListening(false);
            
            recog.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
            };
            setRecognition(recog);
        }
    }, [lang]); // Re-init recognition when language changes

    const speak = (text) => {
        if (typeof window !== 'undefined' && window.speechSynthesis && !isMuted) {
            window.speechSynthesis.cancel(); 
            const cleanText = text.replace(/\[ADD_TO_CART:.*\]/g, '').replace(/✨|🧞‍♂️|🕯️|🚀/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'; // Switch voice language
            utterance.rate = 0.95; 
            utterance.pitch = 1.0; 
            window.speechSynthesis.speak(utterance);
        }
    };

    // --- UPDATED PREDICTIVE GREETING WITH LOCALIZATION ---
    useEffect(() => {
        if (isOpen && messages.length <= 1) {
            const hour = new Date().getHours();
            const userName = session?.user?.name?.split(" ")[0] || (lang === 'hi' ? "दोस्त" : "Friend");
            let greeting = lang === 'hi' ? `नमस्ते, ${userName}! ` : `Salam, ${userName}! `;
            
            if (hour >= 15 && hour <= 18) {
                greeting += translations[lang].teaTime;
            } else if (hour >= 5 && hour <= 11) {
                greeting += translations[lang].morning;
            } else {
                greeting += translations[lang].greeting;
            }
            
            setMessages([{ role: 'genie', text: greeting }]);
            speak(greeting);
        }
    }, [isOpen, lang]); // Re-run if language is toggled

    const toggleVoiceInput = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    useEffect(() => {
        if (isOpen && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading, isOpen]);

    const handleSend = async (e, textOverride = null) => {
        if (e) e.preventDefault();
        const messageToSend = textOverride || input;
        
        if (!messageToSend.trim() || isLoading) return;

        const userMsg = { role: 'user', text: messageToSend };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({
                    message: messageToSend,
                    userData: {
                        name: session?.user?.name || "Guest",
                        pastOrders: pastOrders,
                        preferredLanguage: lang // Pass lang to AI
                    },
                    history: messages
                        .filter((m, i) => !(i === 0 && m.role === 'genie')) 
                        .map(m => ({
                            role: m.role === 'genie' ? 'model' : 'user',
                            parts: [{ text: m.text }]
                        }))
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.reply);

            let genieReply = data.reply;

            if (genieReply.includes("[ADD_TO_CART:")) {
                const itemName = genieReply.split("[ADD_TO_CART:")[1].split("]")[0].trim();
                const menuMapping = {
                    "Masala Chai": { id: 'm1', name: 'Masala Chai', price: 20 },
                    "Kesar Pista Chai": { id: 'm2', name: 'Kesar Pista Chai', price: 25 },
                    "Samosa": { id: 'm3', name: 'Samosa', price: 15 },
                    "Bun Maska": { id: 'm4', name: 'Bun Maska', price: 30 }
                };

                if (menuMapping[itemName]) {
                    addToCart(menuMapping[itemName]);
                    genieReply = genieReply.replace(/\[ADD_TO_CART:.*\]/, translations[lang].added);
                    setOrderStatus('preparing');
                    setTimeout(() => setOrderStatus('brewing'), 3000);
                    setTimeout(() => setOrderStatus('on_way'), 8000);
                }
            }

            speak(genieReply);
            setMessages(prev => [...prev, { role: 'genie', text: genieReply }]);
        } catch (error) {
            const errorMsg = translations[lang].error;
            speak(errorMsg);
            setMessages(prev => [...prev, { role: 'genie', text: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] h-[500px] bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="bg-yellow-400 p-5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🧞‍♂️</span>
                                <div>
                                    <h3 className="text-black font-black text-xs uppercase tracking-widest">Chai Genie</h3>
                                    <p className="text-black/60 text-[8px] font-bold uppercase">{lang === 'en' ? 'Online & Brewing' : 'ऑनलाइन और तैयार'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Language Toggle Button */}
                                <button 
                                    onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                                    className="p-1.5 rounded-lg bg-black/10 text-black hover:bg-black/20 transition-all flex items-center gap-1"
                                >
                                    <Languages size={14} />
                                    <span className="text-[10px] font-bold">{lang.toUpperCase()}</span>
                                </button>
                                <button onClick={() => setIsMuted(!isMuted)} className="text-black/40 hover:text-black transition-colors">
                                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </button>
                                <button
                                    onClick={() => {
                                        setMessages([{ role: 'genie', text: lang === 'en' ? 'Thy history is erased.' : 'आपका इतिहास मिटा दिया गया है।' }]);
                                        setOrderStatus(null);
                                        window.speechSynthesis.cancel();
                                    }}
                                    className="text-black/40 hover:text-black transition-colors"
                                >
                                    🧹
                                </button>
                            </div>
                        </div>

                        {orderStatus && <OrderTimeline status={orderStatus} />}

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-white">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'user'
                                        ? 'bg-yellow-400 text-black rounded-tr-none'
                                        : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 text-white p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {!isLoading && messages.length < 5 && (
                            <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
                                {(lang === 'en' ? ['Show Menu', 'Add Masala Chai', 'Best Seller?'] : ['मेन्यू दिखाओ', 'मसाला चाय जोड़ें', 'बेस्ट सेलर?']).map((cmd) => (
                                    <button
                                        key={cmd}
                                        onClick={() => handleSend(null, cmd)}
                                        className="whitespace-nowrap bg-white/5 border border-white/10 text-[10px] text-white px-3 py-1.5 rounded-full hover:bg-yellow-400 hover:text-black transition-all"
                                    >
                                        {cmd}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSend} className="p-4 border-t border-white/5 flex gap-2 bg-slate-900/50">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isLoading ? translations[lang].thinking : translations[lang].placeholder}
                                disabled={isLoading}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-yellow-400 transition-all disabled:opacity-50"
                            />
                            
                            <button
                                type="button"
                                onClick={toggleVoiceInput}
                                disabled={isLoading}
                                className={`p-2 rounded-xl transition-all flex items-center justify-center min-w-[40px] ${
                                    isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-white/5 text-yellow-400 border border-white/10 hover:border-yellow-400'
                                }`}
                            >
                                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`p-2 rounded-xl transition-all flex items-center justify-center min-w-[40px] ${isLoading ? 'bg-white/5' : 'bg-yellow-400 text-black'}`}
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                                ) : (
                                    '🚀'
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-[0_10px_30px_-5px_rgba(250,204,21,0.5)] border-4 border-slate-950 relative z-[101]"
            >
                {isOpen ? '❌' : '🧞‍♂️'}
            </motion.button>
        </div>
    );
};

export default GenieChat;