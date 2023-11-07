import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    audioRef.current.src = "/musica/Age Old Blue.mp3";
    audioRef.current.load();
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('durationchange', handleDurationChange);
  
    audioRef.current.addEventListener('canplaythrough', () => {
      handleDurationChange();
    });
  }, []);

  const playPauseToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    console.log('Current Time:', currentTime);
    if (duration > 0) {
      const newProgress = (currentTime / duration) * 100;
      setProgress(newProgress);
    }
  };

  const handleDurationChange = () => {
    const newDuration = audioRef.current.duration;
    setDuration(newDuration);
    console.log('New Duration:', newDuration);
  };
  

  const handleVolumeToggle = () => {
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };
  const handlePrevious = () => {
    // Implement previous track logic here
  };

  const handleNext = () => {
    // Implement next track logic here
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(e.target.value);
  };

  return (
    <div className="w-[screen] h-[80px] bg-[#bbb] flex p-[10px] gap-5 m-2 rounded-[30px]">
      <div className="w-[60px] w-[60px] block border border-white rounded-full">
        <img className={isPlaying ? 'h-full w-[60px] bg-cover rounded-full rodar' : 'h-full w-[60px] bg-cover rounded-full'} src="/imagenes/Alela_Diane.jpg" alt="Album Cover" />
      </div>
      <div className="flex items-center w-full place-content-between">
        <button className='text-[22px] md:text-[25px]' onClick={handlePrevious}><i className='nf nf-fa-step_backward'></i></button>
        <button className='text-[22px] md:text-[25px]' onClick={playPauseToggle}>{isPlaying ? <i className='nf nf-md-pause'></i> : <i className='nf nf-fa-play'></i>}</button>
        <button className='text-[22px] md:text-[25px]' onClick={handleNext}><i className='nf nf-fa-step_forward'></i></button>
        <div className="text-[15px] md:text-[18px]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          className='w-[50%] md:w-[70%] xl:w-[80%] bg-black cursor-pointer'
          onChange={handleProgressChange}
        />
        <button className='text-[22px] md:text-[25px]' onClick={handleVolumeToggle}>{muted ? <i className='nf nf-md-volume_mute'></i> : <i className='nf nf-md-volume_high'></i>}</button>
      </div>
      <audio ref={audioRef}></audio>
    </div>
  );
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
  const formattedSeconds = String(remainderSeconds).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
  return `${formattedMinutes}:${formattedSeconds}`;
}

export default AudioPlayer;
