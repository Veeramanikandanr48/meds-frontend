import React, { useState, useEffect } from 'react';
import BACKEND_URL from '../Data/config';
import AdminLayout from '../components/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBox, FaUser, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}orders`);
      const data = await response.json();
      // Set default status to 'processing' if not present
      const ordersWithStatus = data.map(order => ({
        ...order,
        status: order.status || 'processing'
      }));
      setOrders(ordersWithStatus);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price || !price.total) return 'N/A';
    return `$${price.total.toFixed(2)}`;
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // Enhanced filter function
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter ? order.status.toLowerCase() === statusFilter.toLowerCase() : true;
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm ? (
      order._id.toLowerCase().includes(searchTermLower) ||
      order.customerInfo.email.toLowerCase().includes(searchTermLower) ||
      order.shippingAddress.firstName.toLowerCase().includes(searchTermLower) ||
      order.shippingAddress.lastName.toLowerCase().includes(searchTermLower) ||
      order.cartProducts.some(product => 
        product.Name.toLowerCase().includes(searchTermLower) ||
        product.Mg.toString().toLowerCase().includes(searchTermLower)
      ) ||
      order.status.toLowerCase().includes(searchTermLower)
    ) : true;
    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BACKEND_URL}orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        // Update local state immediately
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? {...order, status: newStatus} : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid p-4">
        <div className="card shadow">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-0 text-primary">
              <FaBox className="me-2 mb-1" />
              Orders Management
            </h2>
            <div className="d-flex gap-2">
              <select 
                className="form-select form-select-sm" 
                style={{width: '150px'}}
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Status</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input 
                type="search" 
                className="form-control form-control-sm" 
                placeholder="Search orders..."
                style={{width: '200px'}}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{height: '400px'}}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle border">
                  <thead>
                    <tr className="bg-light">
                      <th scope="col" className="text-nowrap px-3">Order ID</th>
                      <th scope="col" className="px-3">Customer Details</th>
                      <th scope="col" className="text-center px-3">Total Price</th>
                      <th scope="col" className="px-3">Shipping Address</th>
                      <th scope="col" className="px-3">Order Items</th>
                      <th scope="col" className="text-center px-3">Status</th>
                      <th scope="col" className="text-center px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map(order => (
                      <tr key={order._id} className="border-bottom">
                        <td className="px-3">
                          <div className="d-flex align-items-center">
                            <span className="text-primary fw-medium">#{order._id.slice(-8)}</span>
                          </div>
                        </td>
                        <td className="px-3">
                          <div className="d-flex align-items-center">
                            <FaUser className="text-secondary me-2" />
                            <div>
                              <div className="fw-medium">{order.customerInfo.email}</div>
                              <small className="text-muted">{order.customerInfo.phone}</small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center px-3">
                          <span className="badge bg-success-subtle text-success px-3 py-2 fs-6">
                            {formatPrice(order.totalPrice)}
                          </span>
                        </td>
                        <td className="px-3">
                          <div className="d-flex align-items-start">
                            <FaMapMarkerAlt className="text-secondary me-2 mt-1" />
                            <div>
                              <div className="fw-medium">
                                {`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}
                              </div>
                              <small className="text-muted">
                                {`${order.shippingAddress.address}, ${order.shippingAddress.city}`}
                                <br/>
                                {`${order.shippingAddress.state} ${order.shippingAddress.zip}`}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="px-3">
                          <div className="d-flex align-items-center">
                            <FaShoppingCart className="text-secondary me-2" />
                            <div className="products-list">
                              {order.cartProducts.map(product => (
                                <div key={product._id} className="product-item mb-1">
                                  <div className="fw-medium">{product.Name}</div>
                                  <small className="text-muted">
                                    Qty: {product.noOfPacks} | {product.Mg}
                                  </small>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="text-center px-3">
                          <span className={`badge bg-${getStatusBadgeColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="text-center px-3">
                          <div className="dropdown">
                            <button className="btn btn-sm btn-outline-primary dropdown-toggle" 
                                    type="button" 
                                    data-bs-toggle="dropdown">
                              Update Status
                            </button>
                            <ul className="dropdown-menu">
                              <li><button className="dropdown-item" onClick={() => handleStatusUpdate(order._id, 'processing')}>Processing</button></li>
                              <li><button className="dropdown-item" onClick={() => handleStatusUpdate(order._id, 'shipped')}>Shipped</button></li>
                              <li><button className="dropdown-item" onClick={() => handleStatusUpdate(order._id, 'delivered')}>Delivered</button></li>
                              <li><button className="dropdown-item" onClick={() => handleStatusUpdate(order._id, 'cancelled')}>Cancelled</button></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="card-footer bg-white border-top py-3">
            <nav aria-label="Orders pagination">
              <ul className="pagination justify-content-end mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;