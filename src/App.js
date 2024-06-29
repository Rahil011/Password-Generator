import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-notifications/lib/notifications.css';
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {
  // Pattern for password

  let UC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let LC = "abcdefghijklmnopqrstuvwxyz"
  let NC = "0123456789"
  let SC = "!@#$%^&*()_+?/|"

  // Use State to handel all fields 

  let [lowecase, setLowercase] = useState(false)
  let [uppercase, setUppercase] = useState(false)
  let [number, setNumber] = useState(false)
  let [symbol, setSymbol] = useState(false)
  let [passlen, setPasslen] = useState(10)
  let [passvalue, setPassvalue] = useState()



  // Password Generate Logic
  let generatepass = () => {
    let finalpass = ''
    let char = ''
    if (lowecase || uppercase || number || symbol) {
      if (passlen > 20 || passlen < 10) {
        NotificationManager.warning("Password Length  Not Satasfied !!")
      }
      else {
        if (lowecase) char += LC
        if (uppercase) char += UC
        if (number) char += NC
        if (symbol) char += SC
        for (let i = 0; i < passlen; i++) {
          finalpass += char.charAt(Math.floor(Math.random() * char.length))
        }
        setPassvalue(finalpass)
      }
    }
    else {
      NotificationManager.error("Select One field")
    }
  }

  //  Copy button Logic

  let copytoclip = () => {
    navigator.clipboard.writeText(passvalue)
    NotificationManager.success("Password Copied to Clipboard ")
  }

  return (
    <div className='main'>
      <NotificationContainer />
      <h3> Password Generator </h3>
      <div className='outer'>
        <div className='top'>
          <input type='text' readOnly value={passvalue} /> <button onClick={copytoclip} > <FontAwesomeIcon icon={faCopy} className='i' /> </button>
        </div>
        <div className='bottom'>
          <h5>Password Length</h5>
          <div className='lengthfield'>
            <input type="number" className='len form-control' max={20} value={passlen} onChange={(e) => setPasslen(e.target.value)} />
            <p style={{ color: 'lightgray', fontSize: '12px', marginLeft: '10px', padding: '0px', marginBottom: "0px" }}>Max Limit allow 20</p>
          </div>
          <div className='items'>
            <input type='checkbox' checked={uppercase} onChange={() => setUppercase(!uppercase)} />
            <label >Include Uppercase Letter</label>
          </div>
          <div className='items'>
            <input type='checkbox' checked={lowecase} onChange={() => setLowercase(!lowecase)} />
            <label >Include Lowercase Letter</label>
          </div>
          <div className='items'>
            <input type='checkbox' checked={number} onChange={() => setNumber(!number)} />
            <label >Include Number</label>
          </div>
          <div className='items'>
            <input type='checkbox' checked={symbol} onChange={() => setSymbol(!symbol)} />
            <label >Include Symbols</label>
          </div>
        </div>
        <div className='buttondiv'>
          <button onClick={generatepass}>GENERATE</button>
        </div>
      </div>
    </div>
  );
}

export default App;
