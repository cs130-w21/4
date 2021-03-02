import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import React, {useState} from "react";
import { useCore } from "./use-core.js"

export default function Filterbar(props) {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [school, setSchool] = useState("");
  const [notes, setNotes] = useState("");
  const core = useCore();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    clearFields();
  }

  const clearFields = () => {
    setFirstname('')
    setLastname('')
    setEmail('')
    setPhone('')
    setCompany('')
    setDate('')
    setSchool('')
    setNotes('')
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const addContactObj = {
      "_id": "",
      "groups": "",
      "first": firstname,
      "last": lastname,
      "email": email,
      "phone": phone,
      "company": company,
      "dateMet": date,
      "dateLastInteracted": "",
      "schoolAttended": school,
      "notes": notes
    }

    let result = core.addContact(addContactObj);
    if (result) {
      alert("New contact added to your network!");
    }
    else {
      console.log("Cannot process request.");
    }

    /*
    let result = fetch("http://localhost:4001/api/contact/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addContactObj)
    })
        .then(response => response.json())
        .catch(err => {
          if (err.status === 401) {
            alert("Cannot add new contact. Please try again later.");
            return null;
          }
        });
    if (result) {
      alert("New contact added to your network!");
    }
    else {
      console.log("Cannot process request.");
    }
     */
    handleClose();
  }

//implement on onChange function for toggle button
  return (
      <div>
        <ButtonToolbar>
          <ButtonGroup className="mr-2" >
            <DropdownButton variant="secondary" id="dropdown-basic-button" title="Sort By">
              <Dropdown.Item href="#/action-1">First Name A-Z</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Last Name A-Z</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Role A-Z</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Company A-Z</Dropdown.Item>
              <Dropdown.Item href="#/action-5">Newly Added</Dropdown.Item>
            </DropdownButton>
            <Button variant="outline-dark" onClick={handleShow}>
              Add Contact
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={evt => handleSubmit(evt)}>
                <div>
                  <div>
                    <InputGroup>
                      <FormControl
                          type="text"
                          name="firstname"
                          value={firstname}
                          placeholder="Ex. John"
                          onChange={(evt) => setFirstname(evt.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <label>First Name</label>
                </div>
                <div>
                  <div>
                    <InputGroup>
                      <FormControl
                          type="text"
                          name="lastname"
                          value={lastname}
                          placeholder="Ex. Doe"
                          onChange={(evt) => setLastname(evt.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <label>Last Name</label>
                </div>
                <div>
                  <div>
                    <InputGroup>
                      <FormControl
                          type="text"
                          name="email"
                          value={email}
                          placeholder="Ex. Name@example.com"
                          onChange={(evt) => setEmail(evt.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <label>Email</label>
                </div>
                <div>
                  <div>
                    <InputGroup>
                      <FormControl
                          type="text"
                          name="phone"
                          value={phone}
                          placeholder="Ex. (000)000-0000"
                          onChange={(evt) => setPhone(evt.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <label>Phone</label>
                </div>
                <div>
                  <div>
                    <InputGroup>
                      <FormControl
                          type="text"
                          name="company"
                          value={company}
                          placeholder="Ex. Google"
                          onChange={(evt) => setCompany(evt.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <label>Company</label>
                </div>
                <div>
                  <div>
                    <InputGroup>
                      <FormControl
                          type="date"
                          name="date"
                          value={date}
                          placeholder="Ex. 00/00/0000"
                          onChange={(evt) => setDate(evt.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <label>Date Met</label>
                </div>
                <div>
                  <div>
                    <InputGroup>
                      <FormControl
                          type="text"
                          name="school"
                          value={school}
                          placeholder="Ex. UCLA"
                          onChange={(evt) => setSchool(evt.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <label>School Attended</label>
                </div>
                <div>
                  <Form.Group>
                    <Form.Control
                        as="textarea" rows={3}
                        type="textarea"
                        name="notes"
                        value={notes}
                        placeholder="Ex. Introduced by ..."
                        onChange={(evt) => setNotes(evt.target.value)}
                    />
                  </Form.Group>
                  <label>General Notes</label>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={evt => handleSubmit(evt)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
  );
}
