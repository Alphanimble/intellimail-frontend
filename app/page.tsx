// app/page.tsx
import React from 'react';
import './globals.css'; // Ensure your CSS is imported

export default function Home() {
  return (
    <>
      <header>
        <h1><span className="intelli">Intelli</span><span className="mail">Mail</span></h1>
        <div className="header-buttons">
          <button id="mode-toggle" className="mode-toggle" aria-label="Switch to light mode">
            <span className="light-mode-emoji">☀️</span>
            <span className="dark-mode-emoji">🌙</span>
          </button>
        </div>
      </header>
      <section className="main-content">
        <div className="greeting" role="heading" aria-level="2">
          <span className="gradient-text">Greeting message</span>
        </div>
        <div className="question" role="heading" aria-level="3">
          How can I assist you with your email needs today?
        </div>
        <div className="chat-container" aria-live="polite" aria-relevant="additions removals">
          <div id="chatbot"></div>
          <div className="suggestions" aria-label="Suggested queries">
            <button type="button" className="suggestion">
              <span className="suggestion-text">Show me emails about project updates.</span>
              <span className="suggestion-icon">📈</span>
            </button>
            <button type="button" className="suggestion">
              <span className="suggestion-text">Find emails related to last month’s budget report.</span>
              <span className="suggestion-icon">💰</span>
            </button>
            <button type="button" className="suggestion">
              <span className="suggestion-text">Retrieve all emails from the marketing team.</span>
              <span className="suggestion-icon">📣</span>
            </button>
            <button type="button" className="suggestion">
              <span className="suggestion-text">List emails containing the word 'meeting' from the past week.</span>
              <span className="suggestion-icon">🗓️</span>
            </button>
          </div>
          <form id="chat-form" role="form" aria-label="Chat input form">
            <div className="input-container">
              <input type="text" id="chat-input" placeholder="Ask me anything about email..." required aria-label="User email query input" autoComplete="off" />
              <button type="submit" id="send-button" aria-label="Send message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send">
                  <line x1="7" y1="12" x2="22" y2="12"></line>
                  <polygon points="2 2, 22 12, 2 22, 7 12"></polygon>
                </svg>
              </button>
            </div>
          </form>
          <div id="modal" className="modal" role="dialog" aria-modal="true" style={{ display: 'none' }}>
            <div className="modal-content">
              <p>Thank you for your input! We are processing your request...</p>
              <button id="continue-button">Continue</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
