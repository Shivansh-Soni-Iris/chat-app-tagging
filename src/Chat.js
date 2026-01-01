import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";

export default function Chat() {
  const messages = useSelector((state) => state.messages);
  const [activeHashtag, setActiveHashtag] = useState(null);

  // Filter messages by active hashtag
  const filteredMessages = useMemo(() => {
    if (!activeHashtag) return messages;
    const tag = activeHashtag.toLowerCase();
    return messages.filter((m) => m.content.toLowerCase().includes(tag));
  }, [messages, activeHashtag]);

  // Helper: render text with clickable tags
  const renderMessage = (text) => {
    const parts = text.split(/(\@[A-Za-z0-9]+|\#[A-Za-z0-9]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("@")) {
        return (
          <span
            key={i}
            style={styles.mention}
            onClick={() => handleMentionClick(part)}
          >
            {part}
          </span>
        );
      }
      if (part.startsWith("#")) {
        return (
          <span
            key={i}
            style={{
              ...styles.hashtag,
              ...(activeHashtag === part ? styles.hashtagActive : {}),
            }}
            onClick={() => handleHashtagClick(part)}
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleMentionClick = (tag) => {
    alert(`User profile: ${tag}`);
  };

  const handleHashtagClick = (tag) => {
    setActiveHashtag((prev) => (prev === tag ? null : tag));
  };

  const clearFilter = () => setActiveHashtag(null);

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>
        <span>Chat App</span>
        <div style={styles.filterBar}>
          {activeHashtag ? (
            <>
              <span style={styles.filterBadge}>
                Filtering by {activeHashtag}
              </span>
              <button style={styles.clearBtn} onClick={clearFilter}>
                Clear
              </button>
            </>
          ) : (
            <span style={styles.filterHint}>Click a hashtag to filter</span>
          )}
        </div>
      </div>

      <div style={styles.messages}>
        {filteredMessages.length === 0 ? (
          <div style={styles.empty}>
            {activeHashtag
              ? `No messages found for ${activeHashtag}`
              : "Start chatting…"}
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div key={msg.id} style={styles.message}>
              {renderMessage(msg.content)}
            </div>
          ))
        )}
      </div>

      <ChatInput />
    </div>
  );
}

const styles = {
  chatContainer: {
    width: "480px",
    margin: "20px auto",
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    display: "1",
    display: "flex",
    flexDirection: "column",
    height: "600px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  header: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    fontWeight: 600,
    fontSize: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterHint: {
    fontSize: "12px",
    color: "#777",
  },
  filterBadge: {
    background: "#e6f0ff",
    color: "#1e5eff",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
  },
  clearBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
  },
  messages: {
    flex: 1,
    padding: "12px",
    overflowY: "auto",
    background: "#fafafa",
  },
  message: {
    padding: "10px 12px",
    marginBottom: "8px",
    background: "#f1f5ff",
    borderRadius: "8px",
    color: "#1e1e1e",
    lineHeight: "1.4",
    wordBreak: "break-word",
    maxWidth: "85%",
  },
  mention: {
    background: "#e6f0ff",
    color: "#1e5eff",
    padding: "2px 6px",
    borderRadius: "12px",
    marginRight: "4px",
    fontWeight: "500",
    cursor: "pointer",
  },
  hashtag: {
    background: "#eef8ff",
    color: "#0b75ff",
    padding: "2px 6px",
    borderRadius: "12px",
    marginRight: "4px",
    fontWeight: "500",
    cursor: "pointer",
    border: "1px solid #cfe2ff",
  },
  hashtagActive: {
    background: "#dcebff",
    borderColor: "#9ec5fe",
  },
  empty: {
    color: "#666",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "16px",
  },
};
