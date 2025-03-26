"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowUpRight, Code, Github, Globe, LayoutGrid, Server } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Spring Cloud Microservices Demo',
    description: 'A comprehensive microservices ecosystem built with Spring Cloud, featuring service discovery, API gateway, circuit breakers, and distributed tracing.',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'Docker', 'Kubernetes'],
    image: 'https://ejyle.com/wp-content/uploads/2019/09/Ejyle-MicroServicesRefenceArchirtecturePart2-1024x818.png',
    skills: {
      backend: 95,
      architecture: 90,
      cloud: 85
    },
    repoUrl: 'https://github.com/username/spring-cloud-demo',
    demoUrl: 'https://spring-cloud-demo.username.dev',
    featured: true,
    architectureDiagram: 'https://miro.medium.com/v2/resize:fit:1400/1*9C5-yWt4KQO2t95TqrKTqw.png'
  },
  {
    id: 2,
    title: 'Reactive Social API',
    description: 'High-performance social network API built with WebFlux and reactive MongoDB, capable of handling high concurrency with minimal resources.',
    tech: ['Java', 'Spring WebFlux', 'Project Reactor', 'MongoDB', 'Redis'],
    image: 'https://szymonsawicki.net/wp-content/uploads/2022/04/20220416_083903_0000.png',
    skills: {
      backend: 90,
      architecture: 85,
      database: 95
    },
    repoUrl: 'https://github.com/username/reactive-social',
    demoUrl: 'https://reactive-social.username.dev',
    featured: true
  },
  {
    id: 3,
    title: 'Event-Driven Inventory System',
    description: 'Scalable inventory management system using event sourcing and CQRS patterns with Apache Kafka for event streaming.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'Axon Framework', 'PostgreSQL'],
    image: 'https://xaviergeerinck.com/wp-content/uploads/2023/08/cqrs.png',
    skills: {
      backend: 85,
      messaging: 95,
      architecture: 90
    },
    repoUrl: 'https://github.com/username/event-inventory',
    featured: false
  }
];

export function ProjectSection() {
  // State for expanded architecture diagram
  const [expandedDiagram, setExpandedDiagram] = useState<number | null>(null);

  const toggleDiagram = (projectId: number) => {
    if (expandedDiagram === projectId) {
      setExpandedDiagram(null);
    } else {
      setExpandedDiagram(projectId);
    }
  };

  return (
    <section className="py-20 bg-futuristic-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-2 border-sejong-accent/30"></div>
        <div className="absolute bottom-40 left-[15%] w-32 h-32 rounded-full border-2 border-sejong-primary/30"></div>
        <div className="absolute top-40 left-10 w-20 h-40 border border-sejong-secondary/20 transform rotate-45"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,30,50,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(25,30,50,0.3)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Enterprise-grade backend solutions and distributed systems I've built
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="glass-card overflow-hidden border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-sejong-primary/10">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-2 relative h-[200px] md:h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-sejong-primary/30 text-white/90 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-1 bg-sejong-primary/20 text-white/80 text-xs rounded-full">
                              +{project.tech.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-3 p-6 pt-0 md:pt-6 flex flex-col">
                      <p className="text-gray-400 mb-4">
                        {project.description}
                      </p>

                      {/* Skills visualization */}
                      <div className="mb-6 space-y-3">
                        {Object.entries(project.skills).map(([skill, level], idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm capitalize">{skill}</span>
                              <span className="text-xs text-sejong-accent">{level}%</span>
                            </div>
                            <Progress value={level} className="h-2" indicatorClassName="bg-gradient-to-r from-sejong-primary to-sejong-accent" />
                          </div>
                        ))}
                      </div>

                      {/* Architecture diagram toggle button */}
                      {project.architectureDiagram && (
                        <button
                          className="flex items-center gap-2 text-sejong-accent mb-4 hover:text-sejong-accent/80 transition-colors"
                          onClick={() => toggleDiagram(project.id)}
                        >
                          <Server size={16} />
                          <span>{expandedDiagram === project.id ? 'Hide Architecture Diagram' : 'View Architecture Diagram'}</span>
                        </button>
                      )}

                      {/* Expanded architecture diagram */}
                      {expandedDiagram === project.id && project.architectureDiagram && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mb-6 rounded-md overflow-hidden relative"
                        >
                          <div className="relative h-[300px] w-full">
                            <Image
                              src={project.architectureDiagram}
                              alt={`${project.title} Architecture Diagram`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="absolute top-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
                            Architecture Diagram
                          </div>
                        </motion.div>
                      )}

                      <div className="mt-auto flex gap-3 pt-4 border-t border-white/10">
                        {project.repoUrl && (
                          <Link
                            href={project.repoUrl}
                            target="_blank"
                            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-sejong-primary/10 text-sejong-accent hover:bg-sejong-primary/20 transition-colors"
                          >
                            <Github size={14} />
                            <span>Repository</span>
                          </Link>
                        )}

                        {project.demoUrl && (
                          <Link
                            href={project.demoUrl}
                            target="_blank"
                            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <Globe size={14} />
                            <span>Live Demo</span>
                          </Link>
                        )}

                        <Link
                          href={`/projects#${project.id}`}
                          className="ml-auto flex items-center gap-1 text-sm text-sejong-accent hover:text-sejong-accent/80 transition-colors"
                        >
                          <span>View Details</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-br from-sejong-primary/40 to-sejong-accent/40 text-white rounded-lg hover:shadow-lg hover:shadow-sejong-primary/20 transition-all duration-300 group"
          >
            <LayoutGrid size={16} />
            <span>Browse All Projects</span>
            <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
