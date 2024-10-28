'use client'

import { useState } from 'react'
import { MoonIcon, SunIcon, SendIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-600 dark:text-blue-400 font-mono">Intelli</span>
          <span className="text-red-600 dark:text-red-400 font-mono">Mail</span>
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6" />}
        </motion.button>
      </header>

      <main className="flex-grow p-4 bg-white dark:bg-gray-900">
        <section className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-red-600 text-transparent bg-clip-text"
          >
            Greeting message
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl text-blue-600 dark:text-blue-400 mb-8"
          >
            How can I assist you with your email needs today?
          </motion.h3>

          <div className="mb-8">
            <div id="chatbot" className="mb-4 h-64 overflow-y-auto"></div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              {[
                { text: "Show me emails about project updates.", icon: "📈" },
                { text: "Find emails related to last month's budget report.", icon: "💰" },
                { text: "Retrieve all emails from the marketing team.", icon: "📣" },
                { text: "List emails containing the word 'meeting' from the past week.", icon: "🗓️" },
              ].map((suggestion, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative h-48 overflow-hidden group shadow-md"
                >
                  <span className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {suggestion.text}
                  </span>
                  <span className="absolute bottom-2 right-2 text-4xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {suggestion.icon}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              id="chat-form" 
              className="relative"
            >
              <input
                type="text"
                id="chat-input"
                placeholder="Ask me anything about email..."
                className="w-full p-4 pr-12 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 shadow-md"
                required
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Send message"
              >
                <SendIcon className="w-5 h-5" />
              </motion.button>
            </motion.form>
          </div>
        </section>
      </main>

      <div id="modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
          <p className="mb-4 text-gray-800 dark:text-gray-200">Thank you for your input! We are processing your request...</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="continue-button" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Continue
          </motion.button>
        </div>
      </div>
    </div>
  )
}