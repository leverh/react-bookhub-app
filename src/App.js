import styles from "./App.module.css";
import React from 'react';
import NavBar from './componenets/NavBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
    </div>
  );
}

export default App;