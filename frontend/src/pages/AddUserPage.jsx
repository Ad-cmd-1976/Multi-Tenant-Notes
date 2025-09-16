import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import useAdminStore from "../store/useAdminStore.js";

function AddUserPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const { users, getUsers, deleteUser, addUser }=useAdminStore();

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData({ email:'', password:'' });
  };

  const handleDelete = async (userId) => {
    deleteUser(userId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h3 className="text-md font-semibold mb-3">All Users</h3>
        {users.length === 0 ? (
          <p className="text-sm text-gray-500">No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center p-2 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-xs text-gray-500">Role: {user.role}</p>
                </div>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-red-600 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AddUserPage;
