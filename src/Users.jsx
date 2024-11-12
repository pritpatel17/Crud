import React, { useState, useEffect } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);

    // Fetch users data from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await axios.get("http://localhost:3001"); 
                setUsers(result.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, []);

    // Handle user deletion
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`https://crud-backend-1-hpf7.onrender.com/deleteUser/${userId}`);
            setUsers(users.filter((user) => user._id !== userId)); 
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Failed to delete user. Please try again.");
        }
    };

    return (
        <div className="users-container">
            <div className="header">
                <Link to="/create" className="add-button">Add+</Link>
            </div>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className="edit-button">Edit</Link>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
