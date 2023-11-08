import React, { useState, useRef, useEffect } from 'react';
import Player from '@madzadev/audio-player'
const AudioPlayer = () => {
  const tracks = [
    {
      url: '/musica/AgeOldBlue.mp3',
      title: 'Age Old Blue',
      tags: ['house']
    }
  ]
  const colors = `html {
    --tagsBackground: #9440f3;
    --tagsText: #ffffff;
    --tagsBackgroundHoverActive: #2cc0a0;
    --tagsTextHoverActive: #ffffff;
    --searchBackground: #18191f;
    --searchText: #ffffff;
    --searchPlaceHolder: #575a77;
    --playerBackground: #1E1E1E;
    --titleColor: #ffffff; 
    --timeColor: #ffffff;
    --progressSlider: #fff;
    --progressUsed: #ffffff;
    --progressLeft: #151616;
    --volumeSlider: #fff;
    --volumeUsed: #ffffff;
    --volumeLeft:  #151616;
    --playlistBackground: #18191f;
    --playlistText: #575a77;
    --playlistBackgroundHoverActive:  #18191f;
    --playlistTextHoverActive: #ffffff;
}`
  useEffect(() => {
    var element = document.querySelector("._RZMQZ");
    if (element) {
      element.classList.add("hidden");
    }
  }, []);
  return (
    <>
    <div className='p-5'>
    <Player 
      trackList={tracks}
      includeTags={false}
      includeSearch={false}
      showPlaylist={true}
      autoPlayNextTrack={true}
      customColorScheme={colors}
    />
    </div>
    </>
  );
};
export default AudioPlayer;
