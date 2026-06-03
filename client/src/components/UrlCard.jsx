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
        <button type="button" className="btn btn-secondary" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setShowQR(!showQR)}>
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
        .url-card { margin-bottom: 1rem; }
        .url-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .url-original {
          color: var(--text);
          font-weight: 600;
          word-break: break-all;
        }
        .url-clicks {
          color: var(--text-muted);
          font-size: 0.85rem;
          white-space: nowrap;
        }
        .url-short { margin-bottom: 1rem; }
        .url-short a { color: var(--primary); word-break: break-all; }
        .url-card-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .url-qr { margin-top: 1rem; display: flex; justify-content: center; }
      `}</style>
    </div>
  );
}

export default UrlCard;
