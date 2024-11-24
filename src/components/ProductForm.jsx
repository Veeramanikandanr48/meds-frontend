import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const ProductForm = ({ formData, setFormData, onSubmit }) => {
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep1 = () => (
    <>
      <h4 className="mb-4">Basic Information</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={formData.Name || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="Categories"
              value={formData.Categories || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="URL"
              value={formData.URL || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Packaging</Form.Label>
            <Form.Control
              type="text"
              name="packaging"
              value={formData.packaging || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Uses</Form.Label>
            <Form.Control
              type="text"
              name="Uses"
              value={formData.Uses || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="PRODUCT_DESCRIPTION"
          value={formData.PRODUCT_DESCRIPTION || ''}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </>
  );

  const renderStep2 = () => (
    <>
      <h4 className="mb-4">Pricing Information</h4>
      {[1, 2, 3, 4, 5].map(num => (
        <div key={num} className="border rounded p-3 mb-3">
          <h5 className="mb-3">Pack {num}</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Number of Packs</Form.Label>
                <Form.Control
                  type="text"
                  name={`no of packs${num}`}
                  value={formData[`no of packs${num}`] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Original Price</Form.Label>
                <Form.Control
                  type="text"
                  name={`Original price${num}`}
                  value={formData[`Original price${num}`] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gross Price</Form.Label>
                <Form.Control
                  type="text"
                  name={`Gross price${num}`}
                  value={formData[`Gross price${num}`] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Discount Price</Form.Label>
                <Form.Control
                  type="text"
                  name={`Discount price${num}`}
                  value={formData[`Discount price${num}`] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      ))}
    </>
  );

  return (
    <Form onSubmit={onSubmit}>
      {step === 1 ? renderStep1() : renderStep2()}
      
      <div className="d-flex justify-content-between mt-4">
        {step > 1 && (
          <Button variant="secondary" onClick={prevStep}>
            Previous
          </Button>
        )}
        {step < 2 ? (
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button variant="success" type="submit">
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ProductForm;