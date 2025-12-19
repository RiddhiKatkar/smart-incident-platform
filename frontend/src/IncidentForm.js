import {
  FaExclamationTriangle,
  FaTrash,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";
import "./IncidentForm.css";
import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:8001";

function IncidentForm({ setIsLoggedIn }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("LOW");
  const [incidents, setIncidents] = useState([]);
  const [message, setMessage] = useState("");
  const [isAdminView, setIsAdminView] = useState(false);

  const token = localStorage.getItem("access");

  /* ---------------- FETCH USER INCIDENTS ---------------- */
  const fetchIncidents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/incidents/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setIncidents(data);
        setIsAdminView(false);
      } else {
        setIncidents([]);
      }
    } catch (error) {
      setIncidents([]);
    }
  };

  /* ---------------- FETCH ADMIN INCIDENTS ---------------- */
  const fetchAllIncidents = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/admin/incidents/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setIncidents(data);
        setIsAdminView(true);
      } else {
        alert("You are not an admin");
      }
    } catch (error) {
      alert("Failed to load admin incidents");
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  /* ---------------- CREATE INCIDENT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/incidents/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          severity,
        }),
      });

      if (response.ok) {
        setMessage("Incident created successfully");
        setTitle("");
        setDescription("");
        setSeverity("LOW");
        fetchIncidents();
      } else {
        setMessage("Failed to create incident");
      }
    } catch (error) {
      setMessage("Backend error while creating incident");
    }
  };

  /* ---------------- DELETE INCIDENT ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this incident?")) {
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/incidents/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchIncidents();
      } else {
        alert("Failed to delete incident");
      }
    } catch (error) {
      alert("Backend error while deleting");
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("access");
    setIsLoggedIn(false);
  };

  /* ---------------- SEVERITY STYLE ---------------- */
  const getSeverityStyle = (severity) => {
    if (severity === "LOW") return { color: "green", fontWeight: "bold" };
    if (severity === "MEDIUM") return { color: "orange", fontWeight: "bold" };
    if (severity === "HIGH") return { color: "red", fontWeight: "bold" };
    return {};
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Incident Dashboard</h1>

        <div>
          <button
            onClick={fetchAllIncidents}
            style={{ marginRight: "10px", backgroundColor: "#374151" }}
          >
            <FaShieldAlt style={{ marginRight: "6px" }} />
            Admin View
          </button>

          <button onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "6px" }} />
            Logout
          </button>

        </div>
      </div>

    <div className="form-wrapper">
      <div className="form-card">
        <h2>
          <FaExclamationTriangle style={{ marginRight: "8px", color: "#f59e0b" }} />
          Report New Incident
        </h2>


        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <button type="submit">Create Incident</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
      <h2>{isAdminView ? "All Incidents (Admin)" : "Your Incidents"}</h2>

      <div className="incident-list">
        {incidents.length === 0 ? (
          <p>No incidents reported yet.</p>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="incident-card">
              <h3>{incident.title}</h3>
              <p>{incident.description}</p>

              <p>
                Severity:{" "}
                <span style={getSeverityStyle(incident.severity)}>
                  {incident.severity}
                </span>
              </p>

              <button onClick={() => handleDelete(incident.id)}>
                <FaTrash style={{ marginRight: "6px" }} />
                Delete
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default IncidentForm;


