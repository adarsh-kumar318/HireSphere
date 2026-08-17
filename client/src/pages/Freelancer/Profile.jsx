import { useState } from 'react'
import RatingStars from '../../components/RatingStars'
import { freelancers } from '../../data/mockData'
import { uploadAvatar, uploadResume } from '../../services/uploadService'

const profile = freelancers[0]

function Profile() {
  const [avatar, setAvatar] = useState(profile.avatar)
  const [resume, setResume] = useState('')
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [message, setMessage] = useState('')

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setUploadingAvatar(true)
      setMessage('')

      const data = await uploadAvatar(file)

      setAvatar(data.avatar)
      setMessage('Avatar uploaded successfully!')
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Avatar upload failed'
      )
    } finally {
      setUploadingAvatar(false)
      e.target.value = ''
    }
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setUploadingResume(true)
      setMessage('')

      const data = await uploadResume(file)

      setResume(data.resume)
      setMessage('Resume uploaded successfully!')
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Resume upload failed'
      )
    } finally {
      setUploadingResume(false)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          My Profile
        </h1>

        <p className="text-slate-400">
          Manage your public freelancer profile
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Profile Card */}
        <div className="h-fit rounded-2xl border border-[#334155] bg-[#1E293B] p-6 text-center shadow-sm">

          {/* Avatar */}
          <div className="mb-4 flex justify-center">
            <img
              src={avatar}
              alt={profile.name}
              className="h-24 w-24 rounded-full border-2 border-indigo-500/25 object-cover"
            />
          </div>

          {/* Avatar Upload */}
          <div className="mb-5">
            <label
              htmlFor="avatar-upload"
              className="inline-block cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {uploadingAvatar
                ? 'Uploading...'
                : 'Change Avatar'}
            </label>

            <input
              id="avatar-upload"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              disabled={uploadingAvatar}
              onChange={handleAvatarUpload}
            />
          </div>

          {/* Name */}
          <h2 className="text-lg font-bold text-white">
            {profile.name}
          </h2>

          {/* Title */}
          <p className="mb-3 text-sm text-slate-400">
            {profile.title}
          </p>

          {/* Rating */}
          <div className="mb-4 flex justify-center">
            <RatingStars
              rating={profile.rating}
              reviewCount={profile.reviewCount}
            />
          </div>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {profile.skills.map((s) => (
              <span
                key={s}
                className="bg-slate-850 rounded-full border border-[#334155] px-2.5 py-1 text-xs text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Profile Form */}
        <div className="rounded-2xl border border-[#334155] bg-[#1E293B] p-6 shadow-sm lg:col-span-2">

          <form className="space-y-5">

            {/* Message */}
            {message && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                {message}
              </div>
            )}

            {/* Name + Title */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue={profile.name}
                  className="w-full rounded-xl border border-[#334155] bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Professional Title
                </label>

                <input
                  type="text"
                  defaultValue={profile.title}
                  className="w-full rounded-xl border border-[#334155] bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

            </div>

            {/* Bio */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Bio
              </label>

              <textarea
                rows={4}
                defaultValue="Full-stack developer specializing in React and Node.js with 5+ years of experience building products for startups across India."
                className="w-full resize-none rounded-xl border border-[#334155] bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Location + Rate + Skills */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Location
                </label>

                <input
                  type="text"
                  defaultValue={profile.location}
                  className="w-full rounded-xl border border-[#334155] bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Hourly Rate (₹)
                </label>

                <input
                  type="text"
                  defaultValue="1200"
                  className="w-full rounded-xl border border-[#334155] bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Skills (comma separated)
                </label>

                <input
                  type="text"
                  defaultValue={profile.skills.join(', ')}
                  className="w-full rounded-xl border border-[#334155] bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

            </div>

            {/* Resume Upload */}
            <div className="border-t border-[#334155] pt-5">

              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                disabled={uploadingResume}
                onChange={handleResumeUpload}
                className="block w-full text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-indigo-700"
              />

              {/* Uploading */}
              {uploadingResume && (
                <p className="mt-2 text-sm text-indigo-400">
                  Uploading resume...
                </p>
              )}

              {/* Uploaded Resume */}
              {resume && (
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-indigo-400 hover:text-indigo-300"
                >
                  View Uploaded Resume
                </a>
              )}

            </div>

            {/* Save Profile */}
            <div className="pt-3">
              <button
                type="button"
                className="btn-primary"
              >
                Save Profile
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile