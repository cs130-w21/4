import './App.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Nav-bar">
          <span className="Nav-bar-title">Summer's Personal Network</span>
        </div>
        <div className="Contact-format">
          <ButtonGroup>
            <Button>+ Add Contact</Button>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </div>
        <div className="Contact-list">
          <div className="Contact">
            <span className="Contact-name">Saum</span>
          </div>
          <div className="Contact">
            <span className="Contact-name">Gaby</span>
          </div>
          <div className="Contact">
            <span className="Contact-name">Erynn</span>
          </div>
          <div className="Contact">
            <span className="Contact-name">Kian</span>
          </div>
          <div className="Contact">
            <span className="Contact-name">Matt</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
