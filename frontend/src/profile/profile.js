import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Profile({ user }) {
    const [show, setShow] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const [editSuccess, setEditSuccess] = useState(false); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');

    const handleClose = () => {
        setShow(false);
        setEditSuccess(false); 
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reason: deleteReason }) // Send the reason for deletion
            });
            if (response.ok) {
                // Handle success
                window.location.reload(); // Or any other action you want to perform after deletion
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedUser)
            });
            if (response.ok) {
                setEditedUser(editedUser);
                setEditSuccess(true);
                handleClose();
                window.location.reload();
            } else {
                console.error('Error updating user:', response.statusText);
            }

        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    return (
        <div className='container mt-5 '>
            <div className='col-md-8 offset-2 card text-center'>
                <div className="card-header pt-3 pb-3">
                    <h1>Welcome,<span style={{ fontSize: '20px' }}>{user.name}</span></h1>
                </div>
                <h5 className="card-title pt-3 pb-3">{user.email}</h5>
                <p>Email: {user.email}</p>
                <p>Age: {user.age}</p>
                <p>Gender: {user.gender}</p>
                <p>Address: {user.address}</p>
                <p>Contact Number: {user.contactNumber}</p>
                <div className="card-footer text-muted">
                    <div className='row'>
                        <div className='col-md-6'>
                            <button type="button" className="btn btn-outline-primary w-100" onClick={handleShow}>Edit</button>
                        </div>
                        <div className='col-md-6'>
                            <button type="button" className="btn btn-outline-danger w-100" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>

                    {editSuccess && (
                        <div className="alert alert-success mt-3" role="alert">
                            User information updated successfully!
                        </div>
                    )}

                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={editedUser.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={editedUser.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input type="number" className="form-control" id="age" name="age" value={editedUser.age} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <input type="text" className="form-control" id="gender" name="gender" value={editedUser.gender} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" name="address" value={editedUser.address} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={editedUser.contactNumber} onChange={handleChange} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Button variant="secondary" className='modal-btn' onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                        <div className='col-md-6'>
                            <Button variant="primary" className='modal-btn' onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        </div>
                    </div>


                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="deleteReason">
                        <Form.Label>Reason for Deletion</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteConfirmation}>Delete Account</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
