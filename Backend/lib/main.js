import getLyrics from "./getLyrics.js";
import getSong from "./getSong.js";


const options = {
    apiKey: 'jJYdxIWKFaKtL6Pk3WyyNw4eilmwI0rFIbWdUPz_Czw2aHVfcado7azq2ZdsYTD1',
    title: 'cure for me',
    artist: 'aurora',
    optimizeQuery: true
}

getLyrics(options).then((lyrics) => { console.log(lyrics) });
getSong(options).then((song) => console.log(`${song.lyrics}`));
