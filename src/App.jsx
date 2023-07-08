import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import AudioUploader from './AudioUploader';
import TextToMp3 from './TextToMp3';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FB_API_KEY,
//   authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FB_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FB_MESSAGE_SENDER_ID,
//   appId: import.meta.env.VITE_FB_APP_ID
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

function App() {

  const [soundObj, setSoundObj] = useState();
  const [textToSpeech, setTextToSpeech] = useState("")

  const apiUri = "https://flasktalkbackend-tomtarpey.b4a.run/";



  const convertText = (inputText, inputVoice) => {
    axios.post(`${apiUri}/convert_text`, 
    { text: inputText, voiceId: inputVoice })
  .then(res => {
      console.log(res.data.audio);
      const base64audio = res.data.audio;

      setSoundObj(base64audio);


  
      // setDoc(doc(db, "speaq", inputText), {base64audio})
      // .catch((err) => { console.log("error", err) });
  })


  }
  return (
    <>
      <TextToMp3 convertText={convertText} soundObj={soundObj} />
      <AudioUploader apiUri={apiUri}/>
    </>
  )
}

export default App
