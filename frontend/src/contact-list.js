import React, {useState} from 'react'
import './App.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/esm/Button';
import { useCore } from './use-core.js';
import SearchBar from './search-bar';

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

/**
 *
 * @param props
 * @return {JSX.Element} returns the rendering associated with
 * how the user wishes to view their contacts
 * @constructor
 *
 * Purpose: to allow the user to toggle between list
 * and grid format
 */
export function ToggleButtonGroupControlled(props) {

  const contacts = props.contacts;

  const [value, setVal] = useState(true);
  const toggleClass = () => {setVal((value, props) => !value);};

  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const updateInput = async (input) => {
    const filtered = contacts.filter(contact => {
      let full_name = contact.first + ' ' + contact.last
      let options = full_name + ' ' + contact.email + ' ' + contact.company + ' ' + contact.schoolAttended
      return options.toLowerCase().includes(input.trim().toLowerCase())
    })
    setInput(input);
    setSearchTerm(filtered);
  }

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
            {searchTerm ?
              searchTerm.map((cont, i) =>(
                <div className = {value? "Contact":"Grid-contact"} >
                  <Name {...cont} value={value} key={i} />
                  {!value? <FullContact {...cont}/>: null}
                </div>))
              : contacts.map((cont, i) =>(
              <div className = {value? "Contact":"Grid-contact"} >
                <Name {...cont} value={value} key={i} />
                {!value? <FullContact {...cont}/>: null}
              </div>
            ))}
        </div>
      </div>
      );
}

/**
 *
 * @param props
 * @return {JSX.Element} returns the rendering associated with
 * viewing the user's contacts
 * @constructor
 *
 * Purpose: to allow the user to view their contacts. Works
 * with ToggleButtonGroupControlled to control how the user
 * wishes to view their contacts
 */
export default function ContactList(props) {

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

  console.log(contacts);

  return (
    <div>
       <ToggleButtonGroupControlled contacts={contacts} />
    </div>
  )
}
