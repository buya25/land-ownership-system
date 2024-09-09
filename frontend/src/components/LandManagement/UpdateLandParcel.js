// src/components/UpdateLandPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Navigation/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/LandTable.css';

const UpdateLandPage = ({ match }) => {
    const [parcelId, setParcelId] = useState('');
    const [location, setLocation] = useState('');
    const [size, setSize] = useState('');
    const [units, setUnits] = useState('sq ft');
    const [message, setMessage] = useState('');

    // Fetch land parcel details if parcelId is provided
    useEffect(() => {
        const fetchParcelDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/land/details/${parcelId}`);

                console.log('response: ', response.status);

                if (response.status === 200) {
                    const { location, size, units } = response.data.details;
                    setLocation(location || '');
                    setSize(size || '');
                    setUnits(units || '');
                } else {
                    setMessage('Failed to fetch land parcel details.');
                }
            } catch (error) {
                setMessage('An error occurred while fetching land parcel details.');
                console.error('Error fetching land parcel details:', error);
            }
        };

        if (parcelId) {
            fetchParcelDetails();
        }
    }, [parcelId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:4000/api/land/update/${parcelId}`, {
                location: location,
                size: size,
                units
            });
            if (response.status === 200) {
                setMessage('Land parcel updated successfully.');
            } else {
                setMessage('Failed to update land parcel.');
            }
        } catch (error) {
            setMessage('An error occurred while updating the land parcel.');
            console.error('Error updating land parcel:', error);
        }
    };

    return (
        <div className="container mt-5">
            <NavBar/>
            <h1>Update Land Parcel</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="parcelId">Parcel ID:</label>
                    <input
                        type="text"
                        id="parcelId"
                        value={parcelId}
                        onChange={(e) => setParcelId(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location || ''}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <input
                        type="number"
                        id="size"
                        value={size || ''}
                        onChange={(e) => setSize(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="units">Units:</label>
                    <input
                        type="text"
                        id="units"
                        value={units || ''}
                        onChange={(e) => setUnits(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Parcel</button>
            </form>
            {message && <p className="mt-3 text-primary">{message}</p>}
        </div>
    );
};

export default UpdateLandPage;
