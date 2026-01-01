const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory suggestion store
const suggestions = {
  "@": ["Shivansh", "Riya", "Rahul", "Admin"],
  "#": ["urgent", "frontend", "release", "bugfix"],
};

// GET suggestions by trigger + query
app.get("/suggestions", (req, res) => {
  const trigger = req.query.trigger || "@";
  const q = (req.query.q || "").toLowerCase();
  const list = suggestions[trigger] || [];
  const filtered = list.filter((s) => s.toLowerCase().startsWith(q));
  res.json(filtered);
});

// POST add new suggestion
app.post("/suggestions", (req, res) => {
  const { trigger, term } = req.body;
  if (!suggestions[trigger]) suggestions[trigger] = [];
  suggestions[trigger].push(term);
  res.json({ ok: true, list: suggestions[trigger] });
});

// DELETE remove suggestion
app.delete("/suggestions", (req, res) => {
  const { trigger, term } = req.body;
  suggestions[trigger] = (suggestions[trigger] || []).filter((s) => s !== term);
  res.json({ ok: true, list: suggestions[trigger] });
});

app.listen(4000, () => {
  console.log("Suggestion API running on http://localhost:4000");
});
