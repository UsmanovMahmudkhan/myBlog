"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-futuristic-dark border-t border-white/5">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 gradient-text">Sejong CS Blog</h3>
            <p className="text-gray-400 text-sm mb-4">
              A personal space documenting my journey as a Computer Science student at Sejong University, focusing on backend development, Spring Boot, and Java.
            </p>
            <div className="flex space-x-4">
              <a href="http://www.linkedin.com/in/mahmudkhan-u-57b202249" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
                <span className="sr-only">Github</span>
              </a>
              <a href="http://www.linkedin.com/in/mahmudkhan-u-57b202249" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com/MahmudkhonU" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:usmanovmahmudkhan@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/campus-life" className="text-gray-400 hover:text-white text-sm transition-colors">
                  My Life at Sejong
                </Link>
              </li>
              <li>
                <Link href="/ai-twin" className="text-gray-400 hover:text-white text-sm transition-colors">
                  AI Twin Vision
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['Java', 'Spring Boot', 'Spring Cloud', 'React', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB'].map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs rounded-md bg-sejong-primary/10 text-sejong-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Sejong CS Blog. All rights reserved.
          </p>

          <motion.p
            className="text-sm text-gray-500 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" fill="currentColor" /> in Seoul, Korea
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
