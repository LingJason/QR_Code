import React from "react";
import { handleDownload } from "../utils/helpers";
import "../styles/QRCard.css";

export default function QRCard({ qrcodes }) {
  return (
    <div className="qr-code-section">
      {qrcodes.map((svg, index) => (
        <QRCodeItem key={index} svg={svg} index={index} />
      ))}
    </div>
  );
}

const QRCodeItem = ({ svg, index }) => (
  <div className="qr-code mb-3">
    <div dangerouslySetInnerHTML={{ __html: svg }} />
    <button
      className="btn btn-success mt-3 download-link"
      onClick={() => handleDownload(svg, index)}
    >
      Download {index > 0 ? `QR Code ${index}` : "QR Code"}
    </button>
  </div>
);
