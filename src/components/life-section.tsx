"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Award, Calendar, Code, Coffee, MapPin, BookOpen, Terminal, Heart, ChevronRight } from 'lucide-react'

// Real campus images
const campusImages = [
  {
    id: 1,
    url: "http://en.sejong.ac.kr/_res/sejong/eng/img/%EC%A0%84%EA%B2%BD%EC%82%AC%EC%A7%84.jpg",
    alt: "Sejong University Campus",
    caption: "The iconic Sejong University clocktower and main building"
  },
  {
    id: 2,
    url: "https://i.ytimg.com/vi/Ozxa291e0Aw/maxresdefault.jpg",
    alt: "Campus Tour",
    caption: "Cherry blossom season at Sejong University"
  },
  {
    id: 3,
    url: "https://studyabroad.temple.edu/sites/studyabroad/files/styles/tu_image_style_profile/public/media/image/2._Sejong_University_re.jpg?h=a000b9b7&itok=qezjtGpt&v=217371",
    alt: "Study Time",
    caption: "The Computer Science department building"
  },
  {
    id: 4,
    url: "https://i.ytimg.com/vi/PWEfvxlARPE/maxresdefault.jpg",
    alt: "Campus View",
    caption: "Sunset view from the engineering building"
  }
]

// Added more detailed life events that feel personal
const lifeEvents = [
  {
    id: 1,
    title: "Hackathon Champion",
    date: "October 2023",
    description: "Won the grand prize at the Seoul Tech Hackathon with a microservices-based application for connecting international students with local mentors.",
    icon: <Award className="text-yellow-400" />,
    location: "Seoul Digital Forum",
    image: "",
    achievement: "Grand Prize",
    skills: ["Spring Boot", "React", "API Design", "Team Leadership"]
  },
  {
    id: 2,
    title: "Spring Boot Workshop Leader",
    date: "March 2023 - Present",
    description: "Organize and lead monthly workshops teaching Spring Boot and microservices architecture to over 40 students from various departments at Sejong University.",
    icon: <Terminal className="text-green-400" />,
    location: "Sejong University CS Lab",
    achievement: "Trained 200+ students",
    skills: ["Technical Training", "Public Speaking", "Curriculum Design"]
  },
  {
    id: 3,
    title: "Backend Developer Internship",
    date: "June 2023 - August 2023",
    description: "Developed and optimized RESTful APIs for a major Korean e-commerce platform, focusing on payment processing and inventory management systems.",
    icon: <Code className="text-blue-400" />,
    location: "Naver, Seongnam",
    achievement: "5x API Performance Improvement",
    skills: ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL"]
  },
  {
    id: 4,
    title: "Open Source Contributor",
    date: "January 2023 - Present",
    description: "Active contributor to several open-source Java libraries focused on API development and performance optimization. Created popular utility library for simplified pagination handling in Spring Boot applications.",
    icon: <Heart className="text-red-400" />,
    achievement: "500+ GitHub Stars",
    skills: ["Java", "Open Source", "Testing", "Documentation"]
  }
]

// Korean festivals and events attended
const koreanExperiences = [
  { name: "Busan Film Festival", description: "Volunteered as a technical support staff" },
  { name: "Boryeong Mud Festival", description: "Participated with international students" },
  { name: "Seoul Lantern Festival", description: "Created a tech-themed lantern display" },
  { name: "Kimchi Making Festival", description: "Learned traditional kimchi preparation" }
]

// Korean tech communities involved with
const techCommunities = [
  "Seoul Java Developers",
  "Korea Spring User Group",
  "Microservices Korea",
  "Backend Developer Café Seoul"
]

