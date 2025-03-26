"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Cpu, Zap, Braces, GitMerge, Code, Server } from 'lucide-react'

export function AiTwinSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax effect for elements
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4])

  const featureItems = [
    {
      icon: <Cpu />,
      title: "AI Code Generation",
      description: "Leveraging AI to automatically generate robust Spring Boot and Java code based on high-level requirements."
    },
    {
      icon: <Zap />,
      title: "Predictive Development",
      description: "AI that learns from your coding patterns to suggest optimized approaches for backend development."
    },
    {
      icon: <Braces />,
      title: "Smart Code Reviews",
      description: "Automated analysis of code quality, performance bottlenecks, and security vulnerabilities in real-time."
    },
    {
      icon: <GitMerge />,
      title: "Automated Testing",
      description: "AI-generated comprehensive test cases for ensuring robustness of Spring Boot applications."
    },
    {
      icon: <Code />,
      title: "Natural Language to APIs",
      description: "Converting natural language descriptions directly into functional Spring Boot REST APIs."
    },
    {
      icon: <Server />,
      title: "Intelligent Infrastructure",
      description: "AI-optimized cloud infrastructure recommendations based on application patterns and requirements."
    }
  ]

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden bg-gradient-to-b from-futuristic-dark to-black"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: x1, opacity }}
          className="absolute -left-32 top-20 w-64 h-64 rounded-full bg-sejong-primary/5 blur-3xl"
        />
        <motion.div
          style={{ x: x2, opacity }}
          className="absolute -right-32 bottom-20 w-64 h-64 rounded-full bg-sejong-secondary/5 blur-3xl"
        />

        {/* Circuit board pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">AI Twin Vision</h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Exploring the future of development with AI-powered tools that enhance productivity and innovation
          </p>
        </motion.div>

        {/* Concept Visualization - Futuristic device */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-xl mx-auto h-60 mb-16"
        >
          <div className="absolute inset-0 rounded-xl overflow-hidden glass-card">
            {/* Digital interface visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-24 h-24">
                {/* Core processor visualization */}
                <motion.div
                  className="absolute inset-0 border-4 border-sejong-primary rounded-full"
                  animate={{
                    rotate: 360,
                    boxShadow: ['0 0 10px rgba(0, 85, 179, 0.5)', '0 0 20px rgba(0, 85, 179, 0.8)', '0 0 10px rgba(0, 85, 179, 0.5)']
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-2 border-2 border-sejong-secondary rounded-full"
                  animate={{
                    rotate: -360,
                    boxShadow: ['0 0 5px rgba(157, 78, 233, 0.5)', '0 0 10px rgba(157, 78, 233, 0.8)', '0 0 5px rgba(157, 78, 233, 0.5)']
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-5 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Data flow lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 h-px bg-sejong-accent/30"
                style={{
                  width: '40%',
                  transformOrigin: '0 0',
                  rotate: `${i * 45}deg`
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scaleX: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Code snippets floating */}
            <motion.div
              className="absolute bottom-5 left-5 px-3 py-2 bg-black/20 backdrop-blur-sm rounded-md text-xs font-mono text-sejong-accent"
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              AI.generate(SpringBootAPI)
            </motion.div>

            <motion.div
              className="absolute top-5 right-5 px-3 py-2 bg-black/20 backdrop-blur-sm rounded-md text-xs font-mono text-green-400"
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 4,
                delay: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {"{ optimize(performance) }"}
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {featureItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-card h-full p-6 flex flex-col">
                <div className="mb-4 p-3 rounded-full bg-sejong-primary/10 w-fit text-sejong-accent">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 flex-grow">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a href="/ai-twin" className="button-3d inline-flex">
            Explore AI Twin Concept
          </a>
        </motion.div>
      </div>
    </section>
  )
}
