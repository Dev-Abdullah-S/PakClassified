import React, { useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import './HamburgerDrawer.css';

export default function HamburgerDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      

        <div className="hamburger-container">
          <Hamburger toggled={isOpen} toggle={setIsOpen}   />
        </div>
      

      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>

      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
