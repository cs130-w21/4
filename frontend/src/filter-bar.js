import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalTitle from 'react-bootstrap/ModalTitle'


export default class FilterBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose(event) {
    this.setState({show: false});
  }

  handleShow(event) {
    this.setState({show: true});
  }

  render() {
    return (
      <div className="Contact-format">


          {/* <Button>+ Add Contact</Button> */}

        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>

        <>
          <Button variant="secondary" onClick={this.handleShow}>
            + Add Contact
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>

            <Modal.Header closeButton>
              <Modal.Title>Add a new contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <label className="control-label">Name</label>
                  <div>
                    <input type="name" className="form-control input-sm" name="name" value="">
                    </input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Email</label>
                  <div>
                    <input type="email" className="form-control input-sm" name="email" value="">
                    </input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Phone Number</label>
                  <div>
                    <input type="number" className="form-control input-sm" name="phone number" value="">
                    </input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Company</label>
                  <div>
                    <input type="name" className="form-control input-sm" name="company" value="">
                    </input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Date Met</label>
                  <div>
                    <input type="name" className="form-control input-sm" name="date" value="">
                    </input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">School Attended</label>
                  <div>
                    <input type="name" className="form-control input-group-lg" name="school" value="">
                    </input>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Contact
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    )
  }

}
