import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Form, Modal } from 'react-bootstrap';
import AdminLayout from '../components/AdminLayout';
import BACKEND_URL from '../Data/config';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}categories/with-count`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Categories data received:', data);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    // Add category logic here
    setShowModal(false);
    setCategoryName('');
  };

  return (
    <AdminLayout>
      <div className="container-fluid py-4">
        <Card className="shadow-sm">
          <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
            <h4 className="mb-0 text-primary">Categories Management</h4>
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
              className="d-flex align-items-center gap-2"
            >
              <FaPlus /> Add Category
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3">Category Name</th>
                    <th className="px-4 py-3 text-center">Products Count</th>
                    <th className="px-4 py-3 text-center" style={{width: '150px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.name} className="border-bottom">
                      <td className="px-4 py-3">
                        <span className="fw-medium">{category.name}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="badge bg-info-subtle text-info px-3 py-2">
                          {category.count} Products
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="d-flex justify-content-center gap-2">
                          <Button variant="outline-primary" size="sm">
                            <FaEdit />
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-top">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Categories;