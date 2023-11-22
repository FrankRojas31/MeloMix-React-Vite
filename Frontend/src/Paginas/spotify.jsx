import Footer from "../componentes/Footer";
import Header from "../componentes/Header";

export default function spotify () {
    return (
        <>
        <Header/>
        <iframe  
        src="https://open.spotify.com/embed/playlist/3GCFhYH8Lv7138WvmzcrS1?utm_source=generator&theme=0" 
        width="100%" 
        height="413" 
        frameBorder="0" 
        allowfullscreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"/>
        <Footer/>
        </>
    )
}