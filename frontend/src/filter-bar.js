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

/**
 * @param props
 * @return returns the rendering of the add contact
 * button and the input modal
 * @constructor
 *
 * Purpose: this function handles user input in regards to
 * adding contacts. It renders the pop-up modal which allows
 * the user to enter information for a given contact they
 * wish to save in their personal network
 */
export default function Filterbar(props) {

  /* variables to hold user input field values */
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

  /* modal handling */
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    clearFields();
  }

  /**
   * Purpose: to clear fields after successful submission and
   * handling of newly entered contact information; to ensure
   * the modal input fields are clear, and ready for the next
   * time a contact is added.
   */
  const clearFields = () => {
    setFirstname('')
    setLastname('')
    setEmail('')
    setPhone('')
    setCompany('')
    setRole('')
    setDate('')
    setSchool('')
    setNotes('')
  }

  /**
   * @param evt - a trigger that sends the signal to initiate
   * the new contact submission process.
   * @return {Promise<void>}
   *
   * Purpose: to create a contact object with the user's newly
   * entered contact information, then send it to use-core.js
   * which contacts the database. The results from use-core.js
   * will dictate whether the user is notified of a successful
   * add or an unsuccessful one.
   */
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
      "role": role,
      "dateMet": date,
      "dateLastInteracted": "",
      "schoolAttended": school,
      "notes": notes
    }

    /* send contact obj to use-core.js & wait for result */
    let result = core.addContact(addContactObj);
    if (result) {
      /* good add */
      alert("New contact added to your network!");
    }
    else {
      /* bad add */
      console.log("Cannot process request.");
    }
    handleClose();
  }


  //implement on onChange function for toggle button
  
  /**
   * Purpose: renders pop-up modal and buttons. It
   * also receives the user's input to the fields and
   * directs it to the proper variable to contain the given
   * value.
   */
  return (
      <div className="Contact-buttons">
        <ButtonGroup>
          <Button variant="outline-dark" onClick={handleShow}>
            Add Contact
          </Button>{' '}
          <DropdownButton variant="dark" id="dropdown-basic-button" title="Sort By">
            <Dropdown.Item href="#/action-1">First Name A-Z</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Last Name A-Z</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Role A-Z</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Company A-Z</Dropdown.Item>
            <Dropdown.Item href="#/action-5">Newly Added</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
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
                          type="text"
                          name="role"
                          value={role}
                          placeholder="Ex. Software Engineer"
                          onChange={(evt) => setRole(evt.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <label>Role</label>
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
