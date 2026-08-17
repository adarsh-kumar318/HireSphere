import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { analyticsData } from '../../data/mockData'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

function Analytics() {
  const revenueChart = {
    labels: analyticsData.monthlyLabels,
    datasets: [{
      label: 'Revenue (₹)',
      data: analyticsData.monthlyRevenue,
      borderColor: '#4F46E5', // Indigo-600
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.3,
      fill: true,
    }],
  }

  const userChart = {
    labels: analyticsData.monthlyLabels,
    datasets: [{
      label: 'Total Users',
      data: analyticsData.userGrowth,
      backgroundColor: '#06B6D4', // Cyan-500
    }],
  }

  const categoryChart = {
    labels: analyticsData.gigsByCategory.labels,
    datasets: [{
      data: analyticsData.gigsByCategory.values,
      backgroundColor: ['#4F46E5', '#06B6D4', '#22C55E', '#F59E0B', '#64748B'],
      borderWidth: 1,
      borderColor: '#1E293B',
    }],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Analytics</h1>
        <p className="text-slate-400 text-sm">Platform performance and growth metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue */}
        <div className="lg:col-span-2 bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-[#334155] font-semibold text-white">
            Monthly Revenue
          </div>
          <div className="p-5 flex-1 flex items-center justify-center">
            <Line data={revenueChart} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Gigs by Category */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-[#334155] font-semibold text-white">
            Gigs by Category
          </div>
          <div className="p-5 flex-1 flex items-center justify-center">
            <div className="w-full max-w-[220px]">
              <Doughnut data={categoryChart} options={{ plugins: { legend: { labels: { color: '#F8FAFC' } } } }} />
            </div>
          </div>
        </div>

        {/* User Growth */}
        <div className="lg:col-span-3 bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-[#334155] font-semibold text-white">
            User Growth
          </div>
          <div className="p-5 flex-1 flex items-center justify-center">
            <Bar data={userChart} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
