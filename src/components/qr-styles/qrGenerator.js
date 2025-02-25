// import QRCodeStyling from "qr-code-styling"; // npm install qr-code-styling

// /**
//  * Generates a QR code with an excavated logo area and adds scan text on top.
//  * @param {Object} options - Configuration options.
//  * @param {string} options.value - The data to encode.
//  * @param {string} options.fgColor - Foreground (dot) color.
//  * @param {string} options.bgColor - Background color.
//  * @param {string} options.logo - URL or dataURL for the logo image (empty string for none).
//  * @param {"square"|"circle"} options.logoPaddingStyle - Padding style for the logo area.
//  * @param {string} options.scanText - Text to display above the QR code.
//  * @param {number} [options.width=300] - QR code width.
//  * @param {number} [options.height=300] - QR code height.
//  * @param {number} [options.margin=10] - Margin around the QR code.
//  * @returns {Promise<string>} A promise that resolves with a dataURL of the final merged image.
//  */
// export const generateQRCodeWithText = async (options) => {
//   const {
//     value,
//     fgColor,
//     bgColor,
//     logo,
//     logoPaddingStyle,
//     scanText,
//     width = 300,
//     height = 300,
//     margin = 10,
//   } = options;

//   const qrOptions = {
//     width,
//     height,
//     data: value,
//     margin,
//     dotsOptions: {
//       color: fgColor,
//       type: "dots",
//     },
//     backgroundOptions: {
//       color: bgColor,
//     },
//     imageOptions: {
//       crossOrigin: "anonymous",
//       hideBackgroundDots: true,
//       margin: logoPaddingStyle === "circle" ? 20 : 10,
//       image: logo,
//       imageSize: logo ? 0.2 : 0,
//     },
//     renderAs: "canvas", // Force canvas rendering for data extraction
//   };

//   // 1. Create QR code with qr-code-styling
//   const qrCode = new QRCodeStyling(qrOptions);

//   // 2. getRawData("png") returns a Blob
//   const blob = await qrCode.getRawData("png");

//   // 3. Convert the Blob to an object URL we can load into an <img>
//   const objectURL = URL.createObjectURL(blob);

//   return new Promise((resolve) => {
//     const qrImage = new Image();
//     qrImage.src = objectURL;

//     qrImage.onload = () => {
//       // Use naturalWidth/naturalHeight to ensure correct dimensions
//       const imgWidth = qrImage.naturalWidth || width;
//       const imgHeight = qrImage.naturalHeight || height;

//       // 4. Draw the final canvas with scan text on top
//       const canvas = document.createElement("canvas");
//       canvas.width = imgWidth;
//       canvas.height = imgHeight + 80; // extra space for scan text
//       const ctx = canvas.getContext("2d");
//       if (!ctx) {
//         URL.revokeObjectURL(objectURL);
//         return resolve("");
//       }

//       // Fill background
//       ctx.fillStyle = "#FFFFFF";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Draw scan text
//       ctx.fillStyle = "#005794";
//       ctx.font = "bold 40px arial";
//       const text = scanText || "Bitbob.app";
//       const textWidth = ctx.measureText(text).width;
//       ctx.fillText(text, (canvas.width - textWidth) / 2, 60);

//       // Draw QR code below text
//       ctx.drawImage(qrImage, 0, 80);

//       // 5. Convert final canvas to a base64 data URL
//       const finalDataUrl = canvas.toDataURL("image/png");

//       // Clean up object URL
//       URL.revokeObjectURL(objectURL);

//       // 6. Resolve with final base64 data URL
//       resolve(finalDataUrl);
//     };

//     // In case image fails to load
//     qrImage.onerror = () => {
//       URL.revokeObjectURL(objectURL);
//       resolve("");
//     };
//   });
// };
