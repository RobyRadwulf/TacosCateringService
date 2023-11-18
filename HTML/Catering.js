function validateAndSubmit() {
    // Basic form validation
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

    if (name.trim() === "" || phone.trim() === "") {
        alert("Please fill out all required fields.");
        return;
    }

    // You can add more validation logic as needed

    // Create a FormData object to gather form data
    const formData = new FormData(document.getElementById('cateringForm'));

    // Send a POST request to the server
    fetch('http://localhost:3000/api/catering', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Handle success, e.g., show a success message to the user
            alert("Form submitted successfully!");
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error, e.g., show an error message to the user
        });
}

function resetForm() {
    // Reset form fields
    document.getElementById("cateringForm").reset();
}
