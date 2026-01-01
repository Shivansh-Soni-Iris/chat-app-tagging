Chat App with WhatsApp-Style Tagging & Dynamic Autocomplete

------------------------------------------------------------
🚀 Tech Stack
- Frontend: React, Redux Toolkit (Next.js optional for SSR)
- Backend: Node.js, Express (mock REST API)
- State Management: Redux
- UI: Inline styles / CSS
- Package Manager: npm

------------------------------------------------------------
🎯 Features
- WhatsApp-style tagging with @ (mentions) and # (hashtags).
- Dynamic autocomplete suggestions fetched from backend API.
- Suggestions update in real time as user types.
- Admin panel to add/remove suggestions dynamically.
- Styled tags (pill-like spans with background color).
- Atomic backspace removal (entire tag deleted in one action).
- Messages render with highlighted tags in chat history.
- Hashtags are clickable → filter messages by topic.
- Mentions are clickable → placeholder action (alert, can be extended to profile popup).

------------------------------------------------------------
🛠️ How to Run Locally

1. Clone the repository:
   git clone https://github.com/your-username/chat-app-tagging.git
   cd chat-app-tagging

2. Install dependencies:
   npm install

3. Start backend:
   cd backend
   node server.js
   (Backend runs at http://localhost:4000)

4. Start frontend:
   cd ..
   npm start
   (Frontend runs at http://localhost:3000)

------------------------------------------------------------
📐 Architecture
- Frontend
  - Chat.js: Renders chat window and messages.
  - ChatInput.js: Handles input, tagging, autocomplete, atomic backspace.
  - store/messagesSlice.js: Redux slice for messages.
  - store/suggestionsSlice.js: Redux slice for suggestion state.
- Backend
  - server.js: Express server with REST endpoints:
    - GET /suggestions?trigger=@&q=sh → fetch suggestions.
    - POST /suggestions → add new suggestion.
    - DELETE /suggestions → remove suggestion.
- Data Flow
  - User types → trigger detected → frontend calls backend → suggestions popup → user selects → tag inserted → message sent → Redux updates → UI renders with highlights.

------------------------------------------------------------
📊 Algorithm Description
1. Trigger Detection
   - Monitor input for @ or #.
   - When detected, set trigger state.

2. Fetch Suggestions
   - Call backend API with trigger and query.
   - Backend returns filtered suggestions.

3. Autocomplete Popup
   - Display suggestions in dropdown.
   - Update list as user continues typing.

4. Tag Insertion
   - On selection, replace typed prefix with styled span (<span contentEditable="false">).
   - Insert trailing space for continued typing.

5. Atomic Backspace
   - Detect caret before a tag span.
   - Remove entire span in one action.

6. Message Send
   - On Enter, dispatch message to Redux.
   - Clear input editor.

7. Message Rendering
   - Split message text by regex (@word / #word).
   - Wrap tags in styled spans.
   - Hashtags clickable → filter messages.
   - Mentions clickable → placeholder action.

------------------------------------------------------------
📜 Assumptions
- Suggestions stored in memory (no database persistence).
- Real-time updates simulated via REST calls.
- Focus is on tagging/autocomplete behavior, not full chat system.
- Next.js optional; demo uses plain React for simplicity.

------------------------------------------------------------
📦 Deliverables
1. GitHub Repository Link → this repo.
2. Notes on Approach
   - Modular React components.
   - Redux for predictable state.
   - Express backend for dynamic suggestions.
   - Inline styles for quick UI prototyping.
3. Algorithm + Flowchart
   - Algorithm described above.
   - Flowchart provided separately (PDF/image).
4. Optional Demo/GIF
   - Short clip showing tagging + backspace removal.

------------------------------------------------------------
📸 Demo Preview
- Type @ → see user suggestions.
- Type # → see topic suggestions.
- Select suggestion → styled tag inserted.
- Backspace → removes entire tag.
- Hashtag click → filters messages.