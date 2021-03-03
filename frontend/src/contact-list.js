import React, {useState} from 'react'
import './App.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useCore } from './use-core.js';



export class FullContact extends React.Component {
  render() {
    return (
      <div >
        <div className="Email">
          <span classname="email">Email: {this.props.email}</span>
        </div>
        <div className="PhoneNumber">
          <span classname="number">Phone Number: {this.props.phoneNumber}</span>
        </div>
        <div className="Company">
          <span classname="company">Company: {this.props.company}</span>
        </div>
        <div className="DateMet">
          <span classname="dateMet">Date Met: {this.props.dateMet}</span>
        </div>
        <div className="DateLastInteracted">
          <span classname="dateLastInteracted">Last Contacted: {this.props.dateLastInteracted}</span>
        </div>
        <div className="School">
          <span classname="school">School: {this.props.schoolAttended}</span>
        </div>
        <div className="Notes">
          <span classname="notes">Notes: {this.props.notes}</span>
        </div>
      </div>
    )
  }
}

export class Name extends React.Component {
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

export function ToggleButtonGroupControlled(props){
  const [value, setVal] = useState(true);
  const toggleClass = () => {setVal((value, props) => !value);};
  let core = useCore();
  const contacts = core.coreObject.networkObject.contacts;
   return(
      <div>
        <div>
          <ToggleButtonGroup type="radio" name="options" defaultValue={true} onChange={toggleClass}>
            <ToggleButton variant='dark' value={true} checked={true}>List Format</ToggleButton>
            <ToggleButton variant='dark' value={false} checked={false}>Grid Format</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className = {value? "Contact-list":"Grid-contact-container"} >
            {contacts.map((cont, i) =>(
              <div className = {value? "Contact":"Grid-contact"} >
                <Name {...cont} value={value} key={i} />
                {!value? <FullContact {...cont}/>: null}
              </div>
            ))}
        </div>
      </div>
      );
}

export default class ContactList extends React.Component {
  render() {
    return (
      <div>
         <ToggleButtonGroupControlled/>
      </div>
    )
  }
}