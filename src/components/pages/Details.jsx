import React, { useRef, useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import SignatureCanvas from "react-signature-canvas";

function Details() {
  const [photo, setPhoto] = useState("");
  const [merged, setMerged] = useState("");

  const sigRef = useRef(null);
  const imgRef = useRef(null);

  const handleTakePhotoAnimationDone = (uri) => {
    setPhoto(uri);
  };

  const handleRetake = () => {
    setPhoto("");
    setMerged("");
    sigRef.current?.clear();
  };

  const mergeImages = () => {
    const img = new Image();
    img.src = photo;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const signatureCanvas = sigRef.current.getCanvas();
      ctx.drawImage(signatureCanvas, 0, 0, img.width, img.height);

      const result = canvas.toDataURL("image/png");
      setMerged(result);
    };
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!photo ? (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={false}
        />
      ) : (
        <>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              ref={imgRef}
              src={photo}
              alt="captured"
              style={{ width: "500px", display: "block" }}
            />

            <SignatureCanvas
              ref={sigRef}
              penColor="red"
              canvasProps={{
                width: 500,
                height: 375,
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "transparent",
                },
              }}
            />
          </div>

          <div className="flex gap-4">
            <button onClick={() => sigRef.current.clear()}>
              Clear Signature
            </button>

            <button onClick={mergeImages}>Merge Photo + Signature</button>

            <button onClick={handleRetake}>Retake Photo</button>
          </div>
        </>
      )}

      {merged && (
        <div>
          <h3>Final Audit Image</h3>
          <img src={merged} alt="merged result" />
        </div>
      )}
    </div>
  );
}

export default Details;
