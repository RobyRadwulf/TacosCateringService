function validateAndSubmit(formId) {
    // Basic form validation
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

    if (name.trim() === "" || phone.trim() === "") {
        alert("Please fill out all required fields.");
        return;
    }

    // Create a FormData object to gather form data
    const formData = new FormData(document.getElementById(formId));

    const endpoint = 'http://localhost:3000/api/catering';

    // Send a POST request to the server
    fetch(endpoint, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);

            // Check if there is a message from the server and display it
            if (data.message) {
                alert(data.message);
            } else {
                // Handle success, e.g., show a success message to the user
                alert("Form submitted successfully!");
            }
        })
        .catch(error => {
            console.error('Error:', error);

            // Display the specific error message received from the server
            alert("An error occurred while submitting the form. Please try again.\nError: " + error.message);
        });
}

function resetForm() {
    // Reset form fields
    document.getElementById("cateringForm").reset();
}
