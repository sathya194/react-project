// import { useState ,useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import QRCode from 'qrcode.react'

// function App() {
//   // const [text, setText] = useState('');

//   // const handleInputChange = (event) => {
//   //   setText(event.target.value);


//   const [text, setText] = useState('');
//   const qrCodeRef = useRef(null);

//   const handleInputChange = (event) => {
//     setText(event.target.value);
//   }

//   return (
//     <>
//       <div className="container">
//         <div className="container_1">
//       <h1 >QR Code Generator</h1>
//       <input
//         type="text"
//         placeholder="Enter text or URL"
//         value={text}
//         onChange={handleInputChange}
//       />
//       {text && <QRCode value={text} />}
//       </div>
//     </div> 
//     </>
//   )
// }

// export default App





import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [qrCodes, setQRCodes] = useState([]);
  const qrCodeRef = useRef(null);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const generateQRCode = () => {
    if (text) {
      const newQRCodes = [...qrCodes];
      newQRCodes.push(text);
      setQRCodes(newQRCodes);
      setText('');
    }
  };

  const downloadQRCode = (value) => {
    const canvas = qrCodeRef.current._canvas;
    const url = canvas.toDataURL("image/png");
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `qrcode_${value}.png`;
    anchor.click();
  };


  const resetApp = () => {
    setText('');
    setQRCodes([]);
  };


  return (
    <div className="container">
      <div className="container_1">
        <h1>QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={handleInputChange}
        />
        <button onClick={generateQRCode}>Generate QR Code</button>
        {qrCodes.map((code, index) => (
          <div key={index} className="qr-code-item">
            <QRCode value={code} ref={qrCodeRef} />
            <div>

            <button onClick={() => downloadQRCode(index)}>Download QR Code</button>
            </div>
           <div>
           <button onClick={resetApp}>   - --- - Reset App - --- -</button>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
