import React, {useState} from 'react'
import './App.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/esm/Button';
import { useCore } from './use-core.js';


//eventually use get method to pull from db, for now this is dummy data
export class Contact extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ObjectID: 0,
      groupsObject: [],
      first: '',
      last: '',
      email: '',
      phoneNumber: '',
      company: '',
      dateMet: '',
      dateLastInteracted: '',
      schoolAttended: '',
      notes: '',
    };
    //have methods expand, get, add...
  }

  render() {
    return (
      //<div className="Contact">
      <div className="Grid-contact">
        <div className="Name">
          <span className="first"> Name: {this.state.first} </span>
          <span className="last"> {this.state.last} </span>
        </div>
        <div className="Email">
          <span classname="email">Email: {this.state.email}</span>
        </div>
        <div className="PhoneNumber">
          <span classname="number">Phone Number: {this.state.phoneNumber}</span>
        </div>
        <div className="Company">
          <span classname="company">Company: {this.state.company}</span>
        </div>
        <div className="DateMet">
          <span classname="dateMet">Date Met: {this.state.dateMet}</span>
        </div>
        <div className="DateLastInteracted">
          <span classname="dateLastInteracted">Last Contacted: {this.state.dateLastInteracted}</span>
        </div>
        <div className="School">
          <span classname="school">School: {this.state.schoolAttended}</span>
        </div>
        <div className="Notes">
          <span classname="notes">Notes: {this.state.notes}</span>
        </div>
      </div>
    )
  }

}

function renderContact(i){
  return <Contact value={i}/>;
};

function ToggleButtonGroupControlled(props){
  const [value, setVal] = useState(true);
  const toggleClass = () => {setVal((value, props) => !value);};
  /*let core = useCore();
  contacts = core.coreObject.networkObject.contacts*/
   return(
      <div>
        <div>
          <ToggleButtonGroup type="radio" name="options" defaultValue={true} onChange={toggleClass}>
            <ToggleButton variant='dark' value={true} checked={true}>List Format</ToggleButton>
            <ToggleButton variant='dark' value={false} checked={false}>Grid Format</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className = {value? "Contact-list":"Grid-contact-container"} >
          <span className="Contact-info"> {renderContact(0)}</span>
          <span className="Contact-info">{renderContact(1)}</span>
          <span className="Contact-info">{renderContact(2)}</span>
        </div>
      </div>
      );
}

export default class ContactList extends React.Component {
  render() {
    return (
      //TODO: make this loop through entire contact list
      <div>
         <ToggleButtonGroupControlled/>
      </div>
    )
  }

}
