import { QRCodeSVG } from 'qrcode.react';

function QRCode({ value, size = 128 }) {
  return (
    <div className="qr-wrapper">
      <QRCodeSVG value={value} size={size} bgColor="#1e293b" fgColor="#f1f5f9" />
      <style>{`
        .qr-wrapper {
          padding: 1rem;
          background: var(--bg);
          border-radius: var(--radius);
          border: 1px solid var(--border);
        }
      `}</style>
    </div>
  );
}

export default QRCode;
