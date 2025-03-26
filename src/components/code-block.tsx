"use client"

import React from 'react'
import { animated, useSpring } from 'react-spring'

export function CodeBlock() {
  const codeBlockSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px) rotateX(10deg)' },
    to: { opacity: 1, transform: 'translateY(0) rotateX(0deg)' },
    delay: 500,
    config: { tension: 280, friction: 60 }
  })

  return (
    <animated.div
      style={codeBlockSpring}
      className="glowing-card max-w-lg w-full mx-auto p-4 font-mono text-sm md:text-base transform perspective-1000"
    >
      <pre className="text-left overflow-x-auto">
        <code>
          <span className="text-blue-400">@RestController</span>{"\n"}
          <span className="text-purple-400">public class</span>{" "}
          <span className="text-yellow-400">WelcomeController</span>{" "}
          {"{"}{"\\n"}
          {"  "}
          <span className="text-blue-400">@GetMapping</span>
          {"(\"/welcome\")"}{"\n"}
          {"  "}
          <span className="text-purple-400">public</span>{" "}
          <span className="text-blue-400">String</span>{" "}
          <span className="text-green-400">welcomeMessage</span>
          {"() {"}{"\n"}
          {"    "}
          <span className="text-purple-400">return</span>{" "}
          <span className="text-green-400">\"Welcome to khan portfolio!\"</span>;{"\n"}
          {"  }"}{"\n"}
          {"}"}
        </code>
      </pre>
    </animated.div>
  )
}
