import QRCode from "qrcode";
import { toast } from "react-toastify";

export const handleGenerateQRCodes = async (urls, setQrcodes) => {
  try {
    // Validate colors before generating QR codes
    for (const item of urls) {
      if (item.primaryColor === item.secondaryColor) {
        toast.error("Primary and secondary colors cannot be the same", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        return; // Stop execution if any pair of colors are the same
      }
    }

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
    toast.success("QR Code Created", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
  } catch (err) {
    console.error(err);
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

export const handleUrlChange = (index, value, urls, setUrls) => {
  const updatedUrls = [...urls];
  updatedUrls[index].url = value;
  setUrls(updatedUrls);
};

export const handleShowCustomization = (index, urls, setUrls) => {
  const updatedUrls = [...urls];
  updatedUrls[index].showOptions = !updatedUrls[index].showOptions;
  setUrls(updatedUrls);
};

export const handleCustomizationChange = (
  index,
  field,
  value,
  urls,
  setUrls
) => {
  const updatedUrls = [...urls];

  if (field === "primaryColor" && value === updatedUrls[index].secondaryColor) {
    toast.error("Primary color can't be the same as Secondary", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }

  if (field === "secondaryColor" && value === updatedUrls[index].primaryColor) {
    toast.error("Secondary color can't be the same as Primary", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }

  updatedUrls[index][field] = value;
  setUrls(updatedUrls);
};

export const handleDeleteUrl = (index, urls, setUrls) => {
  const updatedUrls = urls.filter((_, idx) => idx !== index);
  setUrls(updatedUrls);
};

export const handleColorChange = (
  color,
  type,
  primaryColor,
  secondaryColor,
  index,
  onCustomizationChange
) => {
  if (type === "primaryColor" && color.hex === secondaryColor) {
    toast.error("Primary color can't be the same as Secondary", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }

  if (type === "secondaryColor" && color.hex === primaryColor) {
    toast.error("Secondary color can't be the same as Primary", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
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

  const handleSuccess = () => {
    toast.success(`Downloaded QR Code ${index + 1}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });
  };

  downloadSVG();
  handleSuccess();
};
