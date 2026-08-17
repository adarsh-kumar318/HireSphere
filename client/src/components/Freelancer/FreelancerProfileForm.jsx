import { useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Camera,
  FileText,
} from "lucide-react";

import {
  uploadAvatar,
  uploadResume,
} from "../../services/uploadService";

const FreelancerProfileForm = ({
  form,
  onChange,
  onSubmit,
}) => {
  const [avatar, setAvatar] = useState(form.avatar || "");
  const [resumeUrl, setResumeUrl] = useState(form.resume || "");

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [avatarMessage, setAvatarMessage] = useState("");
  const [resumeMessage, setResumeMessage] = useState("");

  // =========================
  // AVATAR UPLOAD
  // =========================
  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setAvatarMessage(
        "Please select JPG, JPEG, PNG or WEBP."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarMessage("Avatar must be less than 5MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploadingAvatar(true);
      setAvatarMessage("");

      const data = await uploadAvatar(file);

      setAvatar(data.avatar);

      onChange({
        target: {
          name: "avatar",
          value: data.avatar,
        },
      });

      setAvatarMessage("Avatar uploaded successfully!");
    } catch (error) {
      console.error("Avatar upload error:", error);

      setAvatarMessage(
        error.response?.data?.message ||
          "Avatar upload failed."
      );
    } finally {
      setUploadingAvatar(false);
      event.target.value = "";
    }
  };

  // =========================
  // RESUME UPLOAD
  // =========================
  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setResumeMessage(
        "Please select PDF, DOC or DOCX."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeMessage("Resume must be less than 10MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploadingResume(true);
      setResumeMessage("");

      const data = await uploadResume(file);

      setResumeUrl(data.resume);

      onChange({
        target: {
          name: "resume",
          value: data.resume,
        },
      });

      setResumeMessage("Resume uploaded successfully!");
    } catch (error) {
      console.error("Resume upload error:", error);

      setResumeMessage(
        error.response?.data?.message ||
          "Resume upload failed."
      );
    } finally {
      setUploadingResume(false);
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* HEADER */}
      <div className="flex h-14 items-center justify-between border-b border-[#1e293b] px-4">

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 hover:bg-[#1e293b]"
        >
          <ArrowLeft size={19} />
        </button>

        <h1 className="text-sm font-semibold sm:text-base">
          Professional Profile
        </h1>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 hover:bg-[#1e293b]"
        >
          <MoreVertical size={19} />
        </button>

      </div>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-2xl px-3 py-5 sm:px-4">

        <p className="mb-5 text-xs leading-5 text-slate-300">
          Showcase skills, portfolio, certifications,
          pricing, and verification readiness.
        </p>

        {/* PROFILE CARD */}
        <div className="rounded-xl border border-[#26344d] bg-[#111c31] p-4">

          {/* AVATAR */}
          <div className="flex flex-col items-center">

            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-indigo-400">

              {avatar ? (
                <img
                  src={avatar}
                  alt={form.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#1e293b] text-2xl font-bold text-slate-400">
                  {form.name
                    ? form.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}

            </div>

            {/* AVATAR UPLOAD BUTTON */}
            <label
              htmlFor="avatar-upload"
              className={`mt-3 flex h-10 w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#26344d] bg-[#091426] text-xs font-semibold text-slate-200 hover:border-indigo-500 ${
                uploadingAvatar
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <Camera size={15} />

              {uploadingAvatar
                ? "Uploading Avatar..."
                : "Avatar Upload"}
            </label>

            <input
              id="avatar-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
              disabled={uploadingAvatar}
              onChange={handleAvatarUpload}
            />

          </div>

          {/* AVATAR MESSAGE */}
          {avatarMessage && (
            <p
              className={`mt-2 text-center text-xs ${
                avatarMessage.includes("successfully")
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {avatarMessage}
            </p>
          )}

          {/* NAME */}
          <div className="mt-4 text-center">
            <h2 className="text-base font-bold">
              {form.name || "Your Name"}
            </h2>

            <p className="text-xs text-slate-400">
              {form.headline || "Professional Headline"}
            </p>
          </div>

          {/* RESUME */}
          <div className="mt-4">

            <label
              htmlFor="resume-upload"
              className={`flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#26344d] bg-[#091426] text-xs font-semibold text-slate-200 hover:border-indigo-500 ${
                uploadingResume
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <FileText size={15} />

              {uploadingResume
                ? "Uploading..."
                : "Resume Upload"}
            </label>

            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              disabled={uploadingResume}
              onChange={handleResumeUpload}
            />

          </div>

          {/* RESUME MESSAGE */}
          {resumeMessage && (
            <p
              className={`mt-2 text-center text-xs ${
                resumeMessage.includes("successfully")
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {resumeMessage}
            </p>
          )}

          {/* VIEW RESUME */}
          {resumeUrl && (
            <div className="mt-2 text-center">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                View Uploaded Resume
              </a>
            </div>
          )}

          <div className="my-5 border-t border-[#26344d]" />

          {/* FORM */}
          <form
            onSubmit={onSubmit}
            className="space-y-4"
          >

            {/* Professional Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Professional Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name || ""}
                onChange={onChange}
                className="h-10 w-full rounded-lg border border-[#26344d] bg-[#091426] px-3 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Headline */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Headline
              </label>

              <input
                type="text"
                name="headline"
                value={form.headline || ""}
                onChange={onChange}
                className="h-10 w-full rounded-lg border border-[#26344d] bg-[#091426] px-3 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={form.location || ""}
                onChange={onChange}
                className="h-10 w-full rounded-lg border border-[#26344d] bg-[#091426] px-3 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Hourly Rate
              </label>

              <input
                type="text"
                name="hourlyRate"
                value={form.hourlyRate || ""}
                onChange={onChange}
                className="h-10 w-full rounded-lg border border-[#26344d] bg-[#091426] px-3 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Milestone Pricing */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Milestone Pricing
              </label>

              <input
                type="text"
                name="milestonePricing"
                value={form.milestonePricing || ""}
                onChange={onChange}
                className="h-10 w-full rounded-lg border border-[#26344d] bg-[#091426] px-3 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Certifications */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Certifications
              </label>

              <input
                type="text"
                name="certifications"
                value={form.certifications || ""}
                onChange={onChange}
                className="h-10 w-full rounded-lg border border-[#26344d] bg-[#091426] px-3 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Skills With Proficiency
              </label>

              <input
                type="text"
                name="skills"
                value={form.skills || ""}
                onChange={onChange}
                placeholder="React: Expert, Node.js: Advanced"
                className="h-10 w-full rounded-lg border border-[#26344d] bg-[#091426] px-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Work Experience Timeline
              </label>

              <textarea
                name="experience"
                rows="4"
                value={form.experience || ""}
                onChange={onChange}
                className="w-full resize-none rounded-lg border border-[#26344d] bg-[#091426] px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                Portfolio Gallery Links
              </label>

              <textarea
                name="portfolio"
                rows="3"
                value={form.portfolio || ""}
                onChange={onChange}
                placeholder="https://portfolio.example/project-one"
                className="w-full resize-none rounded-lg border border-[#26344d] bg-[#091426] px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* SAVE */}
            <div className="flex justify-end pt-2">

              <button
                type="submit"
                className="rounded-lg bg-blue-400 px-5 py-2.5 text-xs font-bold text-[#07111f] transition hover:bg-blue-300"
              >
                Save Changes
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfileForm;