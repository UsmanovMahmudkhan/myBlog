"use client"

import React, { useState, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import {
  Coffee,
  Code,
  GraduationCap,
  Utensils,
  BookOpen,
  Moon,
  Sun,
  Music,
  MapPin,
  Wand2
} from 'lucide-react'

// Campus images with real URLs
const campusImages = [
  {
    id: 1,
    url: "https://www.fau.edu/global/goabroad/images/kusmain.jpg",
    alt: "Sejong University Campus",
    caption: "The main campus building where I spent most of my time"
  },
  {
    id: 2,
    url: "https://i.ytimg.com/vi/Ozxa291e0Aw/maxresdefault.jpg",
    alt: "Cherry Blossoms at Sejong",
    caption: "Spring cherry blossoms made coding assignments slightly more bearable"
  },
  {
    id: 3,
    url: "https://i.ytimg.com/vi/PWEfvxlARPE/maxresdefault.jpg",
    alt: "Sunset View",
    caption: "The view from our dorm during those late-night coding sessions"
  },
  {
    id: 4,
    url: "http://en.sejong.ac.kr/_res/sejong/eng/img/%EC%A0%84%EA%B2%BD%EC%82%AC%EC%A7%84.jpg",
    alt: "Computer Science Building",
    caption: "The CS building where all the magic (and debugging) happens"
  }
]

// Fun stories about campus life
const campusStories = [
  {
    id: 1,
    title: "The Great Server Crash of '23",
    date: "Spring 2023",
    icon: <Code className="text-blue-400" />,
    description: "During our Database Systems final project, I accidentally deployed my test code to production. Let's just say the university's registration system wasn't prepared for 10,000 simultaneous test queries asking for 'Bobby Tables' to be enrolled in every class. The look on Professor Kim's face when he had to restore from backup is something I'll never forget.",
    lesson: "Always use a staging environment, and never trust user input - even if that user is yourself.",
    expanded: false
  },
  {
    id: 2,
    title: "Ramen-Driven Development",
    date: "Winter 2022",
    icon: <Utensils className="text-orange-400" />,
    description: "Our team had 48 hours to complete our microservices project. We barricaded ourselves in the CS lab with enough instant ramen to feed a small army. By hour 36, I was so sleep-deprived that I wrote all my variable names in Korean even though the codebase was in English. Somehow, the project worked perfectly during the demo, only to completely break down 5 minutes after the professors left. We later discovered there was a crucial environment variable named '맛있는라면' (delicious ramen) that only worked on my machine.",
    lesson: "Sleep is a crucial part of the development process, and internationalization matters.",
    expanded: false
  },
  {
    id: 3,
    title: "Lost in Translation",
    date: "Fall 2023",
    icon: <BookOpen className="text-green-400" />,
    description: "As one of the few international students in my Advanced Algorithms class, I was still getting comfortable with technical Korean. During my presentation, I meant to say I used a 'recursion technique' but instead announced I solved the problem with a 'cursing technique.' The whole class erupted in laughter, and my professor dryly commented, 'Well, that is indeed how most of us solve difficult algorithms.'",
    lesson: "Technical vocabulary is important, but a sense of humor is a universal language.",
    expanded: false
  },
  {
    id: 4,
    title: "The Legendary All-Nighter",
    date: "Summer 2023",
    icon: <Moon className="text-purple-400" />,
    description: "The night before our cloud infrastructure project was due, our entire team was working in the 24-hour lab. Around 3 AM, I was so tired that I accidentally pushed our API keys to GitHub. In a panic, I woke everyone up, and we spent the next two hours frantically rotating credentials. By sunrise, we'd not only fixed the security issue but also completely refactored the auth system to be more secure. Sometimes the best code comes from near-disasters. Our professor later used our project as an example of good security practices, completely unaware of its origin story.",
    lesson: "Never push at 3 AM without a code review, and always use environment variables for sensitive information.",
    expanded: false
  },
  {
    id: 5,
    title: "The Coffee Flood Incident",
    date: "Spring 2022",
    icon: <Coffee className="text-yellow-800" />,
    description: "I had just finished setting up my new mechanical keyboard - an expensive investment for a student. During a particularly intense debugging session, I reached for my extra-large iced Americano without looking and knocked it all over my keyboard and notes. I watched in horror as coffee dripped between the keys, making the RGB lights flicker eerily before going dark. Strangely enough, after drying out, the keyboard worked perfectly except the 'J' key, which would randomly type 'java' instead. My friends now joke that my keyboard developed sentience and is telling me what language to use.",
    lesson: "Always keep liquids far away from electronics, and maybe the universe really does want you to use Java.",
    expanded: false
  }
]

// Korean phrases I've learned
const koreanPhrases = [
  { phrase: "버그를 찾았어요", pronunciation: "beo-geu-reul chaj-ass-eo-yo", meaning: "I found a bug" },
  { phrase: "코드 리뷰 해 주세요", pronunciation: "ko-deu ri-byu hae ju-se-yo", meaning: "Please review my code" },
  { phrase: "커피가 필요해요", pronunciation: "keo-pi-ga pil-yo-hae-yo", meaning: "I need coffee" },
  { phrase: "이 코드는 무엇을 하나요?", pronunciation: "i ko-deu-neun mu-eos-eul ha-na-yo", meaning: "What does this code do?" },
  { phrase: "나중에 리팩토링하겠습니다", pronunciation: "na-jung-e ri-paek-to-ring-ha-gess-seub-ni-da", meaning: "I'll refactor it later" }
]

export default function MyLifeAtSejongPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [hoveredPhrase, setHoveredPhrase] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect for backgrounds
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const toggleStory = (id: number) => {
    if (expandedStory === id) {
      setExpandedStory(null);
    } else {
      setExpandedStory(id);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-futuristic-dark">
      <Navigation />

      <div ref={ref} className="relative overflow-x-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-4 border-sejong-accent blur-sm"></div>
          <div className="absolute top-40 left-10 w-20 h-40 border-2 border-sejong-secondary transform rotate-45"></div>
          <div className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full border-2 border-sejong-primary"></div>

          {/* Korean wave pattern */}
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

        <div className="container px-4 mx-auto py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">My Life at Sejong</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Adventures, mishaps, and memories from my journey as a CS student at Sejong University
            </p>
          </motion.div>

          {/* Interactive Image Gallery */}
          <motion.div style={{ y: backgroundY }} className="mb-24">
            <div className="relative rounded-lg overflow-hidden w-full max-w-4xl mx-auto aspect-video shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={campusImages[activeImage].url}
                    alt={campusImages[activeImage].alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <h3 className="text-xl font-bold text-white mb-2">{campusImages[activeImage].alt}</h3>
                    <p className="text-gray-300">{campusImages[activeImage].caption}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Gallery navigation buttons */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20 hover:bg-sejong-primary/70 transition-colors"
                onClick={() => setActiveImage((prev) => (prev - 1 + campusImages.length) % campusImages.length)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20 hover:bg-sejong-primary/70 transition-colors"
                onClick={() => setActiveImage((prev) => (prev + 1) % campusImages.length)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex justify-center gap-3 mt-4">
              {campusImages.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-16 h-16 rounded-md overflow-hidden transition-all ${
                    activeImage === idx ? 'ring-2 ring-sejong-accent scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Campus Stories */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold gradient-text mb-4">Campus Stories</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The tales they don't tell you in the university brochure
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {campusStories.map((story) => (
                <motion.div key={story.id} variants={itemVariants}>
                  <Card
                    className={`glass-card overflow-hidden transition-all duration-300 ${
                      expandedStory === story.id ? 'border-sejong-accent/50 shadow-lg shadow-sejong-primary/20' : 'border-white/10'
                    }`}
                  >
                    <CardContent className="p-0">
                      <div
                        className="p-6 cursor-pointer"
                        onClick={() => toggleStory(story.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-black/30 backdrop-blur-sm">
                            {story.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold text-white mb-1">{story.title}</h3>
                              <span className="text-sm text-sejong-accent">{story.date}</span>
                            </div>
                            <p className="text-gray-300 line-clamp-2">
                              {story.description.substring(0, expandedStory === story.id ? undefined : 120)}
                              {expandedStory !== story.id && story.description.length > 120 && "..."}
                            </p>
                          </div>
                          <div className="text-sejong-accent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 transition-transform ${expandedStory === story.id ? 'rotate-180' : ''}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedStory === story.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2">
                              <div className="border-t border-white/10 pt-4 mt-2">
                                <p className="text-gray-300 mb-4">{story.description}</p>
                                <div className="bg-sejong-primary/10 p-4 rounded-md">
                                  <div className="flex items-center gap-2 text-sejong-accent mb-2">
                                    <Wand2 size={16} />
                                    <span className="font-semibold">Lesson Learned:</span>
                                  </div>
                                  <p className="text-gray-300 italic">{story.lesson}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Korean Phrases I've Learned */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold gradient-text mb-4">Korean Phrases Every CS Student Needs</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Essential vocabulary for surviving late-night coding sessions in Seoul
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {koreanPhrases.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredPhrase(index)}
                  onMouseLeave={() => setHoveredPhrase(null)}
                  className={`glass-card p-5 border border-white/10 hover:border-sejong-accent/30 transition-colors relative overflow-hidden ${hoveredPhrase === index ? 'shadow-lg shadow-sejong-primary/20' : ''}`}
                >
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-sejong-primary/10 rounded-full blur-xl"></div>

                  <h3 className="text-xl font-bold font-korean mb-2 text-white flex items-center justify-between">
                    {item.phrase}
                    <MapPin className={`text-sejong-accent transition-opacity ${hoveredPhrase === index ? 'opacity-100' : 'opacity-0'}`} size={18} />
                  </h3>
                  <p className="text-gray-400 mb-1 italic text-sm">{item.pronunciation}</p>
                  <p className="text-sejong-accent">{item.meaning}</p>

                  <AnimatePresence>
                    {hoveredPhrase === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-2 right-2"
                      >
                        <div className="text-sejong-accent/80">
                          <Music size={18} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Day/Night Cycle */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 relative overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>

              <h2 className="text-2xl font-bold text-white mb-8 text-center relative z-10">A Day in My Life at Sejong</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-b from-blue-500/20 to-blue-700/20 p-5 rounded-lg text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-blue-500/30">
                      <Sun className="text-yellow-400" size={24} />
                    </div>
                  </div>
                  <h3 className="text-white font-bold mb-2">7:00 AM</h3>
                  <p className="text-gray-300 text-sm">Wake up and immediately check if my overnight code compilation finished without errors (it never does)</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-b from-yellow-500/20 to-orange-600/20 p-5 rounded-lg text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-yellow-500/30">
                      <Coffee className="text-yellow-300" size={24} />
                    </div>
                  </div>
                  <h3 className="text-white font-bold mb-2">12:00 PM</h3>
                  <p className="text-gray-300 text-sm">Third coffee of the day while debugging why my perfectly working local code fails on the university server</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-b from-orange-500/20 to-red-600/20 p-5 rounded-lg text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-orange-500/30">
                      <Code className="text-white" size={24} />
                    </div>
                  </div>
                  <h3 className="text-white font-bold mb-2">6:00 PM</h3>
                  <p className="text-gray-300 text-sm">Group project meeting where everyone agrees to use Spring Boot but secretly wants to try the new framework they just discovered</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-b from-purple-500/20 to-indigo-600/20 p-5 rounded-lg text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-purple-500/30">
                      <Moon className="text-purple-300" size={24} />
                    </div>
                  </div>
                  <h3 className="text-white font-bold mb-2">2:00 AM</h3>
                  <p className="text-gray-300 text-sm">Find out that my 400-line function could be replaced by a Java 8 stream operation... after it's already working</p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Korean Quote */}
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
                "코드는 거짓말을 하지 않는다. 주석은 가끔..."
              </p>
              <p className="text-xl text-white mb-2">
                "Code never lies, comments sometimes do."
              </p>
              <p className="text-sm text-gray-400">
                — My Algorithms Professor, after reviewing my project
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
