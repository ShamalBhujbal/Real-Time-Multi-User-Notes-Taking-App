import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const DeleteNoteModal = ({ show, onHide, note, onNoteDeleted }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await axios.delete(`/api/notes/${note._id}`);
      if (response.data.success) {
        onNoteDeleted();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete note');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    onHide();
  };

  if (!note) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <p>Are you sure you want to delete this note?</p>
        <div className="border p-3 rounded bg-light">
          <strong>{note.title}</strong>
          <p className="text-muted mb-0 mt-2">
            {note.content.substring(0, 100)}
            {note.content.length > 100 ? '...' : ''}
          </p>
        </div>
        <p className="mt-3 text-danger">
          <small>This action cannot be undone.</small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          No, Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteNoteModal;

