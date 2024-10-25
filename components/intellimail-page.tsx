'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { tsParticles } from "tsparticles-engine"
import Particles from 'react-tsparticles'
import type { Engine } from 'tsparticles-engine'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const particlesOptions = {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 800 } },
    color: { value: '#333333' },
    shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
    opacity: { value: 0.3, random: false, anim: { enable: false } },
    size: { value: 2, random: true, anim: { enable: false } },
    line_linked: { enable: true, distance: 150, color: '#333333', opacity: 0.2, width: 1 },
    move: { enable: true, speed: 0.5, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false },
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, repulse: { distance: 200, duration: 0.4 } },
  },
  retina_detect: true,
}

export function IntellimailPage() {
  const [email, setEmail] = useState('')
  const [gradientPosition, setGradientPosition] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradientPosition((prevPosition) => (prevPosition + 1) % 200)
    }, 50)

    return () => clearInterval(intervalId)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted email:', email)
  }

  const particlesInit = async (engine: Engine) => {
    await tsParticles.load("tsparticles", particlesOptions)
  }

  const gradientStyle = {
    background: `linear-gradient(135deg, #1a1a1a ${gradientPosition}%, #2a2a2a ${gradientPosition + 100}%)`,
    transition: 'background 0.5s ease',
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-gray-300">
      <div className="absolute inset-0" style={gradientStyle} />
      <Particles id="tsparticles" init={particlesInit} className="absolute inset-0" />
      <div className="z-10 text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl font-bold tracking-tight text-white"
        >
          Intellimail
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-xl text-gray-400"
        >
          Managing mails has never been easier
        </motion.p>
      </div>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        className="z-10 w-full max-w-md mt-8 space-y-4"
      >
        <Input
          type="text"
          placeholder="Talk to your emails"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500"
        />
        <Button 
          type="submit" 
          className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200"
        >
          Submit
        </Button>
      </motion.form>
    </div>
  )
}