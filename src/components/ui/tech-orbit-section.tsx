"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload } from "@react-three/drei"
import { ParticleSphere } from "@/components/ui/3d-orbit-gallery"
import { Suspense } from "react"

const techLogos = [
  "/logos/html5.svg",
  "/logos/css3.svg",
  "/logos/javascript.svg",
  "/logos/react.svg",
  "/logos/angular.svg",
  "/logos/nextjs.svg",
  "/logos/tailwindcss.svg",
  "/logos/bootstrap.svg",
  "/logos/sass.svg",
  "/logos/nodejs.svg",
  "/logos/python.svg",
  "/logos/django.svg",
  "/logos/java.svg",
  "/logos/firebase.svg",
  "/logos/aws.svg",
  "/logos/azure.svg",
  "/logos/gcp.svg",
  "/logos/figma.svg",
  "/logos/photoshop.svg",
  "/logos/illustrator.svg",
  "/logos/canva.svg",
  "/logos/sketch.svg",
  "/logos/xd.svg",
  "/logos/git.svg",
  "/logos/docker.svg",
  "/logos/threejs.svg",
  "/logos/typescript.svg",
];

export function TechOrbitSection() {
  return (
    <section id="tech-stack" className="w-full bg-black py-24">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">
          Technologies & Tools
        </h2>
        <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
          A constellation of technologies powering modern development
        </p>
      </div>
      
      <div className="w-full h-[600px] md:h-[800px]">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ParticleSphere logoUrls={techLogos} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
