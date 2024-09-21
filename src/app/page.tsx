'use client'

import Image from "next/image";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import './globals.css';



export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <main>
          Main
        </main>
        <footer></footer>
      </div>
    </Provider>
  );
}
