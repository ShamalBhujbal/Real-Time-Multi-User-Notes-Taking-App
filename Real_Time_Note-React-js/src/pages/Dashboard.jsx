import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import AddNoteModal from '../components/AddNoteModal';
import EditNoteModal from '../components/EditNoteModal';
import DeleteNoteModal from '../components/DeleteNoteModal';
import axios from 'axios';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes');
      if (response.data.success) {
        setNotes(response.data.data);
      }
    } catch (error) {
      showAlert('Failed to fetch notes', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert({ show: false, message: '', variant: 'success' });
    }, 3000);
  };

  const handleAddNote = () => {
    setSelectedNote(null);
    setShowAddModal(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleDeleteNote = (note) => {
    setSelectedNote(note);
    setShowDeleteModal(true);
  };

  const handleNoteAdded = () => {
    setShowAddModal(false);
    fetchNotes();
    showAlert('✅ Note added successfully!', 'success');
  };

  const handleNoteUpdated = () => {
    setShowEditModal(false);
    fetchNotes();
    showAlert('✅ Note updated successfully!', 'success');
  };

  const handleNoteDeleted = () => {
    setShowDeleteModal(false);
    fetchNotes();
    showAlert('🗑️ Note deleted successfully!', 'success');
  };

  return (
    <>
      <Navbar />
      <Container fluid className="py-4">
        {alert.show && (
          <Alert
            variant={alert.variant}
            dismissible
            onClose={() => setAlert({ ...alert, show: false })}
            className="mb-4"
          >
            {alert.message}
          </Alert>
        )}

        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h2 className="mb-1">My Notes</h2>
                <p className="text-muted mb-0">Manage your personal notes</p>
              </div>
              <Button variant="primary" size="lg" onClick={handleAddNote} className="mt-3 mt-md-0">
                ➕ Add Note
              </Button>
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : notes.length === 0 ? (
          <Card className="text-center py-5 border-0 shadow-sm">
            <Card.Body>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <Card.Title className="h3">No notes yet</Card.Title>
              <Card.Text className="text-muted mb-4">
                Start by adding your first note and organize your thoughts!
              </Card.Text>
              <Button variant="primary" size="lg" onClick={handleAddNote}>
                ➕ Add Your First Note
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {notes.map((note) => (
              <Col key={note._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h5 mb-3">{note.title}</Card.Title>
                    <Card.Text
                      className="text-muted flex-grow-1"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '80px',
                      }}
                    >
                      {note.content}
                    </Card.Text>
                    <div className="mt-3 pt-3 border-top">
                      <small className="text-muted d-block mb-2">
                        Updated: {new Date(note.updatedAt).toLocaleDateString()}
                      </small>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="flex-fill"
                          onClick={() => handleEditNote(note)}
                        >
                          ✏️ Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="flex-fill"
                          onClick={() => handleDeleteNote(note)}
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <AddNoteModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onNoteAdded={handleNoteAdded}
        />

        <EditNoteModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          note={selectedNote}
          onNoteUpdated={handleNoteUpdated}
        />

        <DeleteNoteModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          note={selectedNote}
          onNoteDeleted={handleNoteDeleted}
        />
      </Container>
    </>
  );
};

export default Dashboard;

