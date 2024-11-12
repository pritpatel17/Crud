import React, { useState, useEffect } from "react";
import "./CreateUser.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams(); // Get the user ID from the URL
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Fetch user data based on ID when the component loads
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await axios.get(`https://crud-backend-1-hpf7.onrender.com/getUser/${id}`);
                const user = result.data;
                setName(user.name);
                setEmail(user.email);
                setAge(user.age);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load user data.");
            }
        };
        fetchUserData();
    }, [id]);

    // Handle form submission for updating the user
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!name || !email || !age) {
            setError("All fields are required.");
            setSuccess("");
            return;
        }

        const updatedUserData = {
            name,
            email,
            age,
        };

        try {
            // Send PUT request to update the user
            await axios.put(`https://crud-backend-1-hpf7.onrender.com/updateUser/${id}`, updatedUserData);
            setSuccess("User updated successfully!");
            setError("");

            // Redirect to the users list page
            navigate("/");
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Failed to update user. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="create-user-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>

                    {/* Display success message */}
                    {success && <div className="success-message">{success}</div>}

                    {/* Display error message */}
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-submit">
                        Update User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
