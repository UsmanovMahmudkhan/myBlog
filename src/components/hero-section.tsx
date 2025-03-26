"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from 'react-spring'
import dynamic from 'next/dynamic'

// Create the Spring Boot and Java icons as React components
const SpringIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <path
      d="M58.2,3.365a29.503,29.503,0,0,1-3.919,6.777c-9.586,12.752-30.719,17.445-30.719,17.445,0,0,0,.3.043.841,27.153-3.762,31.117,16.449,31.117,16.449s6.736-16.431-13.907-26.452c0,0-5.131-2.61-5.264-2.666C45.567,10.935,58.2,3.365,58.2,3.365Z"
      fill="#68bd45"
    />
    <path
      d="M31.633,46.193c-1.734-5.379-1.226-12.22-1.226-12.22,0,0,.316,5.51,1.059,7.677,3.462,10.035,9.873,8.918,14.664,6.5C50.15,45.563,54.025,39.93,54.025,39.93s-8.4,16.468-23.9,10.708c0,0-1.485-.646-2.378-1.3A11.876,11.876,0,0,0,31.633,46.193Z"
      fill="#68bd45"
    />
    <path
      d="M35.1,5.968A56.147,56.147,0,0,1,30.968,20.2a49.936,49.936,0,0,1-10.159,17.86,27.381,27.381,0,0,0-3.493,5.557A32.361,32.361,0,0,0,14.96,53.266a7.753,7.753,0,0,0,.215,2.2c.142.36,0,0,1.566.324,0,0-.7-2.667.984-9.476C19.5,39.549,33.917,19.319,35.1,5.968Z"
      fill="#68bd45"
    />
  </svg>
)

const JavaIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"></path>
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"></path>
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"></path>
    <path fill="#EA2D2E" d="M76.491 1.587s12.968 12.976-12.303 32.923c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815 8.548-12.834 32.229-19.059 26.998-39.667z"></path>
    <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 0 2.875 2.381 17.647 3.331z"></path>
  </svg>
)

// Dynamically import the particles component to avoid hydration mismatch
const HeroParticles = dynamic(() => import('./hero-particles').then(mod => mod.HeroParticles), {
  ssr: false,
  loading: () => <div className="absolute inset-0 opacity-30"></div>
})

// Dynamically import heavy components
const CodeBlock = dynamic(() => import('./code-block').then(mod => mod.CodeBlock), {
  ssr: true,
  loading: () => <div className="glowing-card max-w-lg w-full mx-auto p-4 font-mono text-sm md:text-base transform perspective-1000 skeleton-pulse"></div>
})

export function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Calculate mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!parallaxRef.current) return

    const { width, height } = parallaxRef.current.getBoundingClientRect()
    const offsetX = (e.clientX - width / 2) / width
    const offsetY = (e.clientY - height / 2) / height

    setMousePosition({ x: offsetX * 30, y: offsetY * 30 }) // Increased effect strength
  }

  // Track scroll position for additional effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Throttle scroll event for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll)
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  // Enhanced spring animations for the floating elements
  const springProps = useSpring({
    transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) rotate(${mousePosition.x * 0.05}deg)`,
    config: { mass: 10, tension: 350, friction: 40 }
  })

  const nameSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 300,
    config: { tension: 200, friction: 40 }
  })

  // Update the name glow animation with subtler effect
  const nameGlowAnimation = {
    textShadow: [
      '0 0 3px rgba(255,255,255,0.4), 0 0 7px rgba(138, 43, 226, 0.4), 0 0 10px rgba(30, 144, 255, 0.3)',
      '0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(138, 43, 226, 0.5), 0 0 15px rgba(30, 144, 255, 0.4)',
      '0 0 3px rgba(255,255,255,0.4), 0 0 7px rgba(138, 43, 226, 0.4), 0 0 10px rgba(30, 144, 255, 0.3)'
    ]
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden perspective-1000"
      ref={parallaxRef}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Background Layer with 3D depth */}
      <div className="absolute inset-0 bg-gradient-radial from-futuristic-dark to-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {/* Grid pattern with perspective effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              transform: `perspective(1000px) rotateX(${scrollY * 0.02}deg)`
            }}
          />
        </div>
      </div>

      {/* 3D Particles effect - Now using client-only component */}
      <HeroParticles />

      {/* Floating Elements with enhanced 3D effect */}
      <animated.div
        style={springProps}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Spring Boot icon with 3D rotation */}
        <motion.div
          className="absolute w-24 h-24 top-1/4 left-1/4 opacity-40 floating-element"
          style={{
            filter: "drop-shadow(0 0 8px rgba(104, 189, 69, 0.4))",
            transform: "perspective(1000px)"
          }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 15, 0],
            rotateX: [0, 10, 0],
            z: [0, 20, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <SpringIcon />
        </motion.div>

        {/* Java icon with 3D rotation */}
        <motion.div
          className="absolute w-20 h-20 top-1/3 right-1/4 opacity-40 floating-element"
          style={{
            filter: "drop-shadow(0 0 8px rgba(234, 45, 46, 0.4))",
            transform: "perspective(1000px)"
          }}
          animate={{
            y: [0, -15, 0],
            rotateY: [0, -15, 0],
            rotateX: [0, 5, 0],
            z: [0, 15, 0]
          }}
          transition={{
            duration: 5,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <JavaIcon />
        </motion.div>

        {/* Enhanced glowing orbs with 3D effect */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-sejong-primary/10 blur-2xl"
          style={{
            top: '35%',
            left: '60%',
            filter: "drop-shadow(0 0 15px rgba(104, 189, 69, 0.5))"
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            z: [0, 30, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-40 h-40 rounded-full bg-sejong-secondary/10 blur-3xl"
          style={{
            top: '65%',
            left: '25%',
            filter: "drop-shadow(0 0 15px rgba(234, 45, 46, 0.5))"
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            z: [0, 20, 0]
          }}
          transition={{
            duration: 8,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </animated.div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-1 gradient-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Backend Developer
          <motion.div
            animate={nameGlowAnimation}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative mt-2"
          >
            <animated.span
              style={nameSpring}
              className="block text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 font-bold tracking-wide"
            >
              Usmonov Mahmudkhon
            </animated.span>
            <div className="absolute inset-0 blur-sm opacity-40 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-lg -z-10"></div>
          </motion.div>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Passionate about creating robust backend solutions with Java and Spring Boot.
        </motion.p>

        {/* Enhanced 3D Code Block - now using dynamic import */}
        <CodeBlock />

        {/* Enhanced 3D CTA Button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          <button className="button-3d relative overflow-hidden group">
            <span className="relative z-10">Explore Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-[length:10px_10px] bg-grid-white/10 group-hover:bg-[length:8px_8px] transition-all duration-500"></div>
          </button>
        </motion.div>
      </div>

      {/* Enhanced 3D Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center"
          animate={{
            y: [0, 10, 0],
            rotateX: [0, 10, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{
              y: [0, 15, 0],
              boxShadow: [
                "0 0 0px rgba(255,255,255,0.5)",
                "0 0 8px rgba(255,255,255,0.8)",
                "0 0 0px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
