"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X } from "lucide-react";

const VoiceModal = ({ isOpen, onClose, onTranscription }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcription = event.results[current][0].transcript;
        setTranscript(transcription);
        if (event.results[current].isFinal) {
          onTranscription(transcription);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscription]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center space-y-6">
              <motion.div
                animate={{
                  scale: isListening ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isListening ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center">
                  <button
                    type="button" // Explicitly prevent default form submission behavior
                    onClick={toggleListening}
                    className={`p-4 rounded-full ${
                      isListening ? "bg-red-500" : "bg-sky-500"
                    } text-white hover:opacity-90 transition-colors`}
                  >
                    <Mic size={24} />
                  </button>
                </div>
                {isListening && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-sky-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  {isListening
                    ? "Listening..."
                    : "Click the microphone to start"}
                </p>
                {transcript && (
                  <p className="text-lg font-medium text-gray-900">
                    {transcript}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VoiceButton = ({ onTranscription }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTranscription = (text) => {
    onTranscription(text);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        aria-label="Press to speak"
        onClick={() => setIsModalOpen(true)}
        type="button"
      >
        <Mic size={20} strokeWidth={2} aria-hidden="true" />
      </button>

      <VoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTranscription={handleTranscription}
      />
    </>
  );
};

export default VoiceButton;
