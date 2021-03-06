import React, { useState, useEffect } from 'react'
import './App.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/esm/Button';
import { useCore } from './use-core.js';
import SearchBar from './search-bar';
import { BsPencilSquare } from 'react-icons/bs'
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

/**
 * Contact-list component
 * @module 
 */

 function StaticContact(props) {

  return (
    <div>
      <div className="Email">
        <span classname="email">Email: {props.email}</span>
      </div>
      <div className="PhoneNumber">
        <span classname="number">Phone Number: {props.phoneNumber}</span>
      </div>
      <div className="Company">
        <span classname="company">Company: {props.company}</span>
      </div>
      <div className="DateMet">
        <span classname="dateMet">Date Met: {props.dateMet}</span>
      </div>
      <div className="DateLastInteracted">
        <span classname="dateLastInteracted">Last Contacted: {props.dateLastInteracted}</span>
      </div>
      <div className="School">
        <span classname="school">School: {props.schoolAttended}</span>
      </div>
      <div className="Notes">
        <span classname="notes">Notes: {props.notes}</span>
      </div>
    </div>
  );
}


// export class FullContact extends React.Component {
//   render() {
//     return (
//       <div >
//         <div className="Email">
//           <span className="Contact-fields">Email: </span> 
//           <span className="Contact-values">{this.props.email}</span>
//         </div>
//         <div className="PhoneNumber">
//           <span className="Contact-fields">Phone Number: </span>
//           <span className="Contact-values">{this.props.phoneNumber}</span>
//         </div>
//         <div className="Company">
//           <span className="Contact-fields">Company: </span>
//           <span className="Contact-values">{this.props.company}</span>
//         </div>
//         <div className="DateMet">
//           <span className="Contact-fields">Date Met: </span>
//           <span className="Contact-values">{this.props.dateMet}</span>
//         </div>
//         <div className="DateLastInteracted">
//           <span className="Contact-fields">Last Contacted: </span>
//           <span className="Contact-values">{this.props.dateLastInteracted}</span>
//         </div>
//         <div className="School">
//           <span className="Contact-fields">School: </span>
//           <span className="Contact-values">{this.props.schoolAttended}</span>
//         </div>
//         <div className="Notes">
//           <span className="Contact-fields">Notes: </span>
//           <span className="Contact-values">{this.props.notes}</span>
//         </div>
//       </div>
//       <div className="Notes">
//         <span classname="notes">Notes: {props.notes}</span>
//       </div>
//     </div>
//   );
// }

