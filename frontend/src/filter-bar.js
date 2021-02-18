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
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'


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

        <DropdownButton id="dropdown-basic-button" title="Sort By">
          <Dropdown.Item href="#/action-1">First Name A-Z</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Last Name A-Z</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Role A-Z</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Company A-Z</Dropdown.Item>
          <Dropdown.Item href="#/action-5">Newly Added</Dropdown.Item>
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
                    <Form.Control type="name" placeholder="Ex. John Doe" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Email</label>
                  <div>
                    <Form.Control type="email" placeholder="Name@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Phone Number</label>
                  <div>
                    <Form.Control type="phone number" placeholder="(000)000-0000" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Company</label>
                  <div>
                    <Form.Control type="name" placeholder="Ex. Google" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Current Role</label>
                  <div>
                    <Form.Control type="name" placeholder="Ex. Embedded Software Engineer" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Date Met</label>
                  <div>
                    <Form.Control type="date" placeholder="DD/MM/YYYY" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">School Attended</label>
                  <div>
                    <Form.Control type="name" placeholder="Ex. University of California, Los Angeles" />
                  </div>
                </div>
                <div className="form-group">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>General Notes</Form.Label>
                    <Form.Control placeholder="Ex. Introduced by..." as="textarea" rows={3} />
                  </Form.Group>
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
