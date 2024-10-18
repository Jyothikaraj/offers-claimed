// Handle offer claim
document.getElementById('claim-offer-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
  
    if (!name || !phoneNumber || !email) {
      alert("Please fill in all fields.");
      return;
    }
  
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
  
    // Send the form data to the server using Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbwShjMgsbxubGEYhEZLkFeWRCPlvDQ_JftmGjIlEEMc0ITYhrYHCD6BYDIhX3ziiQzc/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        const qrToken = data.token;
        const qr = new QRious({
          element: document.getElementById('qr-code'),
          value: qrToken,
          size: 200
        });
  
        document.getElementById('qr-code-container').style.display = 'block';
        alert('Offer claimed! Please scan the QR code.');
  
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  });