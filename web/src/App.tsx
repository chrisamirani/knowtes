import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DefaultService } from "./api-sdk";
import Toastify from "toastify-js";
function App() {
  const [email, setEmail] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await DefaultService.subscribeToProgress({ email });

      const success = res.valueOf();

      if (success) {
        return Toastify({
          text: "Thanks for subscribing. You'll receive update emails soon!",
          duration: 3000,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      }
    } catch (e: unknown) {
      Toastify({
        text: "Oops, something went wrong.",
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "red",
        },
      }).showToast();
    }
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          An ultimately simple, searchable and open source knowledge base for
          all teams.
        </p>
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder='Enter your email'
            type='email'
            name='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <button type='submit'>Send me progress updates</button>
        </form>
      </header>
    </div>
  );
}

export default App;