function EditContact(props) {

  const [first, setFirst] = useState(props.first);
  const [last, setLast] = useState(props.last);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const [company, setCompany] = useState(props.company);
  const [role, setRole] = useState(props.role);
  const [dateMet, setDateMet] = useState(props.dateMet);
  const [schoolAttended, setSchoolAttended] = useState(props.schoolAttended);
  const [notes, setNotes] = useState(props.notes);

  const core = useCore();

  const handleSubmit = async () => {
    let newObject = {
      _id: props._id, first, last, email, phone, company, role, dateMet, schoolAttended, notes
    };
    let success = await core.updateContact(newObject);
    if (success) {
      props.onHide();
    } else {
      alert("Failed to save changes. Please try again later.")
    }
  }

  const handleDelete = async () => {
    let newObject = {
      _id: props._id, first, last, email, phone, company, role, dateMet, schoolAttended, notes
    };
    let success = await core.deleteContact(newObject);
    if (success) {
      props.onHide();
    } else {
      alert("Failed to delete contact. Please try again later.");
    }
  }

  return (
    <Modal {...props} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={evt => handleSubmit(evt)}>
          <div>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>First Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  type="text"
                  name="first"
                  value={first}
                  placeholder="Ex. John"
                  onChange={(evt) => setFirst(evt.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Last Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  type="text"
                  name="last"
                  value={last}
                  placeholder="Ex. Doe"
                  onChange={(evt) => setLast(evt.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Email</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Ex. Name@example.com"
                  onChange={(evt) => setEmail(evt.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Phone Number</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  type="text"
                  name="phone"
                  value={phone}
                  placeholder="Ex. (000)000-0000"
                  onChange={(evt) => setPhone(evt.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Company</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  type="text"
                  name="company"
                  value={company}
                  placeholder="Ex. Google"
                  onChange={(evt) => setCompany(evt.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Role</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  type="text"
                  name="role"
                  value={role}
                  placeholder="Ex. Software Engineer"
                  onChange={(evt) => setRole(evt.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Date Met</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  type="date"
                  name="dateMet"
                  value={dateMet}
                  placeholder="Ex. mm/dd/yyyy"
                  onChange={(evt) => setDateMet(evt.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>School</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                  type="text"
                  name="schoolAttended"
                  value={schoolAttended}
                  placeholder="Ex. UCLA"
                  onChange={(evt) => setSchoolAttended(evt.target.value)}
              />
            </InputGroup>
          </div>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                  as="textarea" rows={3}
                  type="textarea"
                  name="notes"
                  value={notes}
                  placeholder="Ex. Introduced by ..."
                  onChange={(evt) => setNotes(evt.target.value)}
              />
            </Form.Group>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleDelete()}>
          Delete Contact
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function FullContact(props) {

  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      {editMode ? (
          <EditContact {...props} show={editMode} onHide={() => setEditMode(false)} />
      ) : (
          <div>
            <StaticContact {...props} />
            <div>
              <BsPencilSquare onClick={() => setEditMode(true)} />
            </div>
          </div>
      )}
    </div>
  );
}

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false}
  }

  toggleClass=() => {
    const list = this.props.value;
    if(list == true){
      this.setState({
        active: !this.state.active
      })
    }
  };
  render() {
    return (
      <div >
        <div className="Name" onClick={this.toggleClass}>
          <span className="first"> {this.props.first} </span>
          <span className="last"> {this.props.last} </span>
        </div>
        <div>
          {(this.state.active && this.props.value)
          ? <FullContact {... this.props} />: null}
        </div>
      </div>
    );
  }
}

/**
 * Purpose: to allow the user to toggle between list
 * and grid format
 * @param props
 * @return {JSX.Element} returns the rendering associated with
 * how the user wishes to view their contacts
 */
function ToggleButtonGroupControlled(props) {

  let core = useCore();
  const contacts = core.coreObject.networkObject.contacts;
  const compareValues = (forwards, key) => {
    return function innerSort(a,b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        forwards ? comparison : (comparison * -1)
      );
    }
  }
  contacts.sort(compareValues(props.sort.forwards, props.sort.orderBy));

  const [value, setVal] = useState(true);
  const toggleClass = () => {setVal((value, props) => !value);};

  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState(contacts);

  const updateInput = async (input) => {
    const filtered = contacts.filter(contact => {
      let full_name = contact.first + ' ' + contact.last
      let options = full_name + ' ' + contact.email + ' ' + contact.company + ' ' + contact.schoolAttended
      return options.toLowerCase().includes(input.trim().toLowerCase())
    })
    setInput(input);
    setSearchTerm(filtered);
  }

  useEffect(() => {
    updateInput(input);
  }, [contacts]);

   return(
      <div>
        <div>
          <ToggleButtonGroup type="radio" name="options" defaultValue={true} onChange={toggleClass}>
            <ToggleButton variant='dark' value={true} checked={true}>List Format</ToggleButton>
            <ToggleButton variant='dark' value={false} checked={false}>Grid Format</ToggleButton>
          </ToggleButtonGroup>
          <span>
            <SearchBar
              input={input}
              setKeyword={updateInput}
            />
          </span>
        </div>
        <div className = {value? "Contact-list":"Grid-contact-container"} >
            {
              searchTerm.map((cont, i) =>(
                <div className = {value? "Contact":"Grid-contact"} >
                  <Name className="Contact-name" {...cont} value={value} key={i} />
                  {!value? <FullContact {...cont}/>: null}
                </div>))
            }
        </div>
      </div>
      );
}

/**
 * Purpose: to allow the user to view their contacts. Works
 * with ToggleButtonGroupControlled to control how the user
 * wishes to view their contacts
 * @param props
 * @return {JSX.Element} returns the rendering associated with
 * viewing the user's contacts
 */
export default function ContactList(props) {

  return (
    <div>
       <ToggleButtonGroupControlled {...props} />
    </div>
  )
}
