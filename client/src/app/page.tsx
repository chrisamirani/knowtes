'use client';

import '../styles/Landing.css';

import { useState } from 'react';
import API from '@/api';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.DefaultService.subscribeToProgress({ email });

      const success = res.valueOf();

      if (success) {
        return toast(
          "Thanks for subscribing. You'll receive update emails soon!",
          {
            type: 'success',
            position: 'top-right',
            autoClose: 3000,
          }
        );
      }
    } catch (e: unknown) {
      console.log(e);
      toast('Oops, something went wrong.', {
        type: 'error',
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />

      <div className="App">
        <header className="App-header">
          <img src={'logo192.png'} className="App-logo" alt="logo" />
          <p>
            An ultimately simple, searchable and open source knowledge base for
            all teams.
          </p>
          <form onSubmit={handleFormSubmit}>
            <input
              placeholder="Enter your email"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <button className="landingBtn" type="submit">
              Add me to beta release
            </button>
          </form>
        </header>
      </div>
    </div>
  );
}

export default Home;
