import React, { useRef, useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

function Details() {
  const [photo, setPhoto] = useState("");
  const [merged, setMerged] = useState("");
  const { id } = useParams();

  const { state } = useLocation();
  const data = state?.data;

  const navigate = useNavigate();

  const sigRef = useRef(null);
  const imgRef = useRef(null);

  const handleTakePhotoAnimationDone = (uri) => {
    setPhoto(uri);
  };

  const openDashboard = () => {
    navigate("/dashboard", { state: { data } });
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
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-end mb-6">
        <button
          onClick={openDashboard}
          className="px-4 py-2 bg-red-500 text-white rounded-md cursor-grab"
        >
          Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-semibold text-center mb-8">
        Capture Employee Photo
      </h1>

      {!photo && (
        <div className="flex justify-center">
          <Camera
            onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
            isFullscreen={false}
          />
        </div>
      )}

      {photo && (
        <div className="flex justify-center gap-16 items-start">
          <div className="flex flex-col items-center gap-6">
            <div className="relative border shadow-lg rounded-lg overflow-hidden m-3">
              <img
                ref={imgRef}
                src={photo}
                alt="captured"
                className="w-[500px]"
              />

              <SignatureCanvas
                ref={sigRef}
                penColor="black"
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

            <div className="flex gap-6">
              <button
                onClick={() => sigRef.current.clear()}
                className="px-4 py-2 bg-yellow-400 rounded"
              >
                Clear Signature
              </button>

              <button
                onClick={mergeImages}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Merge Image
              </button>

              <button
                onClick={handleRetake}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Retake
              </button>
            </div>
          </div>

          {merged && (
            <div className="bg-white shadow-lg p-3 rounded-sm">
              <img
                src={merged}
                alt="merged result"
                className="rounded border"
                width={500}
                height={375}
              />
              <h1 className="text-xl font-serif text-center py-4">
                Audited Image of {id}
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Details;
