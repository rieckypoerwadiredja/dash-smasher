import QRCode from "qrcode-generator";

export const generateQR = (text: string): string => {
  const qr = QRCode(0, "M");
  qr.addData(text);
  qr.make();
  return qr.createDataURL(8, 2);
};
