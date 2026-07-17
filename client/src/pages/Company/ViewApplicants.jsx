import DataTable from '../../components/Common/DataTable'
import PageHeader from '../../components/Common/PageHeader'
import StatusBadge from '../../components/Common/StatusBadge'

const applicants = [
  { id: 1, name: 'Aarav Sharma', job: 'MERN Developer', cgpa: '8.7', status: 'Shortlisted' },
  { id: 2, name: 'Meera Nair', job: 'Frontend Intern', cgpa: '9.1', status: 'Interview' },
  { id: 3, name: 'Rohan Das', job: 'QA Engineer', cgpa: '8.2', status: 'Applied' },
]

function ViewApplicants() {
  return (
    <>
      <PageHeader title="View Applicants" subtitle="Review students who applied to your jobs." />
      <div className="card">
        <div className="card-body p-0">
          <DataTable
            rows={applicants}
            columns={[
              { key: 'name', label: 'Student' },
              { key: 'job', label: 'Job' },
              { key: 'cgpa', label: 'CGPA' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              { key: 'action', label: 'Action', render: () => <button className="btn btn-sm btn-outline-primary" type="button">View Profile</button> },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default ViewApplicants
