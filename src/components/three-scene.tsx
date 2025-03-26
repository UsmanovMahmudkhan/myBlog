"use client"

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, OrbitControls, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { JSX } from 'react'

type MeshProps = JSX.IntrinsicElements['mesh']
type Text3DProps = JSX.IntrinsicElements['mesh'] & { color?: string; emissive?: string }

function RotatingBox(props: MeshProps) {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2
      mesh.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh {...props} ref={mesh} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={(props as any).color} metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

function FloatingText(props: Text3DProps) {
  const textRef = useRef<THREE.Mesh>(null!)

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        {...props}
      >
        {props.children}
        <meshStandardMaterial
          color={props.color || "#4e7bff"}
          metalness={0.8}
          roughness={0.2}
          emissive={props.emissive || "#4e7bff"}
          emissiveIntensity={0.5}
        />
      </Text3D>
    </Float>
  )
}

export function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <group position={[0, 0, 0]}>
          <FloatingText position={[-3.5, 1, 0]} color="#ff4e83" emissive="#ff4e83">
            Usmonov
          </FloatingText>
          <FloatingText position={[-2, 0, 0]} color="#4e7bff" emissive="#4e7bff">
            Mahmudkhon
          </FloatingText>

          <RotatingBox position={[-2, -1.5, 0]} color="#4e7bff" />
          <RotatingBox position={[2, -1.5, 0]} color="#ff4e83" />
          <RotatingBox position={[0, 1.5, -1]} color="#4eff8a" />
        </group>
      </Canvas>
    </div>
  )
}