// import QRCodeStyling from "qr-code-styling";

// /**
//  * Generates a QR code with styling, a central logo, and optional text above the QR code.
//  * 
//  * @param {Object} options - Configuration options.
//  * @param {string} options.value - The data to encode in the QR code.
//  * @param {Object} [options.fgGradient] - Foreground (dots) gradient config.
//  * @param {Object} [options.bgGradient] - Background gradient config.
//  * @param {string} [options.logo] - Logo image URL or data URL.
//  * @param {"square"|"circle"} [options.shape="circle"] - Logo padding style.
//  * @param {string} [options.scanText="Bitbob.app"] - Text to display above the QR code.
//  * @param {number} [options.width=300] - Width of the QR code.
//  * @param {number} [options.height=300] - Height of the QR code.
//  * @param {number} [options.margin=10] - Outer margin for the QR code.
//  * @param {string} [options.dotsType="extra-rounded"] - Style of QR code dots.
//  * @param {string} [options.cornersSquareType="extra-rounded"] - Style of corner squares.
//  * @param {string} [options.cornersDotType="extra-rounded"] - Style of corner dots.
//  * @param {string} [options.cornersSquareColor="#005794"] - Corner squares color.
//  * @param {string} [options.cornersDotColor="#005794"] - Corner dots color.
//  * @returns {Promise<string>} A promise that resolves to a base64-encoded PNG data URL.
//  */
// export const generateQRCodeWithText = async (options) => {
//   const {
//     value,
//     fgGradient = {
//       type: "linear",
//       rotation: 0,
//       colorStops: [
//         { offset: 0, color: "#FFFFFF" },
//         { offset: 1, color: "#005794" }
//       ]
//     },
//     bgGradient = {
//       type: "linear",
//       rotation: 0,
//       colorStops: [
//         { offset: 0, color: "#FFFFFF" },
//         { offset: 1, color: "#005794" }
//       ]
//     },
//     logo = "",
//     shape = "circle",
//     scanText = "Bitbob.app",
//     width = 300,
//     height = 300,
//     margin = 10,
//     dotsType = "extra-rounded",
//     cornersSquareType = "extra-rounded",
//     cornersDotType = "extra-rounded",
//     cornersSquareColor = "#005794",
//     cornersDotColor = "#005794",
//   } = options;

//   // Preload the logo if provided
//   const logoImage = new Image();
//   if (logo && !logo.startsWith("data:")) {
//     logoImage.crossOrigin = "anonymous";
//   }
//   logoImage.src = logo;

//   await new Promise((resolve, reject) => {
//     logoImage.onload = resolve;
//     logoImage.onerror = reject;
//   });

//   const imageOptions = {
//     image: logo,
//     margin: shape === "circle" ? 40 : 10,
//     hideBackgroundDots: false,
//     crossOrigin: logo && !logo.startsWith("data:") ? "anonymous" : undefined,
//   };

//   const qrCode = new QRCodeStyling({
//     width,
//     height,
//     data: value,
//     margin,
//     type: "canvas",
//     dotsOptions: {
//       gradient: fgGradient,
//       type: dotsType,
//     },
//     cornersSquareOptions: {
//       color: cornersSquareColor,
//       type: cornersSquareType,
//     },
//     cornersDotOptions: {
//       color: cornersDotColor,
//       type: cornersDotType,
//     },
//     backgroundOptions: {
//       gradient: bgGradient,
//     },
//     imageOptions,
//     renderAs: "canvas",
//   });

//   // Get QR code as blob
//   const blob = await qrCode.getRawData("png");
//   const objectURL = URL.createObjectURL(blob);

//   return new Promise((resolve) => {
//     const qrImage = new Image();
//     qrImage.src = objectURL;

//     qrImage.onload = () => {
//       const imgWidth = qrImage.naturalWidth || width;
//       const imgHeight = qrImage.naturalHeight || height;

//       // Extra vertical space for text
//       const extraHeightForText = 70; // Adjust as needed
//       const canvas = document.createElement("canvas");
//       canvas.width = imgWidth;
//       canvas.height = imgHeight + extraHeightForText;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) {
//         URL.revokeObjectURL(objectURL);
//         return resolve("");
//       }

//       // Draw white background with optional rounded corners
//       const cornerRadius = 20;
//       ctx.fillStyle = "#FFFFFF";
//       ctx.beginPath();
//       ctx.moveTo(cornerRadius, 0);
//       ctx.lineTo(canvas.width - cornerRadius, 0);
//       ctx.quadraticCurveTo(canvas.width, 0, canvas.width, cornerRadius);
//       ctx.lineTo(canvas.width, canvas.height - cornerRadius);
//       ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - cornerRadius, canvas.height);
//       ctx.lineTo(cornerRadius, canvas.height);
//       ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - cornerRadius);
//       ctx.lineTo(0, cornerRadius);
//       ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
//       ctx.closePath();
//       ctx.fill();

//       // Draw the text above the QR code
//       ctx.textAlign = "center";
//       ctx.textBaseline = "top";
//       ctx.fillStyle = "#005794";
//       ctx.font = "bold 30px Arial";
//       ctx.fillText(scanText, canvas.width / 2, 15);

//       // Draw the QR code below the text
//       // Offset Y by some margin plus text area
//       const qrY = 15 + 35; // 15 for top margin + 35 for text area
//       ctx.drawImage(qrImage, 0, qrY);

//       // Convert final canvas to base64 data URL
//       const finalDataUrl = canvas.toDataURL("image/png");
//       URL.revokeObjectURL(objectURL);
//       resolve(finalDataUrl);
//     };

//     qrImage.onerror = () => {
//       URL.revokeObjectURL(objectURL);
//       resolve("");
//     };
//   });
// };
