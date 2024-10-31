import './App.css';
import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Marquee from 'react-fast-marquee';
import { HyperText } from './Hyper';
import { motion } from 'framer-motion';
import Second from './Second';
import Globe from './globe';
import MoneyRain from './MoneyRain';

function App() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const contractAddress = 'uploading';
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div>
      <div className="h-screen w-screen flex justify-center items-center bg-zinc-800 relative overflow-hidden">
        <MoneyRain />

        {/* Floating Image Animation */}
        <motion.img
          src="rob1.png"
          className='absolute bottom-0 md:right-[12.5%] w-[100%] md:w-[40%] z-10'
          initial={{ y: "100vh" }} // Start off-screen
          animate={{ y: 0 }} // End at its original position
          transition={{ duration: 2, ease: "easeOut" }} // Smooth transition
        />

        <div className='absolute top-5 left-5 text-zinc-300'>
          <HyperText className="text-3xl md:text-5xl" text="Gud Tech"></HyperText>
          <HyperText className="md:text-xl -mt-2" text="Crypto Supercycle Initiative"></HyperText>
        </div>

        {/* Full Audio Player */}
        <div className="absolute top-5 right-5 w-80 hidden">
          <ReactAudioPlayer
            src="https://ia904509.us.archive.org/28/items/bring-me-the-horizon-can-you-feel-my-heart-audio/Bring%20Me%20The%20Horizon%20-%20Can%20You%20Feel%20My%20Heart%20%28Audio%29.mp3" // Replace with your MP3 link
            controls
          />
        </div>

        <Globe />

        <div className='absolute bottom-7 md:sbottom-10 z-10 bg-black font-custom p-2 text-zinc-300'>
          <button
            onClick={handleCopy}
            className='p-1 text-xs md:text-base m-1 bg-zinc-700'
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <span className='p-1 text-[9px] md:text-base'>uploading...</span>
        </div>
      </div>

      <div className="w-full bg-black border-y">
        <Marquee speed={70} loop={0} className="w-full">
          <div className="flex items-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2 text-3xl font-custom text-zinc-300 whitespace-nowrap">
                <span>Gud Tech</span>
                <img src="gud.gif" className="h-20 select-none" alt="surveillance" />
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      <Second />
    </div>
  );
}

export default App;