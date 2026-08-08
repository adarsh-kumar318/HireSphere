const fs = require('fs');
const path = require('path');

const commonDir = path.join('src', 'components', 'Common');
if (!fs.existsSync(commonDir)) {
  fs.mkdirSync(commonDir, { recursive: true });
}

const proxies = {
  'Navbar.jsx': "export { default } from '../Navbar'",
  'Sidebar.jsx': "export { default, SidebarNav } from '../Sidebar'",
  'StatCard.jsx': "export { default } from '../StatCard'",
  'FormInput.jsx': "export { default } from '../Client/common/FormInput'",
  'GigCard.jsx': "export { default } from '../GigCard'",
  'FreelancerCard.jsx': "export { default } from '../FreelancerCard'"
};

for (const [file, content] of Object.entries(proxies)) {
  fs.writeFileSync(path.join(commonDir, file), content);
}

const stubs = {
  'DataTable.jsx': "export default function DataTable({ rows, columns }) { return <div className='p-3 border'>DataTable Placeholder</div>; }",
  'Toolbar.jsx': "export default function Toolbar() { return <div className='p-3 border'>Toolbar Placeholder</div>; }",
  'ChatPanel.jsx': "export default function ChatPanel() { return <div className='p-3 border'>ChatPanel Placeholder</div>; }",
  'MilestoneTracker.jsx': "export default function MilestoneTracker() { return <div className='p-3 border'>MilestoneTracker Placeholder</div>; }",
  'PageHeader.jsx': "export default function PageHeader({ title, subtitle }) { return <div className='mb-4'><h2>{title}</h2><p>{subtitle}</p></div>; }",
  'StatusBadge.jsx': "export default function StatusBadge({ status }) { return <span className='badge bg-secondary'>{status}</span>; }",
  'EmptyState.jsx': "export default function EmptyState({ title, message }) { return <div className='p-5 text-center'><h4>{title}</h4><p>{message}</p></div>; }",
  'NotificationList.jsx': "export default function NotificationList() { return <div className='p-3 border'>NotificationList Placeholder</div>; }",
};

for (const [file, content] of Object.entries(stubs)) {
  fs.writeFileSync(path.join(commonDir, file), content);
}

console.log('Done generating proxies and stubs again.');
