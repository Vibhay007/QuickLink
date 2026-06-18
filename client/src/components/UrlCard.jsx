import { useState } from 'react';
import QRCode from './QRCode.jsx';
import copyToClipboard from '../utils/copyToClipboard.js';

function UrlCard({ url, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(url.shortUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="url-card card">
      <div className="url-card-header">
        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="url-original">
          {url.title || url.originalUrl}
        </a>
        <span className="url-clicks">{url.clicks} clicks</span>
      </div>
      <div className="url-short">
        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
          {url.shortUrl}
        </a>
      </div>
      
      <div className="url-card-actions">
        <button type="button" className={`btn btn-secondary ${copied ? 'copied-pulse' : ''}`} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button type="button" className={`btn btn-secondary ${showQR ? 'qr-active' : ''}`} onClick={() => setShowQR(!showQR)}>
          {showQR ? 'Hide QR' : 'QR Code'}
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(url._id)}>
          Delete
        </button>
      </div>

      {showQR && (
        <div className="url-qr">
          <QRCode value={url.shortUrl} />
        </div>
      )}

      <style>{`
        .url-card { 
          background: linear-gradient(180deg, #141c2f 0%, #0f1524 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .url-card:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }
        .url-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 0.35rem;
        }
        .url-original {
          color: #ffffff;
          font-weight: 600;
          font-size: 1.05rem;
          text-decoration: none;
          word-break: break-all;
          letter-spacing: -0.2px;
          transition: color 0.15s ease;
        }
        .url-original:hover {
          color: #22c55e;
          text-decoration: none;
        }
        .url-clicks {
          color: #6b7280;
          font-size: 0.8rem;
          font-weight: 600;
          background: #111827;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          white-space: nowrap;
        }
        .url-short { 
          margin-bottom: 1.25rem; 
        }
        .url-short a { 
          color: #22c55e; 
          font-weight: 500;
          font-size: 0.95rem;
          font-family: monospace;
          word-break: break-all; 
          text-decoration: none;
        }
        .url-short a:hover {
          color: #4ade80;
          text-decoration: underline;
        }
        .url-card-actions { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 0.5rem; 
        }
        
        /* Inner Context Specific Overrides for Local Actions Layout */
        .url-card-actions .btn {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          border-radius: 8px;
        }
        .url-card-actions .btn-secondary {
          background: #1f2937;
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #d1d5db;
        }
        .url-card-actions .btn-secondary:hover {
          background: #2d3748;
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }
        .url-card-actions .btn-danger {
          background: rgba(244, 63, 94, 0.05);
          border: 1px solid rgba(244, 63, 94, 0.15);
          color: #f43f5e;
        }
        .url-card-actions .btn-danger:hover {
          background: rgba(244, 63, 94, 0.12);
          border-color: #f43f5e;
        }
        
        /* Interactive Feedback Adjustments */
        .copied-pulse {
          background: rgba(34, 197, 94, 0.15) !important;
          border-color: #22c55e !important;
          color: #22c55e !important;
        }
        .qr-active {
          background: #374151 !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: #ffffff !important;
        }

        .url-qr { 
          margin-top: 1.25rem; 
          display: flex; 
          justify-content: center; 
          background: #0b0f19;
          padding: 1.25rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
      `}</style>
    </div>
  );
}

export default UrlCard;