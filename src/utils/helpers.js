import QRCode from "qrcode";
import { toast } from "react-toastify";

const showToast = (message, type) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "light",
  });
};

// generate QR codes for a list of urls and update the state
export const handleGenerateQRCodes = async (urls, setQrcodes) => {
  try {
    for (const item of urls) {
      if (item.primaryColor === item.secondaryColor) {
        showToast("Primary and secondary colors cannot be the same", "error");
        return;
      }
    }

    // Generate QR codes as SVG strings
    const qrCodePromises = urls.map(async (item) => {
      const { url, width, margin, primaryColor, secondaryColor } = item;

      return QRCode.toString(url, {
        type: "svg",
        width,
        margin,
        color: {
          dark: primaryColor,
          light: secondaryColor,
        },
      });
    });

    const qrCodes = await Promise.all(qrCodePromises);
    setQrcodes(qrCodes.filter((code) => code !== ""));
    showToast("QR Code Created", "success");
  } catch (err) {
    console.error(err);
    showToast("An error occurred while generating QR codes", "error");
  }
};

export const handleAddUrl = (urls, setUrls) => {
  setUrls([
    ...urls,
    {
      url: "",
      width: 100,
      margin: 0,
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
    },
  ]);
};

// update the URL value of a specific url
export const handleUrlChange = (index, value, urls, setUrls) => {
  const updatedUrls = [...urls];
  updatedUrls[index].url = value;
  setUrls(updatedUrls);
};

// show customization of a specific url
export const handleShowCustomization = (index, urls, setUrls) => {
  const updatedUrls = [...urls];
  updatedUrls[index].showOptions = !updatedUrls[index].showOptions;
  setUrls(updatedUrls);
};

//update customization fields for a specific url and validate color choices
export const handleCustomizationChange = (
  index,
  field,
  value,
  urls,
  setUrls
) => {
  const updatedUrls = [...urls];

  if (
    (field === "primaryColor" && value === updatedUrls[index].secondaryColor) ||
    (field === "secondaryColor" && value === updatedUrls[index].primaryColor)
  ) {
    showToast(
      `${
        field === "primaryColor" ? "Primary" : "Secondary"
      } color can't be the same as ${
        field === "primaryColor" ? "Secondary" : "Primary"
      }`,
      "error"
    );
    return;
  }

  updatedUrls[index][field] = value;
  setUrls(updatedUrls);
};

export const handleDeleteUrl = (index, urls, setUrls) => {
  const updatedUrls = urls.filter((_, idx) => idx !== index);
  setUrls(updatedUrls);
};

// Used for the color picker to handle color
export const handleColorChange = (
  color,
  type,
  primaryColor,
  secondaryColor,
  index,
  onCustomizationChange
) => {
  if (
    (type === "primaryColor" && color.hex === secondaryColor) ||
    (type === "secondaryColor" && color.hex === primaryColor)
  ) {
    showToast(
      `${
        type === "primaryColor" ? "Primary" : "Secondary"
      } color can't be the same as ${
        type === "primaryColor" ? "Secondary" : "Primary"
      }`,
      "error"
    );
    return;
  }

  onCustomizationChange(index, type, color.hex);
};

export const handleDownload = (svg, index) => {
  const downloadSVG = () => {
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = svgUrl;
    link.download = `qrcode_${index}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  downloadSVG();
  showToast(`Downloaded QR Code ${index + 1}`, "success");
};
