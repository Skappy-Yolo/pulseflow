import type { CustomerUser } from '../../../types/admin';

interface CustomerRowProps {
  user: CustomerUser;
}

const CustomerRow: React.FC<CustomerRowProps> = ({ user }) => {
  return (
    <tr>
      <td className="px-4 py-2 border-b">{user.firstName} {user.lastName}</td>
      <td className="px-4 py-2 border-b">{user.email}</td>
      <td className="px-4 py-2 border-b">{user.company || '-'}</td>
      <td className="px-4 py-2 border-b">{user.status}</td>
      <td className="px-4 py-2 border-b">{user.registeredAt}</td>
      <td className="px-4 py-2 border-b">{user.assigned_to || '-'}</td>
      <td className="px-4 py-2 border-b">{user.demo_date || '-'}</td>
      <td className="px-4 py-2 border-b">
        <div className="flex gap-2">
          <button className="text-blue-600 hover:underline" title="View">View</button>
          <button className="text-green-600 hover:underline" title="Edit">Edit</button>
          <button className="text-success-600 hover:underline" title="Approve">Approve</button>
          <button className="text-danger-600 hover:underline" title="Reject">Reject</button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerRow;