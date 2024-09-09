import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/TransferOnwership.css';
import { Modal, Button } from 'react-bootstrap';

const TransferOwnershipPage = () => {
    const [parcelId, setParcelId] = useState('');
    const [parcelInfo, setParcelInfo] = useState(null);
    const [newOwner, setNewOwner] = useState('');
    const [message, setMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://localhost:4000/api/land/details/${parcelId}`);

            if (response.status === 200) {
                setParcelInfo(response.data.details);
            } else {
                setMessage('Parcel not found.');
                setParcelInfo(null);
            }
        } catch (error) {
            setMessage('An error occurred while searching for the parcel.');
            console.error('Error searching parcel:', error.message);
            setParcelInfo(null);
        }
    };

    const handleTransfer = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/api/land/transfer/${parcelId}`, { newOwner });

            if (response.status === 200) {
                setMessage(`Ownership transferred successfully to ${newOwner}.`);
                setShowConfirmModal(false);
                setShowSuccessModal(true);
                handleSearch(new Event('submit')); // Refresh the parcel information
            } else {
                setMessage('Failed to transfer ownership.');
            }
        } catch (error) {
            setMessage('An error occurred while transferring ownership.');
            console.error('Error transferring ownership:', error.message);
        }
    };

    const handleShowConfirmModal = (event) => {
        event.preventDefault();
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    const handleCloseSuccessModal = () => setShowSuccessModal(false);

    return (
        <div className="transfer-ownership-page">
            <h1>Transfer Ownership</h1>
            
            {/* Search Parcel */}
            <form onSubmit={handleSearch} className="search-form">
                <div className="form-group">
                    <label htmlFor="parcelId">Search Parcel by ID:</label>
                    <input
                        type="text"
                        id="parcelId"
                        value={parcelId}
                        onChange={(e) => setParcelId(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {/* Display Parcel Information */}
            {parcelInfo && (
                <div className="parcel-info">
                    <h3>Current Owner Information</h3>
                    <p><strong>Serial No.:</strong> {parcelInfo._id}</p>
                    <p><strong>Parcel ID:</strong> {parcelInfo.parcelId}</p>
                    <p><strong>Owner Name:</strong> {parcelInfo.username}</p>
                    <p><strong>Owner ID:</strong> {parcelInfo.userId}</p>
                    <p><strong>Location:</strong> {parcelInfo.location}</p>
                    <p><strong>Size:</strong> {parcelInfo.size}</p>
                </div>
            )}

            {/* Transfer Ownership */}
            {parcelInfo && (
                <form onSubmit={handleShowConfirmModal} className="transfer-form">
                    <div className="form-group">
                        <label htmlFor="newOwner">New Owner Address:</label>
                        <input
                            type="text"
                            id="newOwner"
                            value={newOwner}
                            onChange={(e) => setNewOwner(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Transfer Ownership</button>
                </form>
            )}

            {/* Display Message */}
            {message && <p className="message">{message}</p>}

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Ownership Transfer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You are about to change the current ownership information and you may incur some changes. Are you sure you want to proceed?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleTransfer}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Transfer Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ownership has been successfully transferred to {newOwner}.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseSuccessModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TransferOwnershipPage;
