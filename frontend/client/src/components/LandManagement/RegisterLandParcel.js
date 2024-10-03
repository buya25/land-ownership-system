import '../styles/css/LandTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const RegisterLandPage = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'danger'

  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // State for form inputs
  const [username, setName] = useState('');
  const [units, setUnits] = useState('');
  const [parcelId, setParcelId] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/land/viewAll');
        // Check if response.data is an array
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging information

        // Check if data.details is an array
      if (Array.isArray(data.details)) {
        setContacts(data.details);
      } else {
        console.error('Unexpected data format:', data);
        setContacts([]); // Set to empty array if the format is unexpected
      }


        setContacts(data.details || []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setAlertMessage('Failed to load land parcels.');
        setAlertType('danger');
        setTimeout(() => setAlertMessage(''), 3000);
      }
    };

    fetchContacts();
  }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:4000/api/land/example/register', {
          username,
          parcelId,
          email,
          location,
          units,
          size
        });

        const responseData = response.data;
  
        //checking if the data was successfull
        if (responseData.success) {
          const response_get = await axios.get('http://localhost:4000/api/land/viewAll');

          // Update the contacts list with the new parcel
          setContacts(response_get.data.details);
  
          // Set success alert
          setAlertMessage('Land parcel registered successfully!');
          setAlertType('success');

          // Automatically hide the alert after 3 seconds
          setTimeout(() => setAlertMessage(''), 3000);

            setName('');
            setParcelId('');
            setEmail('');
            setLocation('');
            setSize('');


          // Close the modal
          handleClose();
        } else {

          // Set error alert
          setAlertMessage(`Error: ${response.data.error}`);
          setAlertType('danger');

          // Automatically hide the alert after 3 seconds
          setTimeout(() => setAlertMessage(''), 3000);

          // Handle any errors returned by the backend
          console.error('Error:', response.data);
        }
      } catch (error) {
        // Set error alert
      setAlertMessage(`There was an error registering the land parcel: ${error.message}`);
      setAlertType('danger');

      // Automatically hide the alert after 3 seconds
      setTimeout(() => setAlertMessage(''), 3000);
        console.error('There was an error registering the land parcel:', error.message);
      }
    };

  // Filter contacts based on search query
  const filteredContacts = (contacts || []).filter((contact) =>
    contact && contact.parcelId && (
    (contact.parcelId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.transactionCode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.email || '').toString().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container">
        <div className="row">
        </div>
      {/* Display alert if there's a message */}
      {alertMessage && (
        <Alert variant={alertType} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
      )}

      {/* The rest of your code for the table and other parts */}
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="mb-3">
            <h5 className="card-title">Contact List <span className="text-muted fw-normal ms-2">(834)</span></h5>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
            <Button variant="primary" onClick={handleShow}>
              <i className="bx bx-plus me-1"></i> Add New Land Parcel
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="col-lg-12">
          <Form.Control
            type="text"
            placeholder="Search... "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>


      {/* Contact List Table */}
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table project-list-table table-nowrap align-middle table-borderless">
              <thead>
                <tr>
                  <th scope="col" className="ps-4" style={{ width: '50px' }}>
                    <div className="form-check font-size-16">
                      <input type="checkbox" className="form-check-input" id="contacusercheck" />
                      <label className="form-check-label" htmlFor="contacusercheck"></label>
                    </div>
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Parcel ID</th>
                  <th scope="col">Location</th>
                  <th scope="col">size</th>
                  <th scope="col">token</th>
                  <th scope="col">Date</th>
                  <th scope="col">Email</th>
                  <th scope="col" style={{ width: '200px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact, index) => (
                  <tr key={index}>
                    <th scope="row" className="ps-4">
                      <div className="form-check font-size-16">
                        <input type="checkbox" className="form-check-input" id={`contacusercheck${index}`} />
                        <label className="form-check-label" htmlFor={`contacusercheck${index}`}></label>
                      </div>
                    </th>
                    <td>
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="avatar-sm rounded-circle me-2"
                      />
                      <a
                        href="#"
                        className="text-body"
                        onClick={() => navigate('/user-details', { state: { user: contact } })}
                      >
                        {contact.username
                          ? contact.username.length > 15
                            ? `${contact.username.substring(0, 15)}...`
                            : contact.username
                          : "Unknown Name"}
                      </a>

                    </td>
                    <td><span className="badge badge-soft-success mb-0">{contact.parcelId || "N/A"}</span></td>
                    <td>
                      {contact.location
                        ? contact.location.length > 20
                          ? `${contact.location.substring(0, 20)}...`
                          : contact.location
                        : "Unknown Location"}
                    </td>
                    <td>{contact.size || "N/A"}</td>
                    <td>
                      {contact.transactionCode
                        ? `${contact.transactionCode.slice(0, 3)}****${contact.transactionCode.slice(-3)}`
                        : "N/A"}
                    </td>
                    <td>
                      {contact.dateRegistered
                        ? new Date(contact.dateRegistered).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        : "N/A"}
                    </td>
                    <td>
                      {contact.email
                        ? contact.email.length > 20
                          ? `${contact.email.substring(0, 20)}...`
                          : contact.email
                        : "Unknown Email"}
                    </td>

                    <td>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <a href="#" className="px-2 text-primary"><i className="bx bx-pencil font-size-18"></i></a>
                        </li>
                        <li className="list-inline-item">
                          <a href="/land/transfer" className="px-2 text-danger"><i className="bx bx-transfer font-size-18"></i></a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add New Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Land Parcel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formParcelId">
              <Form.Label>Parcel ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Parcel ID"
                value={parcelId}
                onChange={(e) => setParcelId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSize">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      
      {/* Pagination */}
      {contacts.length > 9 && (
        <div className="row g-0 align-items-center pb-4">
          <div className="col-sm-6">
            <p className="mb-sm-0">Showing 1 to 10 of {contacts.length} entries</p>
          </div>
          <div className="col-sm-6">
            <ul className="pagination mb-sm-0 float-sm-end">
              <li className="page-item disabled">
                <a href="/" className="page-link"><i className="mdi mdi-chevron-left"></i></a>
              </li>
              <li className="page-item active"><a href="#" className="page-link">1</a></li>
              <li className="page-item"><a href="/" className="page-link">2</a></li>
              <li className="page-item"><a href="/" className="page-link">3</a></li>
              <li className="page-item"><a href="/" className="page-link">4</a></li>
              <li className="page-item"><a href="/" className="page-link">5</a></li>
              <li className="page-item">
                <a href="#" className="page-link"><i className="mdi mdi-chevron-right"></i></a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterLandPage;


