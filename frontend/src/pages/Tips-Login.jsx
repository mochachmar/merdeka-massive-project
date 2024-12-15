import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowBackOutline, DownloadOutline } from "react-ionicons";
import "../index.css";
import Navbar from "../components/Navbar-Login";
import Footer from "../components/FooterLogin";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useLanguage } from "../contexts/LanguageContext"; // Assuming you have a language context or hook

const Tips = () => {
  const { id } = useParams(); // Get ID from URL
  const [guides, setGuides] = useState(null); // State for guide data
  const [error, setError] = useState(null); // State for error handling
  const { t } = useLanguage(); // Access translation function

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchGuides = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/guides/${id}`
        ); // API URL
        console.log(response.data); // Inspect the data received
        setGuides(response.data); // Store guide data in state
        setError(null); // Reset error if successful
      } catch (err) {
        console.error("Error fetching guide data:", err);
        setError(t("guideNotFoundError")); // Use translation for error message
      }
    };

    if (id) {
      fetchGuides();
    }
  }, [id, t]); // Include `t` in the dependency array

  const downloadPDF = () => {
    const content = document.getElementById("content"); // Get content for PDF download

    // Store original border status
    const originalBorder = content.style.border;

    // Remove border temporarily for PDF
    content.style.border = "none";

    // Capture content (images, styles) using html2canvas
    html2canvas(content, {
      scale: 2, // Enhance image quality
      useCORS: true, // Use CORS for loading images from other domains
      allowTaint: false, // Prevent using images without access
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Get content dimensions to adjust PDF layout
        const contentWidth = content.offsetWidth;
        const contentHeight = content.offsetHeight;

        const margin = 10; // Set margin (10mm)
        const pdfWidth = 210 - 2 * margin; // A4 width minus margins
        const pdfHeight =
          (contentHeight * pdfWidth) / contentWidth + 2 * margin;

        // Add image to PDF with appropriate size and margin
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          pdfWidth,
          pdfHeight - 2 * margin
        );

        // Save PDF with a dynamic name based on the guide's title
        pdf.save(`${guides.title || "tips"}.pdf`);

        // Restore the border to its original state
        content.style.border = originalBorder;
      })
      .catch((error) => {
        console.error("Error capturing content:", error);

        // Restore the border if there's an error
        content.style.border = originalBorder;
      });
  };

  if (error) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <p className="text-red-500 text-lg">{error}</p>
          <Link to="/panduan-login" className="mt-4 text-blue-500 underline">
            {t("backToGuides")}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!guides) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-center px-4">
          <p className="text-gray-500 text-lg">{t("loadingGuide")}</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Clean the tips data
  const cleanedTips = guides.tips_and_tricks
    ? guides.tips_and_tricks
        .split("\n")
        .filter((tip) => !tip.includes("Merawat tanaman selada"))
        .map((tip, index) => <li key={index}>{tip}</li>)
    : t("tipsNotAvailable");

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full px-4 pb-8">
        <div className="flex justify-between items-center w-full max-w-4xl mt-4 mb-6">
          <Link
            to="/panduan-login"
            className="flex items-center text-black font-semibold text-sm"
          >
            <ArrowBackOutline
              className="mr-2"
              color="black"
              height="20px"
              width="20px"
            />
            {t("back")}
          </Link>
          <button
            className="px-4 py-2 font-semibold text-white rounded transition duration-300 flex items-center"
            style={{
              backgroundColor: "#6D7E5E",
              borderRadius: "10px",
              border: "2px #91A079 solid",
              color: "white",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#91A079")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#6D7E5E")
            }
            onClick={downloadPDF}
          >
            <DownloadOutline
              className="mr-2"
              color="white"
              height="20px"
              width="20px"
            />
            {t("download")}
          </button>
        </div>
        {/* Guide Content Card */}
        <div
          className="bg-white shadow-md border border-gray-400 rounded-lg p-6 w-full max-w-4xl"
          id="content"
        >
          <div className="flex flex-col items-center">
            <img
              src={`http://localhost:3000/images/${guides.thumbnail_image}`}
              alt={guides.title || t("thumbnailAlt")}
              className="mb-4 rounded w-full max-h-80 h-auto object-cover"
            />
            <h2 className="text-2xl font-bold mb-4 text-center mt-2 w-full">
              {guides.title || t("noTitle")}
            </h2>
            <p className="text-justify mb-4 mt-2 w-full">
              {guides.long_description || t("noDescription")}
            </p>
            <h2 className="text-2xl font-bold mb-4 text-left mt-6 w-full">
              {t("tipsAndTricks")}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-justify w-full">
              {cleanedTips}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tips;
