import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Firebase from "@/lib/firebase";
import { Spinner } from "../Spinner";

const firebase = new Firebase();

export default function COCUpload({
  inspection_id,
  handleSubmittedCOC,
}: {
  inspection_id: string;
  handleSubmittedCOC: any;
}) {
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      multiple: false,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        ".pdf": [],
      },
    });

  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const removeFile = () => {
    setFile(null);
  };

  useEffect(() => {
    if (
      acceptedFiles[0]?.name?.endsWith(".png") ||
      acceptedFiles[0]?.name?.endsWith(".jpg") ||
      acceptedFiles[0]?.name?.endsWith(".pdf")
    ) {
      setFile(acceptedFiles[0]);
    } else {
      if (acceptedFiles.length > 0) alert("Invalid file");
    }
  }, [acceptedFiles]);

  const onSubmit = async () => {
    if (file == null) {
      alert("Please upload a file");
      return;
    }

    setIsLoading(true);

    await firebase.uploadCOC(file, inspection_id);

    await handleSubmittedCOC();

    setIsLoading(false);
  };

  return (
    <div className="h-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-5">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Upload Certificate of Compliance
      </h1>

      <div className="mb-4">
        <div
          {...getRootProps({
            className: "dropzone",
          })}
          className="w-full h-full flex flex-col justify-center items-center my-4 gap-2 px-14 py-16 border-2 border-dashed border-black/25 rounded-[10px] cursor-pointer"
        >
          <div className="py-4 border-t-black/20">
            <div className="flex flex-col items-center justify-center dropzone">
              <input {...getInputProps()} />
              <p className=" font-monts disable-text-selection text-sm w-full h-full text-black text-center">
                {isDragActive ? (
                  "Drop the file here ..."
                ) : file == undefined || file.length == 0 ? (
                  <>Click or drag and drop to upload certificate</>
                ) : (
                  `Files uploaded: ${file?.name}`
                )}
              </p>
            </div>
          </div>
        </div>
        {file && (
          <>
            {" "}
            {file.name}{" "}
            <button className="text-blue-900" onClick={() => removeFile()}>
              Remove
            </button>
          </>
        )}
      </div>

      <div className="flex flex-row flex-wrap justify-end">
        <button
          onClick={() => onSubmit()}
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          {isLoading ? (
            <>
              <Spinner /> Uploading...
            </>
          ) : (
            <>Upload</>
          )}
        </button>
      </div>
    </div>
  );
}