export function LifeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax effect for the backgrounds
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // State for expanded timeline items
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // Fix hydration error: initialize activeImage as null and set it only on the client
  const [activeImage, setActiveImage] = useState<number | null>(null);

  // Initialize activeImage on the client side only to prevent hydration mismatch
  useEffect(() => {
    setActiveImage(0);
  }, []);

  // Function to toggle expanded state of timeline items
  const toggleExpand = (id: number) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden bg-futuristic-dark"
    >
      {/* Korean-inspired decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-4 border-sejong-accent blur-sm"></div>
        <div className="absolute top-40 left-10 w-20 h-40 border-2 border-sejong-secondary transform rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full border-2 border-sejong-primary"></div>

        {/* Korean wave pattern - subtle nod to traditional designs */}
        <svg
          className="absolute bottom-0 left-0 w-full h-40 text-sejong-primary opacity-5"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">My Journey at Sejong</h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Academic achievements, tech communities, and cultural experiences that have shaped my development as a backend specialist
          </p>
        </motion.div>

        {/* Interactive Image Gallery - only render when activeImage is set (client-side) */}
        {activeImage !== null && (
          <motion.div
            style={{ y: backgroundY }}
            className="mb-20"
          >
            <div className="flex justify-center mb-6">
              <div className="relative overflow-hidden rounded-lg w-full max-w-3xl aspect-video shadow-xl">
                <div className="w-full h-full">
                  <Image
                    src={campusImages[activeImage].url}
                    alt={campusImages[activeImage].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
                    <h3 className="text-lg font-bold">{campusImages[activeImage].alt}</h3>
                    <p>{campusImages[activeImage].caption}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              {campusImages.map((image, index) => (
                <motion.button
                  key={image.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden relative ${activeImage === index ? 'ring-2 ring-sejong-accent' : 'opacity-70'}`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Timeline with animation and interactivity */}
        <div className="relative mt-20 space-y-0">
          <h3 className="text-2xl font-bold text-center mb-12 text-sejong-accent">Professional Timeline</h3>

          <div className="relative pl-8 border-l-2 border-sejong-primary/30 space-y-10">
            {lifeEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute top-0 -left-[41px] h-10 w-10 rounded-full bg-sejong-primary/20 border-2 border-sejong-primary flex items-center justify-center">
                  {event.icon}
                </div>

                <Card
                  className={`glass-card overflow-hidden transition-all duration-300 ${expandedItem === event.id ? 'shadow-lg shadow-sejong-primary/20' : ''}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-sejong-accent flex items-center gap-1">
                          <Calendar size={14} />
                          {event.date}
                        </span>

                        {event.location && (
                          <span className="text-gray-400 flex items-center gap-1">
                            <MapPin size={14} />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-400 mb-3">{event.description}</p>

                    {event.achievement && (
                      <div className="inline-block px-3 py-1 bg-sejong-primary/20 text-sejong-accent rounded-full text-sm font-medium mb-3">
                        {event.achievement}
                      </div>
                    )}

                    <button
                      onClick={() => toggleExpand(event.id)}
                      className="flex items-center gap-1 text-sejong-accent/80 hover:text-sejong-accent text-sm mt-2"
                    >
                      <span>{expandedItem === event.id ? 'Show less' : 'Show more'}</span>
                      <ChevronRight size={14} className={`transition-transform ${expandedItem === event.id ? 'rotate-90' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {expandedItem === event.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/10">
                            {event.skills && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-300 mb-2">Skills Developed:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {event.skills.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-sejong-primary/10 text-sejong-accent/80 rounded text-xs"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {event.image && (
                              <div className="relative h-32 rounded-md overflow-hidden">
                                <Image
                                  src={event.image}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Korean culture and tech community integration */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Coffee className="text-orange-400" />
              <span>Korean Cultural Experiences</span>
            </h3>

            <ul className="space-y-3">
              {koreanExperiences.map((exp, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-sejong-accent mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">{exp.name}</span>
                    <p className="text-sm text-gray-400">{exp.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-400" />
              <span>Tech Communities</span>
            </h3>

            <ul className="space-y-3">
              {techCommunities.map((community, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-white/5 transition-colors"
                >
                  <span className="h-2 w-2 rounded-full bg-sejong-accent"></span>
                  <span>{community}</span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-gray-400 italic">
              "Engaging with local tech communities has been essential for understanding the Korean tech ecosystem and building my professional network."
            </p>
          </motion.div>
        </div>

        {/* Korean quote with enhanced styling */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <blockquote className="max-w-2xl mx-auto p-8 glass-card relative">
            <div className="absolute -top-4 -left-4 text-4xl text-sejong-accent opacity-30">"</div>
            <div className="absolute -bottom-4 -right-4 text-4xl text-sejong-accent opacity-30">"</div>

            <p className="text-gray-300 italic mb-4 font-korean text-lg">
              "배움에는 끝이 없다."
            </p>
            <p className="text-xl text-white mb-2">
              "There is no end to learning."
            </p>
            <p className="text-sm text-gray-400">
              — Korean Proverb that guides my academic journey
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
