import React, { useState, useEffect } from 'react';
import NavBar from '../Navigation/NavBar';


const ViewAllLandParcels = () => {
  const [landParcels, setLandParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all land parcels from your backend or contract
    const fetchLandParcels = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/land/viewAll');
        if (!response.ok) {
          throw new Error('Failed to fetch land parcels');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging information


        setLandParcels(data.details || []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching land parcels:', error);
        setLandParcels([]); // Set to empty array on error
      }
    };

    fetchLandParcels();
  }, []);

  // Ensure landParcels is an array and has a valid structure
  const filteredParcels = (landParcels || []).filter((parcel) =>
    (parcel._id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (parcel.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (parcel.owner || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (parcel.size || '').toString().includes(searchTerm)
  );

  return (
    <div>
        <NavBar/>
      <h2>All Land Parcels</h2>
      <input
        type="text"
        placeholder="Search by Parcel ID, location, owner, or size"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Parcel ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Size</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Owner</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.length > 0 ? (
            filteredParcels.map((parcel) => (
              <tr key={parcel._id || parcel.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{parcel._id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{parcel.location}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{parcel.size}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{parcel.owner}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>No land parcels available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllLandParcels;
