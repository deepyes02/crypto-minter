import React from 'react';
import { createRoot } from 'react-dom/client';
const HTMLElement: HTMLElement = document.getElementById('root') as HTMLDivElement;
import style from './App.module.scss';
import Header from './Components/Header/Header';
import loadContract from './services/loadContract';



export default class App {
  contract: any;
  constructor () {
    this.contract = loadContract();
  }
  init() {
    console.log('App initialized');
    if (!HTMLElement) {
      throw new Error('Root element not found');
    }
    const root = createRoot(HTMLElement);
    root.render(
      <React.StrictMode>
        <div className={style.universal}>
          <Header loadContract={this.contract}/>
        </div>
      </React.StrictMode>)
  }
}