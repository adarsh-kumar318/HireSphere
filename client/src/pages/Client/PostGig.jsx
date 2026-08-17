import { useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { categories, locations } from '../../data/mockData'

const emptyMilestone = { title: '', amount: '', dueDate: '' }

function PostGig() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    type: 'Fixed Price',
    milestones: [{ ...emptyMilestone }],
  })

  const addMilestone = () => {
    setForm({ ...form, milestones: [...form.milestones, { ...emptyMilestone }] })
  }

  const removeMilestone = (index) => {
    setForm({ ...form, milestones: form.milestones.filter((_, i) => i !== index) })
  }

  const updateMilestone = (index, field, value) => {
    const milestones = form.milestones.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    setForm({ ...form, milestones })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Post a Gig</h1>
        <p className="text-slate-400 text-sm">Describe your project and set milestone payments</p>
      </div>

      {submitted && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 flex justify-between items-center text-sm">
          <span>Gig posted successfully! (Demo — saved to local state only.)</span>
          <button onClick={() => setSubmitted(false)} className="text-emerald-400 hover:text-white font-bold">
            &times;
          </button>
        </div>
      )}

      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className="block text-slate-300 text-sm font-semibold mb-2">Gig Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Build a React dashboard"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Category</label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Description</label>
            <textarea
              rows={4}
              required
              placeholder="Describe scope, deliverables, and expectations..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full placeholder-slate-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Location</label>
              <select
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full"
              >
                <option value="">Select city</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Budget (₹)</label>
              <input
                type="number"
                required
                min="1000"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Payment Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="bg-slate-800 border border-[#334155] rounded-xl text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full"
              >
                <option>Fixed Price</option>
                <option>Milestone Based</option>
                <option>Hourly</option>
              </select>
            </div>
          </div>

          <hr className="border-[#334155] my-6" />

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Milestones</h3>
            <button
              type="button"
              onClick={addMilestone}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 transition-all"
            >
              <FiPlus /> Add Milestone
            </button>
          </div>

          <div className="space-y-3">
            {form.milestones.map((m, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-slate-850 p-4 border border-[#334155]/60 rounded-xl">
                <div className="md:col-span-5">
                  <label className="block text-slate-400 text-xs font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Milestone title"
                    value={m.title}
                    onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                    className="bg-slate-850 border border-[#334155] rounded-lg text-white px-3 py-2 text-sm focus:border-indigo-500 outline-none w-full placeholder-slate-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-slate-400 text-xs font-semibold mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="15000"
                    value={m.amount}
                    onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                    className="bg-slate-850 border border-[#334155] rounded-lg text-white px-3 py-2 text-sm focus:border-indigo-500 outline-none w-full placeholder-slate-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-slate-400 text-xs font-semibold mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={m.dueDate}
                    onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                    className="bg-slate-850 border border-[#334155] rounded-lg text-white px-3 py-2 text-sm focus:border-indigo-500 outline-none w-full"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  {form.milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMilestone(index)}
                      className="p-2 rounded-lg text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                      title="Remove Milestone"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button type="submit" className="btn-primary">
              Publish Gig
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostGig
