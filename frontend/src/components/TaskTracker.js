import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskTracker = ({onLogout}) => {
  const [tasks, setTasks] = useState([]);
  const [modalData, setModalData] = useState({
    id: null,
    name: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Low',
  });
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
 
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (modalData.id) {
        await axios.patch(`${apiUrl}/${modalData.id}`, modalData);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === modalData.id ? { ...task, ...modalData } : task
          )
        );
      } else {
        const response = await axios.post(apiUrl, modalData);
        setTasks((prevTasks) => [...prevTasks, response.data]);
      }
      resetModalData();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const openModal = (task = null) => {
    setModalData(
      task
        ? { ...task, id: task._id }
        : { id: null, name: '', description: '', dueDate: '', status: 'Pending', priority: 'Low' }
    );
    setShowModal(true);
  };

  const resetModalData = () => {
    setModalData({
      id: null,
      name: '',
      description: '',
      dueDate: '',
      status: 'Pending',
      priority: 'Low',
    });
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Call the passed `onLogout` prop from App
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filterStatus === 'All' || task.status === filterStatus) &&
      (task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Task Tracker</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="d-flex justify-content-between mb-3 flex-wrap">
        <input
          type="text"
          className="form-control me-2 mb-2 search-bar"
          placeholder="Search tasks by name or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="form-select w-auto mb-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="btn btn-primary mb-2" onClick={() => openModal()}>
          Add Task
        </button>
      </div>
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => openModal(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalData.id ? 'Edit Task' : 'Add Task'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Task Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={modalData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={modalData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    className="form-control"
                    value={modalData.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={modalData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Priority</label>
                  <select
                    name="priority"
                    className="form-select"
                    value={modalData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTracker;
