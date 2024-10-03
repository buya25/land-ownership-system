// src/components/ParcelDetailsPage.js

import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../Navigation/NavBar';

const ParcelDetailsPage = () => {
    const [parcelId, setParcelId] = useState('');
    const [parcelDetails, setParcelDetails] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setMessage(''); // Clear any previous messages
            const response = await axios.get(`http://localhost:4000/api/land/details/${parcelId}`);
            
            if (response.status === 200) {
                setParcelDetails(response.data.details);
            } else {
                setMessage('Failed to retrieve parcel details.');
                setParcelDetails(null);
            }
        } catch (error) {
            setMessage('An error occurred while retrieving parcel details.');
            setParcelDetails(null);
            console.error('Error retrieving parcel details:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Parcel Details</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="parcelId">Parcel ID:</label>
                    <input
                        type="text"
                        id="parcelId"
                        value={parcelId}
                        onChange={(e) => setParcelId(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Get Parcel Details</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
            {parcelDetails && (
                <div style={styles.detailsContainer}>
                    <h2>Parcel Information</h2>
                    <p><strong>Location:</strong> {parcelDetails.location}</p>
                    <p><strong>Size:</strong> {parcelDetails.size} {parcelDetails.units}</p>
                    <p><strong>Owner:</strong> {parcelDetails.owner}</p>
                    {/* Add more details here as necessary */}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    message: {
        marginTop: '15px',
        color: '#d9534f',
        fontSize: '18px',
    },
    detailsContainer: {
        marginTop: '20px',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
};

export default ParcelDetailsPage;
