// "use client";
//
// import {useCallback, useEffect, useRef, useState} from "react";
// import {AnimatePresence, motion} from "framer-motion";
// import {Volume2, VolumeX} from "lucide-react";
// import Speech from 'speak-tts';
//
// export function VoiceGreeting() {
//     const [isVisible, setIsVisible] = useState(true);
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [speech, setSpeech] = useState(null);
//     const [isSupported, setIsSupported] = useState(true);
//     const [isInitialized, setIsInitialized] = useState(false);
//     // Add a manual interact state to track user interaction
//     const [hasInteracted, setHasInteracted] = useState(false);
//     const greetingText = "Hi. I'm Mark, your marketing expert!";
//     const initAttempted = useRef(false);
//
//     // Check if the page has been interacted with
//     useEffect(() => {
//         const handleInteraction = () => {
//             setHasInteracted(true);
//             // Remove listeners after first interaction
//             window.removeEventListener('click', handleInteraction);
//             window.removeEventListener('touchstart', handleInteraction);
//             window.removeEventListener('keydown', handleInteraction);
//             window.removeEventListener('scroll', handleInteraction);
//         };
//
//         // Chrome specific: check if the page is visible and not a background tab
//         if (document.visibilityState === 'visible') {
//             // This is a bit of a hack, but helps on Chrome specifically
//             setTimeout(() => {
//                 setHasInteracted(true);
//             }, 100);
//         }
//
//         return () => {
//             window.removeEventListener('click', handleInteraction);
//             window.removeEventListener('touchstart', handleInteraction);
//             window.removeEventListener('keydown', handleInteraction);
//             window.removeEventListener('scroll', handleInteraction);
//         };
//     }, []);
//
//     // Initialize speech engine only once
//     useEffect(() => {
//         let isMounted = true;
//
//         const initSpeech = async () => {
//             // Prevent multiple initialization attempts
//             if (initAttempted.current) return;
//             initAttempted.current = true;
//
//             const speechInstance = new Speech();
//
//             if (speechInstance.hasBrowserSupport()) {
//                 try {
//                     await speechInstance.init({
//                         volume: 1,
//                         lang: 'en-US',
//                         rate: 0.85,
//                         pitch: 1.2,
//                         voice: null,
//                         splitSentences: true,
//                         listeners: {
//                             onvoiceschanged: (voices) => {
//                                 console.log('Voices changed', voices);
//                             }
//                         }
//                     });
//
//                     if (isMounted) {
//                         setSpeech(speechInstance);
//                         setIsInitialized(true);
//                     }
//                 } catch (e) {
//                     console.error('Speech initialization failed', e);
//                     if (isMounted) {
//                         setIsSupported(false);
//                     }
//                 }
//             } else {
//                 if (isMounted) {
//                     setIsSupported(false);
//                 }
//             }
//         };
//
//         // Only initialize if the component is mounted and we have interaction
//         if (hasInteracted) {
//             // Delay initialization slightly to ensure browser is ready
//             setTimeout(() => {
//                 initSpeech();
//             }, 100);
//         }
//
//         return () => {
//             isMounted = false;
//             // Only attempt to cancel if speech has been initialized
//             if (speech) {
//                 speech.cancel();
//             }
//         };
//     }, [hasInteracted]);
//
//     // Speak greeting in a separate effect that runs after initialization
//     useEffect(() => {
//         // Only proceed if speech is initialized, component is visible, and we have interaction
//         if (!speech || !isInitialized || !isVisible || !hasInteracted) return;
//
//         const speakNow = async () => {
//             try {
//                 setIsSpeaking(true);
//                 console.log('speakNow')
//                 await speech.speak({
//                     text: greetingText,
//                     queue: false,
//                     listeners: {
//                         start: () => setIsSpeaking(true),
//                         end: () => setIsSpeaking(false),
//                         error: (e) => {
//                             console.error('Speech error', e);
//                             setIsSpeaking(false);
//                         }
//                     }
//                 });
//             } catch (e) {
//                 console.error('Speaking failed', e);
//                 setIsSpeaking(false);
//             }
//         };
//
//         // Small delay to ensure browser is ready
//         const timer = setTimeout(() => {
//             speakNow();
//         }, 100);
//
//         return () => clearTimeout(timer);
//     }, [speech, isInitialized, isVisible, hasInteracted, greetingText]);
//
//     // Create manual trigger button to work around autoplay policies
//     const handleManualSpeak = useCallback(() => {
//         if (speech && isInitialized) {
//             speech.speak({
//                 text: greetingText,
//                 queue: false,
//                 listeners: {
//                     start: () => setIsSpeaking(true),
//                     end: () => setIsSpeaking(false),
//                     error: (e: Error) => {
//                         console.error('Speech error', e);
//                         setIsSpeaking(false);
//                     }
//                 }
//             });
//         }
//         setHasInteracted(true);
//     }, [speech, isInitialized, greetingText]);
//
//     // Auto-hide after 8 seconds (extended to give more time for initialization)
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsVisible(false);
//         }, 8000);
//
//         return () => clearTimeout(timer);
//     }, []);
//
//     if (!isSupported) {
//         return (
//             <AnimatePresence>
//                 {isVisible && (
//                     <motion.div
//                         initial={{opacity: 0, scale: 0.8, y: -20}}
//                         animate={{opacity: 1, scale: 1, y: 0}}
//                         exit={{opacity: 0, scale: 0.8, y: -20}}
//                         transition={{duration: 0.5}}
//                         className="fixed top-20 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 flex items-center gap-2"
//                     >
//                         <VolumeX className="h-5 w-5"/>
//                         <span>{greetingText}</span>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         );
//     }
//
//     return (
//         <AnimatePresence>
//             {isVisible && (
//                 <motion.div
//                     initial={{opacity: 0, scale: 0.8, y: -20}}
//                     animate={{opacity: 1, scale: 1, y: 0}}
//                     exit={{opacity: 0, scale: 0.8, y: -20}}
//                     transition={{duration: 0.5}}
//                     className="fixed top-20 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 flex items-center gap-3"
//                 >
//                     {isSpeaking ? (
//                         <Volume2 className="h-5 w-5 animate-pulse"/>
//                     ) : (
//                         <Volume2 className="h-5 w-5"/>
//                     )}
//                     <span>{greetingText}</span>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// }
