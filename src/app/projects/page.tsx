"use client"

import React, { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Github,
  ExternalLink,
  Code,
  Server,
  Database,
  Calendar,
  Clock,
  Users,
  Layers
} from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Add more projects to expand the collection
const projects = [
  {
    id: 1,
    title: "Sejong Course Registration API",
    description: "Developed a high-performance REST API for Sejong University's course registration system with 99.9% uptime during peak registration periods (15,000+ concurrent users).",
    longDescription: "This Spring Boot application handles the university's entire course registration process with JWT authentication, role-based access control, and integration with the student information system. Implemented circuit breakers and rate limiting to handle traffic spikes during registration periods.",
    tags: ["Spring Boot", "JPA", "REST API", "JWT", "Redis"],
    skills: [
      { name: "Spring Boot", level: 92 },
      { name: "Database Design", level: 88 },
      { name: "API Security", level: 85 }
    ],
    date: "Jan 2023 - May 2023",
    teamSize: "3 developers",
    image: "https://www.fau.edu/global/goabroad/images/kusmain.jpg",
    github: "https://github.com/yourusername/sejong-course-api",
    demo: "https://api-demo.sejong-dev.com",
    architecture: "https://microservices.io/i/Microservice_Architecture.png",
    featured: true,
    keyFeatures: [
      "User authentication with JWT and role-based access control",
      "Real-time course availability updates with WebSockets",
      "Automated waiting list management",
      "Rate limiting to prevent system overload during peak periods",
      "Integration with student information system"
    ]
  },
  {
    id: 2,
    title: "Campus Cloud - Distributed Task Manager",
    description: "A microservices-based system that helps students manage group projects with real-time updates, automated task assignment, and progress tracking.",
    longDescription: "Built with Spring Cloud, this system features service discovery via Eureka, load balancing with Ribbon, and circuit breaking with Resilience4j. The microservices communicate through both REST and message queues, with event-sourcing for audit trails.",
    tags: ["Microservices", "Spring Cloud", "Docker", "Kubernetes", "Kafka"],
    skills: [
      { name: "Microservices", level: 90 },
      { name: "Docker/K8s", level: 85 },
      { name: "Event Sourcing", level: 78 }
    ],
    date: "Jun 2023 - Sep 2023",
    teamSize: "4 developers",
    image: "http://en.sejong.ac.kr/_res/sejong/eng/img/%EC%A0%84%EA%B2%BD%EC%82%AC%EC%A7%84.jpg",
    github: "https://github.com/yourusername/campus-cloud",
    demo: "https://campus-cloud.demo.app",
    architecture: "https://media.dashdevs.com/images/Monolythic-Architecture-vs-Microservices-Architecture-Comparison-1.jpg",
    featured: true,
    keyFeatures: [
      "Service discovery with Eureka",
      "Circuit breaking for fault tolerance",
      "Event sourcing for audit logs",
      "Real-time notifications via WebSockets",
      "Auto-scaling with Kubernetes"
    ]
  },
  {
    id: 3,
    title: "Sejong Housing Connector",
    description: "Full-stack application connecting students with housing options near campus, featuring real-time availability, virtual tours, and secure payment processing.",
    longDescription: "This application uses Spring Boot for the backend and React for the frontend. It integrates with NaverMaps API for location services, implements WebSockets for real-time notifications, and uses Spring Security with OAuth2 for authentication.",
    tags: ["Spring Boot", "React", "PostgreSQL", "WebSocket", "NaverMaps API"],
    skills: [
      { name: "Full Stack Dev", level: 87 },
      { name: "Geo Integration", level: 83 },
      { name: "Real-time Systems", level: 80 }
    ],
    date: "Oct 2023 - Jan 2024",
    teamSize: "2 developers",
    image: "https://i.ytimg.com/vi/Ozxa291e0Aw/maxresdefault.jpg",
    github: "https://github.com/yourusername/housing-connector",
    demo: "https://housing.sejong-projects.com",
    architecture: "https://www.montecarlodata.com/wp-content/uploads/2022/10/data-microservice-architecture.webp",
    featured: false,
    keyFeatures: [
      "Interactive map with housing options",
      "Virtual tours using 360° images",
      "Secure payment processing",
      "Landlord verification system",
      "Review and rating system"
    ]
  },
  {
    id: 4,
    title: "Smart Campus IoT Platform",
    description: "Developed an IoT platform for monitoring and analyzing campus energy usage, classroom occupancy, and environmental conditions to support Sejong University's smart campus initiative.",
    longDescription: "This platform collects data from hundreds of IoT sensors around campus and provides real-time analytics and visualizations. It uses a microservices architecture with Kafka for real-time data processing and InfluxDB for time-series data storage.",
    tags: ["IoT", "Spring Boot", "Kafka", "InfluxDB", "Grafana"],
    skills: [
      { name: "IoT Integration", level: 82 },
      { name: "Real-time Analytics", level: 89 },
      { name: "Time-series DB", level: 85 }
    ],
    date: "Feb 2024 - Present",
    teamSize: "5 developers",
    image: "https://i.ytimg.com/vi/PWEfvxlARPE/maxresdefault.jpg",
    github: "https://github.com/yourusername/smart-campus",
    demo: "https://smart-campus.sejong-projects.com",
    architecture: "https://microservices.io/i/posts/microservices-teams-subdomains.png",
    featured: false,
    keyFeatures: [
      "Real-time energy usage monitoring",
      "Classroom occupancy tracking",
      "Environmental conditions monitoring",
      "Anomaly detection for maintenance alerts",
      "Integration with campus facility management systems"
    ]
  },
  {
    id: 5,
    title: "Sejong Academic Research Repository",
    description: "Created a digital repository for academic research papers and projects by Sejong University students and faculty, with advanced search, citation tools, and version control.",
    longDescription: "This platform provides a centralized repository for all academic papers, theses, and research projects from Sejong University. It features advanced search capabilities, automatic citation generation, and integration with academic databases like Google Scholar and Scopus.",
    tags: ["Spring Boot", "Elasticsearch", "MongoDB", "React", "Docker"],
    skills: [
      { name: "Search Engineering", level: 88 },
      { name: "Document Management", level: 92 },
      { name: "Data Integration", level: 81 }
    ],
    date: "Jul 2023 - Dec 2023",
    teamSize: "3 developers",
    image: "http://en.sejong.ac.kr/_res/sejong/eng/img/main_en_sejong_visual_20220726.jpg",
    github: "https://github.com/yourusername/academic-repository",
    demo: "https://research.sejong-projects.com",
    architecture: "https://www.mindinventory.com/blog/wp-content/uploads/2023/05/Microservices-Vs-APIs-Clear-Differences.webp",
    featured: false,
    keyFeatures: [
      "Advanced full-text search with Elasticsearch",
      "Automatic citation generation in multiple formats",
      "Version control for research papers",
      "Integration with academic databases",
      "Analytics for tracking research impact"
    ]
  }
]

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [showArchitecture, setShowArchitecture] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.5s';
  };

  const toggleArchitecture = (id: number) => {
    if (showArchitecture === id) {
      setShowArchitecture(null);
    } else {
      setShowArchitecture(id);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-futuristic-dark">
      <Navigation />

      <div className="container px-4 mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">My Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of backend development projects featuring Spring Boot, microservices, and modern architecture patterns
          </p>
        </motion.div>

        {/* Featured Projects */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
            <Badge variant="outline" className="bg-sejong-primary/20 text-sejong-accent border-sejong-primary/30">
              Most Impactful
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.filter(project => project.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div
                  className="glass-card overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 p-6 z-10">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs rounded-md bg-sejong-primary/20 text-sejong-accent border border-sejong-primary/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-300">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-300 mb-6">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={16} />
                        <span className="text-sm">{project.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users size={16} />
                        <span className="text-sm">{project.teamSize}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {project.skills.map((skill, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-sejong-accent">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-1.5"
                            style={{
                              background: 'rgba(255,255,255,0.1)',
                              '--progress-foreground': 'var(--sejong-accent)'
                            } as React.CSSProperties}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => toggleArchitecture(project.id)}
                        className="flex items-center gap-2 text-sejong-accent hover:underline text-sm"
                      >
                        <Server size={14} />
                        {showArchitecture === project.id ? 'Hide Architecture' : 'View Architecture'}
                      </button>

                      <div className="flex gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                          <Github size={18} />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>

                    <AnimatePresence>
                      {showArchitecture === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 overflow-hidden"
                        >
                          <div className="rounded-md overflow-hidden border border-white/10 bg-black/30">
                            <div className="p-2 bg-black/60 text-xs text-gray-400 flex items-center gap-2">
                              <Layers size={14} />
                              Architecture Diagram
                            </div>
                            <Image
                              src={project.architecture}
                              alt="Architecture Diagram"
                              width={600}
                              height={300}
                              className="w-full object-contain bg-black/20 p-4"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* All Projects */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">All Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <div className="glass-card h-full rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      {project.featured && (
                        <Badge variant="outline" className="bg-sejong-primary/30 text-sejong-accent border-sejong-primary/40">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.description.substring(0, 120)}...</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-sejong-primary/10 text-sejong-accent px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-auto">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {project.date.split(' - ')[0]}
                      </span>

                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          title="GitHub Repository"
                        >
                          <Github size={16} />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Project Statistics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 glass-card p-8 rounded-lg border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Project Statistics</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-sejong-accent mb-2">{projects.length}</div>
              <div className="text-gray-400">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sejong-accent mb-2">14</div>
              <div className="text-gray-400">Technologies Used</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sejong-accent mb-2">3,500+</div>
              <div className="text-gray-400">Commits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sejong-accent mb-2">94%</div>
              <div className="text-gray-400">Test Coverage</div>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  )
}
