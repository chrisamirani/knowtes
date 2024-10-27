'use client';

import '../styles/Landing.css';

import { useState } from 'react';
import API from '@/api';

import 'react-toastify/dist/ReactToastify.css';

import Image from 'next/image';

import { toast } from '@/lib/ToastProvider';
import { buttonVariants } from '@/components/plate-ui/button';

function Home() {
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.ContactService.subscribeToProgress({ email });

      const success = res.valueOf();

      console.log({ success });
      if (success) {
        return toast(
          "Thanks for subscribing. You'll receive update emails soon!",
          {
            type: 'success',
          }
        );
      }
    } catch (e: unknown) {
      console.log(e);
    }
    toast('Oops, something went wrong.', {
      type: 'error',
    });
  };
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <Image width={150} height={150} src={'/logo192.png'} alt="logo" />
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
            <button
              className={buttonVariants({ variant: 'default', size: 'lg' })}
              type="submit"
            >
              Add me to beta release
            </button>
          </form>
        </header>
      </div>
    </div>
  );
}

export default Home;
