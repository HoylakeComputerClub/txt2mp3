import { useState } from 'react';

const TextToMp3 = ({ convertText, soundObj }) => {

    const [textToSpeech, setTextToSpeech] = useState("");

    return (
        <>
        <h1>Text to MP3</h1>
        <p>{soundObj? <audio controls>
          <source src={"data:audio/mp3;base64," + soundObj} />
        </audio>: "Type in some text below to turn in to audio"}</p>
        <input id="audioText" onChange={(e) => {setTextToSpeech(e.target.value);}}/>
        <button onClick={() => convertText(textToSpeech, "Joey")} >Give Me Audio</button>
        <button onClick={() => {window.location.href = "/"}}>Reset</button>
      </>
    )

}

export default TextToMp3;