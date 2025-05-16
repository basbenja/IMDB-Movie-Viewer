import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL

export async function handleFileUpload(event, setLoading, setUploadError, onUploadSucess) {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${backendURL}/movies/upload`, formData);

      if (response.status === 200) {
        const data = response.data;
        onUploadSucess(data.movies ? true : false, file);
      }
    } catch (error) {
      const status = error?.response?.status;
      const errorMessages = {
        415: "Unsupported file type. Please upload a CSV file.",
        422: "Invalid file format. Please check the file structure.",
      };
      setUploadError(errorMessages[status] || "Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };