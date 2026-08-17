import { FiMapPin, FiCheckCircle } from 'react-icons/fi'
import RatingStars from './RatingStars'

function FreelancerCard({ freelancer }) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 text-center flex flex-col h-full shadow-sm hover:border-indigo-500/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
      <div className="flex justify-center mb-3">
        <img
          src={freelancer.avatar}
          alt={freelancer.name}
          className="rounded-full object-cover w-20 h-20 border-2 border-indigo-500/25"
        />
      </div>
      <h3 className="text-white font-semibold text-base mb-1 flex items-center justify-center gap-1">
        {freelancer.name}
        {freelancer.verified && <FiCheckCircle className="text-cyan-400" title="Verified" />}
      </h3>
      <p className="text-slate-400 text-sm mb-2">{freelancer.title}</p>
      <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-2">
        <FiMapPin size={14} className="text-cyan-400" /> {freelancer.location}
      </div>
      <div className="flex justify-center mb-3">
        <RatingStars rating={freelancer.rating} reviewCount={freelancer.reviewCount} />
      </div>
      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
        {freelancer.skills?.slice(0, 3).map((skill) => (
          <span key={skill} className="bg-slate-800 text-slate-300 border border-slate-700 rounded-full px-2.5 py-1 text-xs">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <div className="font-semibold text-indigo-400 text-lg">{freelancer.hourlyRate}</div>
        <div className="text-xs text-slate-500">{freelancer.completedJobs} jobs completed</div>
      </div>
    </div>
  )
}

export default FreelancerCard
