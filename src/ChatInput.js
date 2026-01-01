import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "./store/messageSlice";

export default function ChatInput() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [trigger, setTrigger] = useState(null);

  const fetchSuggestions = async (trigger, query) => {
    const res = await fetch(
      `http://localhost:4000/suggestions?trigger=${trigger}&q=${query}`
    );
    return res.json();
  };

  const handleInput = async () => {
    const text = editorRef.current.innerText;
    const lastChar = text.slice(-1);

    if (lastChar === "@" || lastChar === "#") {
      setTrigger(lastChar);
      const list = await fetchSuggestions(lastChar, "");
      setSuggestions(list);
    } else if (trigger) {
      const parts = text.split(trigger);
      const query = parts[parts.length - 1].toLowerCase();
      const list = await fetchSuggestions(trigger, query);
      setSuggestions(list);
    } else {
      setSuggestions([]);
    }
  };

  // Insert selected suggestion as atomic styled tag, replacing typed prefix
  const handleSelect = (s) => {
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const node = range.startContainer;

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const match = text.match(new RegExp(`${trigger}[a-zA-Z0-9]*$`));
      if (match) {
        const start = text.lastIndexOf(match[0]);
        const before = text.slice(0, start);
        const after = text.slice(range.startOffset);
        node.textContent = before;

        const span = document.createElement("span");
        span.textContent = `${trigger}${s}`;
        span.contentEditable = "false";
        span.style.background = "#e6f0ff";
        span.style.color = "#1e5eff";
        span.style.padding = "2px 6px";
        span.style.borderRadius = "12px";
        span.style.marginRight = "4px";
        span.style.border = "1px solid #cfe2ff";

        const space = document.createTextNode(" ");
        const tail = document.createTextNode(after);
        const parent = node.parentNode;
        parent.insertBefore(span, node.nextSibling);
        parent.insertBefore(space, span.nextSibling);
        parent.insertBefore(tail, space.nextSibling);

        const newRange = document.createRange();
        newRange.setStart(tail, tail.length);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    }

    setSuggestions([]);
    setTrigger(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const range = sel.getRangeAt(0);
      const node = range.startContainer;

      if (node.nodeType === Node.TEXT_NODE && range.startOffset === 0) {
        const prev = node.previousSibling;
        if (
          prev &&
          prev.nodeType === Node.ELEMENT_NODE &&
          prev.contentEditable === "false"
        ) {
          prev.remove();
          e.preventDefault();
        }
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const text = editorRef.current.innerText.trim();
      if (text) {
        dispatch(addMessage({ id: Date.now().toString(), content: text }));
        editorRef.current.innerHTML = "";
        setSuggestions([]);
        setTrigger(null);
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "10px",
        borderTop: "1px solid #ccc",
      }}
    >
      <div
        ref={editorRef}
        contentEditable
        style={{
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "8px",
          minHeight: "40px",
          background: "#fff",
        }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      />
      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "10px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            width: "240px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {suggestions.map((s) => (
            <div
              key={s}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #f2f2f2",
                fontWeight: 500,
              }}
              onMouseDown={() => handleSelect(s)}
            >
              {trigger}
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
