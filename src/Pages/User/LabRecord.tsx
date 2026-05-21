import { useState } from "react";

type DocumentItem = {
  name: string;
  file: File | null;
};

const UploadForm = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { name: "Blood Test Report", file: null },
    { name: "X-ray Scan", file: null },
  ]);

  const handleNameChange = (index: number, value: string) => {
    const updated = [...documents];
    updated[index].name = value;
    setDocuments(updated);
  };

  const handleFileChange = (index: number, file: File | null) => {
    const updated = [...documents];
    updated[index].file = file;
    setDocuments(updated);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // basic validation (important)
    for (const doc of documents) {
      if (!doc.name.trim() || !doc.file) {
        alert("Please fill all document names and upload files");
        return;
      }
    }

    console.log("Ready to upload:", documents);
  };

  const addDocument = () => {
    setDocuments([...documents, { name: "", file: null }]);
  };

  const removeDocument = (index: number) => {
    if (documents.length === 1) return;

    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated);
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Upload Lab Documents
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {documents.map((document, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Document Name
              </label>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-red-500 font-bold"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              type="text"
              className="p-2 w-full border rounded"
              value={document.name}
              onChange={(e) =>
                handleNameChange(index, e.target.value)
              }
              required
            />

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              className="p-2 w-full border rounded"
              onChange={(e) =>
                handleFileChange(
                  index,
                  e.target.files ? e.target.files[0] : null
                )
              }
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addDocument}
          className="w-full bg-gray-200 p-2 rounded"
        >
          Add Document
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;