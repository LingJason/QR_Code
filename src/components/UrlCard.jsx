import React from "react";
import "../styles/UrlCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { GithubPicker } from "react-color";
import { handleColorChange } from "./handlers";
import DisplayColor from "./DisplayColor";

const colorSet = [
  "black",
  "white",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "brown",
];

export default function UrlCard({
  index,
  url,
  width,
  margin,
  primaryColor,
  secondaryColor,
  showOptions,
  onUrlChange,
  onShowCustomization,
  onCustomizationChange,
  onDeleteUrl,
}) {
  return (
    <div key={index} className="url-section mb-3">
      <div className="input-group mb-3">
        {index > 0 && <div className="input-number">{index}</div>}
        <input
          type="text"
          value={url}
          onChange={(e) => onUrlChange(index, e.target.value)}
          placeholder="Enter text or URL"
          className="form-control"
        />
        {index > 0 && (
          <button className="btn btn-danger" onClick={() => onDeleteUrl(index)}>
            Delete <i className="bi bi-trash3"></i>
          </button>
        )}
      </div>

      <button
        className="btn btn-secondary btn btn-warning mb-3"
        onClick={() => onShowCustomization(index)}
      >
        {showOptions ? (
          <>
            <i className="bi bi-arrow-up"></i>Hide Customization
          </>
        ) : (
          <>
            <i className="bi bi-arrow-down"></i>Show Customization
          </>
        )}
      </button>

      {showOptions && (
        <div className="customization-section">
          <div className="customization-item me-3 d-flex align-items-center">
            <label className="me-2">Size:</label>
            <select
              className="form-select text-center"
              value={width}
              onChange={(e) =>
                onCustomizationChange(index, "width", Number(e.target.value))
              }
            >
              <option value={100}>Small</option>
              <option value={200}>Medium</option>
              <option value={300}>Large</option>
            </select>
          </div>

          <div className="customization-item me-3 d-flex align-items-center">
            <label className="me-2">Border:</label>
            <select
              className="form-select"
              value={margin}
              onChange={(e) =>
                onCustomizationChange(index, "margin", Number(e.target.value))
              }
            >
              <option value={0}>None</option>
              <option value={1}>Small</option>
              <option value={2}>Medium</option>
              <option value={3}>Large</option>
            </select>
          </div>

          <div className="customization-item me-3 d-flex align-items-center">
            <label className="me-2">Primary Color:</label>
            <GithubPicker
              width="137px"
              colors={colorSet}
              triangle="hide"
              onChange={(color) =>
                handleColorChange(
                  color,
                  "primaryColor",
                  primaryColor,
                  secondaryColor,
                  index,
                  onCustomizationChange
                )
              }
              color={primaryColor}
            />
            <DisplayColor color={primaryColor} />
          </div>

          <div className="customization-item d-flex align-items-center">
            <label className="me-2">Secondary Color:</label>
            <GithubPicker
              width="137px"
              colors={colorSet}
              triangle="hide"
              onChange={(color) =>
                handleColorChange(
                  color,
                  "secondaryColor",
                  primaryColor,
                  secondaryColor,
                  index,
                  onCustomizationChange
                )
              }
              color={secondaryColor}
            />
            <DisplayColor color={secondaryColor} />
          </div>
        </div>
      )}
    </div>
  );
}
