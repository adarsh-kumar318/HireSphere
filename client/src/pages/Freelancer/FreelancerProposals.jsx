import { useEffect, useMemo, useState } from 'react'
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react'

import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'
import api from '../../services/api'

function FreelancerProposals() {
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All Status')
  const [sort, setSort] = useState('Newest First')

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await api.get('/applications/my')

        const data = response.data

        const applications =
          data?.applications ||
          data?.data ||
          []

        setProposals(
          Array.isArray(applications)
            ? applications
            : []
        )
      } catch (err) {
        console.error('Failed to load proposals:', err)

        setError(
          err.response?.data?.message ||
            'Failed to load proposals'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  // Search + Filter + Sort
  const filteredProposals = useMemo(() => {
    let result = [...proposals]

    // Search
    if (search.trim()) {
      const query = search.toLowerCase()

      result = result.filter((proposal) => {
        const jobTitle =
          proposal.job?.title ||
          proposal.jobTitle ||
          proposal.title ||
          ''

        return jobTitle
          .toLowerCase()
          .includes(query)
      })
    }

    // Status
    if (status !== 'All Status') {
      result = result.filter(
        (proposal) =>
          String(proposal.status || '').toLowerCase() ===
          status.toLowerCase()
      )
    }

    // Sort
    result.sort((a, b) => {
      if (
        sort === 'Highest Bid' ||
        sort === 'Lowest Bid'
      ) {
        const amountA = Number(
          a.bidAmount ||
            a.amount ||
            a.proposedAmount ||
            0
        )

        const amountB = Number(
          b.bidAmount ||
            b.amount ||
            b.proposedAmount ||
            0
        )

        return sort === 'Highest Bid'
          ? amountB - amountA
          : amountA - amountB
      }

      const dateA = new Date(
        a.createdAt || 0
      ).getTime()

      const dateB = new Date(
        b.createdAt || 0
      ).getTime()

      return sort === 'Newest First'
        ? dateB - dateA
        : dateA - dateB
    })

    return result
  }, [proposals, search, status, sort])

  const formatAmount = (amount) => {
    if (
      amount === undefined ||
      amount === null ||
      amount === ''
    ) {
      return '—'
    }

    const number = Number(amount)

    if (Number.isNaN(number)) {
      return amount
    }

    return `Rs ${number.toLocaleString('en-IN')}`
  }

  const getJobTitle = (proposal) => {
    return (
      proposal.job?.title ||
      proposal.jobTitle ||
      proposal.title ||
      '—'
    )
  }

  const getTimeline = (proposal) => {
    return (
      proposal.timeline ||
      proposal.estimatedCompletion ||
      proposal.duration ||
      '—'
    )
  }

  return (
    <>
      <PageHeader
        title="My Proposals"
        subtitle="Track bid amount, estimated completion, negotiation, and decisions."
      />

      <div className="card overflow-hidden">

        {/* ================= FILTER BAR ================= */}
        <div className="flex flex-col gap-3 border-b border-[#334155] p-4 md:flex-row md:items-center">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search proposals..."
              className="h-10 w-full rounded-lg border border-[#334155] bg-[#0F172A] pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}
          <div className="relative w-full md:w-40">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="h-10 w-full appearance-none rounded-lg border border-[#334155] bg-[#0F172A] px-3 pr-9 text-sm text-slate-300 outline-none focus:border-indigo-500"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Shortlisted</option>
              <option>Accepted</option>
              <option>Rejected</option>
              <option>Negotiation</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          {/* Sort */}
          <div className="relative w-full md:w-44">
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="h-10 w-full appearance-none rounded-lg border border-[#334155] bg-[#0F172A] px-3 pr-9 text-sm text-slate-300 outline-none focus:border-indigo-500"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Highest Bid</option>
              <option>Lowest Bid</option>
            </select>

            <SlidersHorizontal
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-sm text-slate-400">
              Loading proposals...
            </p>
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading &&
          !error &&
          filteredProposals.length === 0 && (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-300">
                  No proposals found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your submitted proposals will appear here.
                </p>
              </div>
            </div>
          )}

        {/* ================= TABLE ================= */}
        {!loading &&
          !error &&
          filteredProposals.length > 0 && (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="border-b border-[#334155] bg-[#0F172A]">

                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400">
                      Gig
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400">
                      Bid
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400">
                      Timeline
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredProposals.map(
                    (proposal, index) => (
                      <tr
                        key={
                          proposal._id ||
                          proposal.id ||
                          index
                        }
                        className="border-b border-[#1E293B] transition hover:bg-[#111827]"
                      >

                        {/* Gig */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-white">
                            {getJobTitle(proposal)}
                          </p>
                        </td>

                        {/* Bid */}
                        <td className="px-5 py-4 text-sm text-slate-300">
                          {formatAmount(
                            proposal.bidAmount ||
                              proposal.amount ||
                              proposal.proposedAmount
                          )}
                        </td>

                        {/* Timeline */}
                        <td className="px-5 py-4 text-sm text-slate-400">
                          {getTimeline(proposal)}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge
                            status={
                              proposal.status ||
                              'Pending'
                            }
                          />
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

      </div>
    </>
  )
}

export default FreelancerProposals