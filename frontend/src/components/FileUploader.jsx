import { handleFileUpload } from "../services/FileUploader";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

function FileUploader({ onUploadSucess }) {
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const inputRef = useRef();

  function handleClick() {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center mb-4">
        <button
          className="cursor-pointer px-6 py-2 bg-violet-600 text-white font-semibold
          rounded hover:bg-violet-400 transition mr-2"
          onClick={handleClick}
        >
          {loading ? "Uploading..." : "Upload Movie File"}
        </button>

        <div className="relative group">
          <InformationCircleIcon className="h-6 w-6 text-white cursor-pointer" />
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-white
          text-gray-800 text-sm px-4 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100
          transition-opacity duration-200 z-10"
          >
            For now, we only accept CSV files that must have the columns <br />
            <strong>title, year, genre, description</strong>
          </div>
        </div>

        {loading && (
          <div className="animate-spin ml-3 rounded-full h-6 w-6 border-4 border-t-transparent border-white"></div>
        )}

        <input
          type="file"
          accept=".csv"
          ref={inputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, setLoading, setUploadError, onUploadSucess)}
        />
      </div>

      {uploadError && (
        <div className="text-sm text-red-500">{uploadError}</div>
      )}
    </div>
  );
}

export default FileUploader;
