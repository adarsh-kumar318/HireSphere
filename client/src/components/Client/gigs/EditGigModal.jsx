import { X } from "lucide-react";
import GigForm from "./GigForm";

const EditGigModal = ({
  isOpen,
  form,
  errors,
  saving,
  categories,
  gigTypes,
  onChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Edit Gig
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Update your project details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X
              size={22}
              className="text-slate-600 dark:text-slate-300"
            />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <GigForm
            form={form}
            errors={errors}
            saving={saving}
            categories={categories}
            gigTypes={gigTypes}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditGigModal;