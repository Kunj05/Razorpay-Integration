import React, { useState } from 'react';
import axios from 'axios';

// Sample courses data
const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Doe",
    price: 199,
    rating: 4.7,
    duration: "30 hours",
    description: "Learn HTML, CSS, JavaScript, Node.js, and more!"
  },
  {
    id: 2,
    title: "Introduction to Machine Learning",
    instructor: "Jane Smith",
    price: 149,
    rating: 4.8,
    duration: "20 hours",
    description: "Explore machine learning from basic concepts to building models."
  }
];

// Function to dynamically load Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const App = () => {
  const [purchaseMessage, setPurchaseMessage] = useState('');

  // Create an order on the backend using axios
  const createOrder = async (amount, currency) => {
    try {
      // Sending amount and currency to the backend to create an order using axios
      const response = await axios.post('http://localhost:5000/api/v1/payment/create-order', {
        amount,
        currency,
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
      throw error; 
    }
  };

  // Handle Buy Now action
  const handleBuyNow = async (e) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    
    if (!res) {
      alert('Razorpay SDK failed to load!');
      return;
    }

    try {
      // Create the order on the backend with the course price and currency
      const orderData = await createOrder(199, 'INR'); 
      console.log(orderData);
      const options = {
        key: "RAZORPAY_KEY_ID", // Replace with your Razorpay key
        amount: orderData.amount , 
        currency: "INR",
        name: "Zymo",
        description: "title",
        image: "https://picsum.photos/id/237/200/300",
        order_id: orderData.id, // Use the order ID from the backend
        handler: async function (response){
          // console.log("Started handling the response");
          const data = {
            ...response,
          }
          await axios.post('http://localhost:5000/api/v1/payment/verifyPayment', data);
          const jsonRes=JSON.stringify(response);
          // console.log("Handled the response");
          console.log(jsonRes);
        },
        theme: {
          color: "#3399cc",
        },
        prefill: {
          name: "John Doe", 
          email: "john.doe@example.com",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error('Error during payment initiation:', error);
      setPurchaseMessage('Something went wrong during the purchase process.');
    }
  };

  return (
    <div className="course-list">
      <h1>Our Courses</h1>
      <div className="courses">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p><strong>Price:</strong> ₹{course.price.toFixed(2)}</p>
            <p><strong>Rating:</strong> {course.rating} ⭐</p>
            <button onClick={() => handleBuyNow(course.id)}>Buy Now</button>
          </div>
        ))}
      </div>
      {purchaseMessage && <div className="purchase-message">{purchaseMessage}</div>}
    </div>
  );
};

export default App;
