import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import UrlCard from "../components/UrlCard";
import QRCard from "../components/QRCard";
import {
  handleGenerateQRCodes,
  handleAddUrl,
  handleUrlChange,
  handleShowCustomization,
  handleCustomizationChange,
  handleDeleteUrl,
} from "../utils/helpers";

export default function Home() {
  const [urls, setUrls] = useState([
    {
      url: "",
      width: 100,
      margin: 0,
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      showOptions: false,
    },
  ]);

  const [qrcodes, setQrcodes] = useState([]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title-container">
          <h1 className="my-4">QRify Generator</h1>
        </div>

        {urls.map((item, index) => (
          <UrlCard
            key={index}
            index={index}
            url={item.url}
            width={item.width}
            margin={item.margin}
            primaryColor={item.primaryColor}
            secondaryColor={item.secondaryColor}
            showOptions={item.showOptions}
            onUrlChange={(index, value) =>
              handleUrlChange(index, value, urls, setUrls)
            }
            onShowCustomization={() =>
              handleShowCustomization(index, urls, setUrls)
            }
            onCustomizationChange={(index, field, value) =>
              handleCustomizationChange(index, field, value, urls, setUrls)
            }
            onDeleteUrl={() => handleDeleteUrl(index, urls, setUrls)}
          />
        ))}

        <div className="button-group mb-3">
          <button
            className="btn btn-secondary btn btn-success"
            onClick={() => handleAddUrl(urls, setUrls)}
            disabled={!urls[urls.length - 1].url.trim()}
          >
            <i className="bi bi-plus-circle"> </i>
            Add Another
          </button>

          <button
            className="btn btn-primary"
            onClick={() => handleGenerateQRCodes(urls, setQrcodes)}
            disabled={!urls[urls.length - 1].url.trim()}
          >
            <i className="bi bi-qr-code">Generate QR Codes</i>
          </button>
        </div>

        {qrcodes.length > 0 && (
          <div className="qr-card-container">
            <QRCard qrcodes={qrcodes} />
          </div>
        )}
      </div>
    </>
  );
};