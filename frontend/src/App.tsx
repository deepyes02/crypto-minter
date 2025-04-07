import React, { createContext, useContext, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
const HTMLElement: HTMLElement = document.getElementById('root') as HTMLDivElement;
import { HashRouter, Routes, Route } from 'react-router';
import Header from './Components/Header/Header';
import { ContractProvider } from './services/contractProvider';

export default class App {
  contract: any;
  init() {
    console.log('App initialized');
    if (!HTMLElement) {
      throw new Error('Root element not found');
    }
    const root = createRoot(HTMLElement);
    root.render(
      <React.StrictMode>
        <ContractProvider>
          <HashRouter>
            <Routes>
              <Route path="" element={<Header />} />
              <Route path="about" element={<h1>About</h1>} />
            </Routes>
          </HashRouter>
        </ContractProvider>
      </React.StrictMode>
    )
  }
}