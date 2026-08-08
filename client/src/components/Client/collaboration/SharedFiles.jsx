import {
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";


const fileIcons = {
  pdf: "PDF",
  doc: "DOC",
  docx: "DOCX",
  png: "IMG",
  jpg: "IMG",
  zip: "ZIP",
};



const SharedFiles = ({
  files = [],
  onDownload,
  onView,
}) => {


  if (!files.length) {

    return (
      <div
        className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"
      >

        <FileText
          size={32}
          className="mx-auto text-slate-400"
        />


        <p
          className="mt-3 text-sm text-slate-500 dark:text-slate-400"
        >
          No shared files available.
        </p>

      </div>
    );

  }




  return (

    <div
      className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >

      <h3
        className="text-lg font-semibold text-slate-900 dark:text-white"
      >
        Shared Files
      </h3>





      <div
        className="mt-5 space-y-4"
      >

        {files.map((file)=>(

          <div
            key={file._id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
          >


            <div
              className="flex items-center gap-4"
            >

              <div
                className="dark:bg-blue-500/15 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-600 dark:text-blue-400"
              >

                {
                  fileIcons[
                    file.type?.toLowerCase()
                  ] || "FILE"
                }

              </div>



              <div>

                <h4
                  className="font-medium text-slate-900 dark:text-white"
                >
                  {file.name}
                </h4>


                <p
                  className="text-sm text-slate-500 dark:text-slate-400"
                >
                  Uploaded by {file.uploadedBy?.name || "-"}
                </p>


              </div>


            </div>





            <div
              className="flex gap-3"
            >

              <button
                type="button"
                onClick={() => onView?.(file)}
                className="rounded-xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >

                <ExternalLink size={18}/>

              </button>





              <button
                type="button"
                onClick={() => onDownload?.(file)}
                className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"
              >

                <Download size={18}/>

              </button>


            </div>


          </div>

        ))}


      </div>


    </div>

  );
};


export default SharedFiles;