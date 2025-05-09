import React, { useState } from 'react';
import './Chatbot.css';

function MBTIPredictor() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [text, setText] = useState('');
  const [mbti, setMbti] = useState('');
  const [traits, setTraits] = useState(null);
  const [probabilities, setProbabilities] = useState(null);

  const mbtiTraitsMap = {
    I: "Introvert",
    E: "Extrovert",
    N: "Intuitive",
    S: "Sensing",
    T: "Thinking",
    F: "Feeling",
    J: "Judging",
    P: "Perceiving",
  };

  const getFullTraits = (mbti) => {
    return mbti
      .split("")
      .map((letter) => mbtiTraitsMap[letter])
      .join(", ");
  };

  const handleSubmit = async () => {
    const response = await fetch('https://predictions76.up.railway.app/api/predict/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setMbti(data.mbti_type);
    setProbabilities(data.probabilities);
    setTraits(null);
  };

  const handleCheckQualities = async () => {
    const response = await fetch(`https://predictions76.up.railway.app/api/qualities/?type=${mbti}`);
    const data = await response.json();
    const traitsArray = typeof data.traits === 'string' ? data.traits.split(',') : data.traits;
    setTraits(traitsArray);
  };

  if (showDisclaimer) {
    return (
      <div className="disclaimer-page">
        <h2>📢 Disclaimer</h2>
        <p>
          This personality predictor app is for educational and entertainment purposes only.
          <br /><br />
          It uses machine learning to guess your personality type based on your input, but results may not be 100% accurate.
          <br /><br />
          Please write an honest paragraph about yourself to get the best result.
        </p>
        <button className="lets-go-btn" onClick={() => setShowDisclaimer(false)}>
          Let's Go 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="predictor-container">
      <h2 className="title">🧠 Personality Predictor</h2>
      <textarea
        className="text-input"
        rows={6}
        placeholder="Write a paragraph about yourself..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="predict-btn" onClick={handleSubmit}>Predict Yourself 🙄</button>

      {mbti && (
        <div className="result-section">
          <h3>Your Personality: <span className="mbti-type">{getFullTraits(mbti)}</span></h3>
          <button className="qualities-btn" onClick={handleCheckQualities}>Check Your Qualities</button>
        </div>
      )}

      {traits && (
        <div className="traits-box">
          <h4>Your Specifications 😂</h4>
          <ul>
            {traits.map((trait, idx) => (
              <li key={idx}>{trait.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MBTIPredictor;



// import React, { useState } from 'react';
// import './Chatbot.css'; // Import the CSS file

// function MBTIPredictor() {
//   const [text, setText] = useState('');
//   const [mbti, setMbti] = useState('');
//   const [traits, setTraits] = useState(null);
//   const [probabilities, setProbabilities] = useState(null);


//   const mbtiTraitsMap = {
//     I: "Introvert",
//     E: "Extrovert",
//     N: "Intuitive",
//     S: "Sensing",
//     T: "Thinking",
//     F: "Feeling",
//     J: "Judging",
//     P: "Perceiving",
//   };

//   const getFullTraits = (mbti) => {
//     return mbti
//       .split("")
//       .map((letter) => mbtiTraitsMap[letter])
//       .join(", ");
//   };

//   const handleSubmit = async () => {
//     const response = await fetch('http://localhost:8000/api/predict/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text }),
//     });
//     const data = await response.json();
//     setMbti(data.mbti_type);
//     setProbabilities(data.probabilities);
//     setTraits(null);
//   };

//   const handleCheckQualities = async () => {
//     const response = await fetch(`http://localhost:8000/api/qualities/?type=${mbti}`);
//     const data = await response.json();

    
//     // Ensure traits is an array (split by comma if it's a string)
//     const traitsArray = typeof data.traits === 'string' ? data.traits.split(',') : data.traits;
//     setTraits(traitsArray);

//     // setTraits(data.traits);
//   };

//   return (
//     <div className="predictor-container">
//       <h2 className="title">🧠 Personality Predictor</h2>
//       <textarea
//         className="text-input"
//         rows={6}
//         placeholder="Write a paragraph about yourself..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button className="predict-btn" onClick={handleSubmit}>Predict Yourself 🙄</button>

//       {mbti && (
//         <div className="result-section">
//           {/* <h3>Your Personality: <span className="mbti-type">{mbti}</span></h3> */}
//           <h3>Your Personality: <span className="mbti-type">{getFullTraits(mbti)}</span></h3>
//           <button className="qualities-btn" onClick={handleCheckQualities}>Check Your Qualities</button>
//         </div>
//       )}

//       {traits && (
//         <div className="traits-box">
//           <h4>Your Specifications 😂</h4>
//           <ul>
//             {traits.map((trait, idx) => (
//               <li key={idx}>{trait}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MBTIPredictor;
