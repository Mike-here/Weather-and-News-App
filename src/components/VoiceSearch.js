import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceSearch = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const startListening = () => {
    setError(null);
    
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Voice search is not supported in your browser');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError('Error occurred in voice recognition: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={startListening}
        className={`p-2 rounded-full ${
          isListening 
            ? 'bg-red-500 text-white' 
            : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
        } transition-colors`}
        title="Search by voice"
      >
        {isListening ? <Mic className="animate-pulse" /> : <MicOff />}
      </motion.button>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 p-2 bg-red-500 text-white text-sm rounded-md whitespace-nowrap"
        >
          {error}
        </motion.div>
      )}
      
      {isListening && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-full mt-2 p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm rounded-md whitespace-nowrap"
        >
          Listening...
        </motion.div>
      )}
    </div>
  );
};

export default VoiceSearch; 