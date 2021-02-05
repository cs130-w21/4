import './App.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalTitle from 'react-bootstrap/ModalTitle'



function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">
      <header className="App-header">
        <div className="Nav-bar">
          <span className="Nav-bar-title">Summer's Personal Network</span>
        </div>
        <div className="Contact-format">


            {/* <Button>+ Add Contact</Button> */}

          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>

          <>
            <Button variant="primary" onClick={handleShow}>
              + Add Contact
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add a new contact</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
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
