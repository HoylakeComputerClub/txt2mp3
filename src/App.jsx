import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import AudioUploader from './AudioUploader';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {

  const [soundObj, setSoundObj] = useState();
  const [textToSpeech, setTextToSpeech] = useState("")

  const apiUri = import.meta.env.VITE_API_URI



  const convertText = (inputText, inputVoice) => {
    axios.post(`${apiUri}/convert_text`, 
    { text: inputText, voiceId: inputVoice })
  .then(res => {
      console.log(res.data.audio);
      const base64audio = res.data.audio;

      setSoundObj(base64audio);


  
      setDoc(doc(db, "speaq", inputText), {base64audio})
      .catch((err) => { console.log("error", err) });
  })


  }
  return (
    <>
    <div>
      <h1>Text to MP3</h1>
      <p>{soundObj? <audio controls>
        <source src={"data:audio/mp3;base64," + soundObj} />
      </audio>: "Type in some text below to turn in to audio"}</p>
      <input id="audioText" onChange={(e) => {setTextToSpeech(e.target.value);}}/>
      <button onClick={() => convertText(textToSpeech, "Joey")} >Give Me Audio</button>
      <button onClick={() => {window.location.href = "/"}}>Reset</button>
    </div>
    <AudioUploader apiUri={apiUri}/>
    </>
  )
}

export default App
