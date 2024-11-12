import React, { useState } from "react";
import axios from "axios";
import "./CreateUser.css";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    // State variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");  
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Submit function
    const submit = async (e) => {
        e.preventDefault();

        // Data to be sent
        const userData = {
        name,
        email,
        age: Number(age),
    };


        try {
            const result = await axios.post("https://crud-backend-1-hpf7.onrender.com/createUser", userData);
            console.log(result);
            setSuccess("User added successfully!"); 
            setError("");  
            navigate("/"); 
        } catch (err) {
            console.error(err);
            setError("Failed to add user. Please try again.");  
            setSuccess("");  
        }
    };

    return (
        <div className="create-user-container">
            <div className="form-wrapper">
                <form onSubmit={submit}>
                    <h2>Add User</h2>
                    {success && <div className="success-message">{success}</div>}

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
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
