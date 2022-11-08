import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './micro.css';
import microPhoneIcon from "./microphone.svg";
import News from "../news/News";
import { useSpeechSynthesis } from 'react-speech-kit';

function Micro() {
  const [message, setMessage] = useState(' ')
  const [showNews, setShowNews] = useState(false)
  const {speak} = useSpeechSynthesis();

  
  //Function 
  const handleResponse = (entrer) =>{
    SpeechRecognition.stopListening()
    speak({text:`d'accord je vous cherche ${entrer} `})

  }

  const handleNews = (entrer) =>{
    SpeechRecognition.stopListening()
    speak({text:`d'accord je vous cherche ${entrer} `})
  }

  const handleSay = ( ) => {
    SpeechRecognition.stopListening()
    speak({text:"Je m'appelle Alicia, votre assistant virtuelle. Je peut vous simplifier la vie et chercher des reponses pour vous."})
  }

  const commands = [
    {
      command: ['Bonjour', 'Salut'],
      callback: ( ) => {
        setMessage(` Bonjour Je m'appelle Alicia, votre assistant virtuelle. Je peut vous simplifier la vie et chercher des reponses pour vous:`);
        handleSay( )
      },
      matchInterim: true
    },
    {
      command: 'Actualité *',
      callback: ( ) => {
        setMessage(`Voici vos actualité`);
        setShowNews(true)
        handleSay( )
      },
      matchInterim: true
    },
    {
      command: 'efface.',
      callback:({resetTranscript}) => resetTranscript()
    },
    {
      command: 'cherche *',
      callback:(site) => {
        handleResponse(site);
        window.open(`https://www.google.com/search?q=${site}`)
      }
    },
    {
      command: ['Les actualités du jour', 'Les nouvelles de la journée'],
      callback: ( {command}) =>  {
        handleNews(command)
        window.open(`https://news.google.com/`)
      },
      matchInterim: true
    } 
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
      language: 'fr-FR'
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="microphone-wrapper">
      { showNews ? <News></News> : null }


      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img src={microPhoneIcon} alt='' className="microphone-icon" />
        </div>
        <div className="microphone-status">
          {isListening ? "Ouvert" : "Fermé"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>


      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}

      <div className='response'>
      <p className='response'>{message}</p>  
      </div>
    </div>
  );
}
export default Micro;