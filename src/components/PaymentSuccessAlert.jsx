import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

const PaymentSuccessAlert = ({ show, onClose }) => {
  const [alert, setAlert] = useState(null);

  // Create and display the SweetAlert when show is true
  React.useEffect(() => {
    if (show) {
      const successAlert = (
        <SweetAlert
          success
          title="Payment Successful!"
          onConfirm={() => onClose(false)} // Close the alert when confirmed
        >
          Order Placed successfully. Our customer team will contact you soon.
        </SweetAlert>
      );

      setAlert(successAlert);
    } else {
      setAlert(null); // Clear the alert when show is false
    }
  }, [show, onClose]);

  return <>{alert}</>;
};

export default PaymentSuccessAlert;
