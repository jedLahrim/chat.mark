"use client";

import {useEffect, useRef} from "react";

export function CircularAudioSpectrum({
                                          isPlaying = false,
                                          audioElement = null,
                                          onClose = () => {
                                          },
                                          size = 220
                                      }) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const dataArrayRef = useRef(new Uint8Array(128));

    // Initialize audio analyzer when component mounts or audio element changes
    useEffect(() => {
        if (!audioElement) return;

        const initAudio = () => {
            try {
                const AudioContext = window.AudioContext;
                const context = new AudioContext();
                const analyser = context.createAnalyser();

                analyser.fftSize = 256;
                analyser.smoothingTimeConstant = 0.8;

                const source = context.createMediaElementSource(audioElement);
                source.connect(analyser);
                analyser.connect(context.destination);

                audioContextRef.current = context;
                analyserRef.current = analyser;
                sourceRef.current = source;

                return true;
            } catch (error) {
                console.error("Audio visualization init error:", error);
                return false;
            }
        };

        // Clean up previous context if it exists
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }

        initAudio();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [audioElement]);

    // Handle animation state
    useEffect(() => {
        if (isPlaying && analyserRef.current) {
            startAnimation();
        } else {
            stopAnimation();
        }

        return () => stopAnimation();
    }, [isPlaying]);

    const startAnimation = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        const draw = () => {
            if (!analyserRef.current || !canvasRef.current) {
                animationRef.current = requestAnimationFrame(draw);
                return;
            }

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;

            // Get frequency data
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Base radius for the circle
            const baseRadius = Math.min(width, height) * 0.3;

            // Calculate average amplitude
            const avgAmplitude = Array.from(dataArrayRef.current)
                .reduce((sum, val) => sum + val, 0) / dataArrayRef.current.length / 255;

            // Dynamic circle properties based on audio
            const circleRadius = baseRadius * (0.8 + avgAmplitude * 0.2);
            const circleOpacity = 0.7 + avgAmplitude * 0.3;

            // Create gradient for the circle
            const gradient = ctx.createRadialGradient(
                centerX, centerY, circleRadius * 0.3,
                centerX, centerY, circleRadius
            );
            gradient.addColorStop(0, `rgba(0, 240, 255, ${circleOpacity})`);
            gradient.addColorStop(1, `rgba(64, 156, 255, ${circleOpacity * 0.7})`);

            // Draw the main circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Add pulsing glow effect
            const glowRadius = circleRadius * (1.2 + avgAmplitude * 0.3);
            const glowGradient = ctx.createRadialGradient(
                centerX, centerY, circleRadius * 0.5,
                centerX, centerY, glowRadius
            );
            glowGradient.addColorStop(0, `rgba(64, 156, 255, ${circleOpacity * 0.8})`);
            glowGradient.addColorStop(1, `rgba(64, 156, 255, 0)`);

            ctx.beginPath();
            ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();

            animationRef.current = requestAnimationFrame(draw);
        };

        animationRef.current = requestAnimationFrame(draw);
    };

    const stopAnimation = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    return (
        <div className="relative mx-auto mb-10 md:mb-40" style={{width: size, height: size}}>
            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                className="absolute"
            />
            {isPlaying && <button
                onClick={onClose}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                           bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200
                           backdrop-blur-sm border border-white/20 shadow-lg"
                style={{
                    width: size * 0.2,
                    height: size * 0.2,
                }}
                aria-label="Close greeting"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-full h-full"
                >
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>}

        </div>
    );
}
