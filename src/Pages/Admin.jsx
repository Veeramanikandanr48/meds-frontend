import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Card, Row, Col } from 'react-bootstrap';
import AdminLayout from '../components/AdminLayout';
import BACKEND_URL from '../Data/config';
import { FaBox, FaLayerGroup, FaShoppingCart, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    URL: '',
    Categories: '',
    Name: '',
    packaging: '',
    Uses: '',
    PRODUCT_DESCRIPTION: '',
    'Discount price1': '',
    'Discount price2': '',
    'Discount price3': '',
    'Discount price4': '',
    'Discount price5': '',
    'Gross price1': '',
    'Gross price2': '',
    'Gross price3': '',
    'Gross price4': '',
    'Gross price5': '',
    'Original price1': '',
    'Original Price2': '',
    'Original price3': '',
    'Original price4': '',
    'Original price5': '',
    'no of packs1': '',
    'no of packs2': '',
    'no of packs3': '',
    'no of packs4': '',
    'no of packs5': ''
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0
  });

  useEffect(() => {
    fetchStats();
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const fetchStats = async () => {
    try {
      const ordersResponse = await fetch(`${BACKEND_URL}orders/count`);
      const ordersData = await ordersResponse.json();

      const productsResponse = await fetch(`${BACKEND_URL}products`);
      const productsData = await productsResponse.json();

      const categoriesResponse = await fetch(`${BACKEND_URL}categories`);
      const categoriesData = await categoriesResponse.json();

      setStats({
        totalProducts: productsData.length || 0,
        totalCategories: categoriesData.length || 0,
        totalOrders: ordersData.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const url = selectedCategory 
        ? `${BACKEND_URL}categories/${selectedCategory}`
        : `${BACKEND_URL}products`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editProduct
        ? `${BACKEND_URL}products/${editProduct._id}`
        : `${BACKEND_URL}products`;
      
      const method = editProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      await fetchProducts();
      setShowModal(false);
      setFormData({});
      setEditProduct(null);
      
      alert(editProduct ? 'Product updated successfully!' : 'Product created successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${BACKEND_URL}products/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="container-fluid p-4">
        <Row className="mb-4 g-3">
          <Col md={4}>
            <Card className="stat-card shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-primary">
                  <FaBox />
                </div>
                <div className="stat-details">
                  <h6 className="stat-title">Total Products</h6>
                  <h3 className="stat-value">{stats.totalProducts}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-success">
                  <FaLayerGroup />
                </div>
                <div className="stat-details">
                  <h6 className="stat-title">Total Categories</h6>
                  <h3 className="stat-value">{stats.totalCategories}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-info">
                  <FaShoppingCart />
                </div>
                <div className="stat-details">
                  <h6 className="stat-title">Total Orders</h6>
                  <h3 className="stat-value">{stats.totalOrders}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-primary">Products Management</h5>
            <Button variant="primary" onClick={handleAddProduct} className="d-flex align-items-center gap-2">
              <FaPlus /> Add New Product
            </Button>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-4 col-md-4">
              <Form.Label className="text-muted">Filter by Category</Form.Label>
              <Form.Select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="table-responsive">
              <Table className="table-hover align-middle">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3">Image</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Packaging</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>
                        <img src={product.URL} alt={product.Name} className="product-img" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                      </td>
                      <td className="fw-medium">{product.Name}</td>
                      <td><span className="badge bg-light text-dark">{product.Categories}</span></td>
                      <td>{product.packaging}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                            className="d-flex align-items-center gap-1"
                          >
                            <FaEdit /> Edit
                          </Button>
                          <Button 
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(product._id)}
                            className="d-flex align-items-center gap-1"
                          >
                            <FaTrash /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{editProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.Name || ''}
                      onChange={(e) => setFormData({...formData, Name: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.Categories || ''}
                      onChange={(e) => setFormData({...formData, Categories: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.URL || ''}
                      onChange={(e) => setFormData({...formData, URL: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Packaging</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.packaging || ''}
                      onChange={(e) => setFormData({...formData, packaging: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Uses</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.Uses || ''}
                  onChange={(e) => setFormData({...formData, Uses: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={formData.PRODUCT_DESCRIPTION || ''}
                  onChange={(e) => setFormData({...formData, PRODUCT_DESCRIPTION: e.target.value})}
                  required
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editProduct ? 'Update Product' : 'Create Product'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Admin;