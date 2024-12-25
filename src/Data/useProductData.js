import { useState, useEffect } from 'react';
import BACKEND_URL from './config';
import offerProducts from './offerProducts.json';

const useProductData = (endpoint) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if we're looking for an offer product
        if (endpoint.includes('offer')) {
          const productName = endpoint.split('/')[1];
          const product = offerProducts.products.find(p => 
            p.Name.toLowerCase() === productName.toLowerCase()
          );
          
          if (product) {
            setData(product);
          } else {
            setError('Product not found');
          }
          setLoading(false);
          return;
        }

        // Regular API fetch for non-offer products
        const response = await fetch(`${BACKEND_URL}${endpoint}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { loading, error, data };
};

export default useProductData;
