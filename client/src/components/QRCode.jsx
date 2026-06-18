import { QRCodeSVG } from 'qrcode.react';

function QRCode({ value, size = 128 }) {
  return (
    <div className="qr-wrapper">
      <QRCodeSVG 
        value={value} 
        size={size} 
        bgColor="#0b0f19" 
        fgColor="#ffffff" 
      />
      <style>{`
        .qr-wrapper {
          display: inline-flex;
          padding: 1rem;
          background: #0b0f19;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default QRCode;