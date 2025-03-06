import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += "0123456789";
    if (isCharacterAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isCharacterAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
  };

  const passwordRef = useRef(null)

  useEffect(() => {
    if (isButtonClicked) {
      const timer = setTimeout(() => {
        setIsButtonClicked(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isButtonClicked]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isCharacterAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600 text-white">
      <h1 className="text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          className="outline-none bg-gray-900 w-full py-1 px-3"
          type="text"
          value={password}
          name=""
          id="password"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={() => {
            copyPasswordToClipboard();
            setIsButtonClicked(true);
          }}
          className="outline-none bg-blue-700 px-3 py-2 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="mt-5 flex text-sm justify-between">
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="range"
            min={8}
            max={25}
            value={length}
            name=""
            id="length"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={isNumberAllowed}
            onChange={() => setIsNumberAllowed((prev) => !prev)}
            name=""
            id="number"
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={isCharacterAllowed}
            onChange={() => setIsCharacterAllowed((prev) => !prev)}
            name=""
            id="character"
          />
          <label htmlFor="character">Characters</label>
        </div>
      </div>
      {isButtonClicked && <p className="text-center mt-8">✅ Text copied!</p>}
    </div>
  );
}

export default App;
