import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import ImagePreview from "../utils/ImagePreview";

function Details() {
  const [dataUri, setDataUri] = useState("");

  const handleTakePhotoAnimationDone = (capturedUri) => {
    console.log("Photo captured!");
    setDataUri(capturedUri);
  };

  const handleRetake = () => {
    setDataUri("");
  };

  const isFullscreen = false;

  return (
    <div>
      {dataUri ? (
        <div className="flex flex-col items-center">
          <ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />

          <button
            onClick={handleRetake}
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Retake Photo
          </button>
        </div>
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
        />
      )}
    </div>
  );
}

export default Details;
