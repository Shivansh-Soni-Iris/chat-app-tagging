import React, { useState } from "react";
import Chat from "./Chat";

function App() {
  const [trigger, setTrigger] = useState("@");
  const [term, setTerm] = useState("");

  const addSuggestion = async () => {
    if (!term.trim()) return;
    await fetch("http://localhost:4000/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trigger, term }),
    });
    setTerm("");
  };

  const removeSuggestion = async () => {
    if (!term.trim()) return;
    await fetch("http://localhost:4000/suggestions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trigger, term }),
    });
    setTerm("");
  };

  return (
    <div style={styles.app}>
      <Chat />
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Manage Suggestions</h3>
        <div style={styles.formRow}>
          <label style={styles.label}>Trigger</label>
          <select
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            style={styles.select}
          >
            <option value="@">@</option>
            <option value="#">#</option>
          </select>
        </div>
        <div style={styles.formRow}>
          <label style={styles.label}>Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Enter term"
            style={styles.input}
          />
        </div>
        <div style={styles.buttonRow}>
          <button
            onClick={addSuggestion}
            style={{ ...styles.button, ...styles.addBtn }}
          >
            ➕ Add
          </button>
          <button
            onClick={removeSuggestion}
            style={{ ...styles.button, ...styles.removeBtn }}
          >
            ❌ Remove
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    background: "#f5f7fa",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  formCard: {
    width: "480px",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },
  formTitle: {
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    gap: "10px",
  },
  label: {
    width: "80px",
    fontWeight: "500",
    color: "#555",
  },
  select: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#fafafa",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    color: "#fff",
  },
  addBtn: {
    background: "#28a745",
  },
  removeBtn: {
    background: "#dc3545",
  },
};

export default App;
