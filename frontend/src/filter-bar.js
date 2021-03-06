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
 * Filter-bar component
 * @module
 */

/**
 * Purpose: this function handles user input in regards to
 * adding contacts. It renders the pop-up modal which allows
 * the user to enter information for a given contact they
 * wish to save in their personal network
 * @param {object} props
 * @return {JSX.Element} returns the rendering of the add contact
 * button and the input modal
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
   * @name clearFields
   * @function
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
   * Purpose: to create a contact object with the user's newly
   * entered contact information, then send it to use-core.js
   * which contacts the database. The results from use-core.js
   * will dictate whether the user is notified of a successful
   * add or an unsuccessful one.
   * @name handleSubmit
   * @function
   * @param evt - a trigger that sends the signal to initiate
   * the new contact submission process.
   * @return {Promise<void>}
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
   * @name render
   * @function
   */
  return (
      <div className="Contact-buttons">
        <div className="Button-group">
          <Button className="Add-button" variant="outline-dark" onClick={handleShow}>
            Add Contact
          </Button>{' '}
          <DropdownButton variant="secondary" id="dropdown-basic-button" title="Order By">
              <Dropdown.Item onSelect={() => props.handleSortChange(true)} active={props.sort.forwards}>A-Z</Dropdown.Item>
              <Dropdown.Item onSelect={() => props.handleSortChange(false)} active={!props.sort.forwards}>Z-A</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onSelect={() => props.handleOrderChange("first")} active={props.sort.orderBy === "first"}>First Name</Dropdown.Item>
              <Dropdown.Item onSelect={() => props.handleOrderChange("last")} active={props.sort.orderBy === "last"}>Last Name</Dropdown.Item>
              <Dropdown.Item onSelect={() => props.handleOrderChange("role")} active={props.sort.orderBy === "role"}>Role</Dropdown.Item>
              <Dropdown.Item onSelect={() => props.handleOrderChange("company")} active={props.sort.orderBy === "company"}>Company</Dropdown.Item>
            </DropdownButton>
        </div>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={evt => handleSubmit(evt)}>
                <div>
                  <div>
                    <label>First Name</label>
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
                </div>
                <div>
                  <div>
                    <label>Last Name</label>
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
                </div>
                <div>
                  <div>
                    <label>Email</label>
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
                </div>
                <div>
                  <div>
                    <label>Phone</label>
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
                </div>
                <div>
                  <div>
                    <label>Company</label>
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
                </div>
                <div>
                  <div>
                    <label>Role</label>
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
                </div>
                <div>
                  <div>
                    <label>Date Met</label>
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
                </div>
                <div>
                  <div>
                    <label>School Attended</label>
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
                </div>
                <div>
                  <label>General Notes</label>
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
