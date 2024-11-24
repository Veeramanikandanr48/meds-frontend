import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Card } from 'react-bootstrap';

const Users = () => {
  return (
    <AdminLayout>
      <Card>
        <Card.Header>
          <h4 className="mb-0">Users Management</h4>
        </Card.Header>
        <Card.Body>
          <p>Users management functionality coming soon...</p>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Users; 