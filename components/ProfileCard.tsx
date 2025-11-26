import { FiMail, FiPhone, FiUser } from 'react-icons/fi';

interface Props {
  name: string;
  email: string;
  phone: string;
}

export default function ProfileCard({ name, email, phone }: Props) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
          <FiUser size={26} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-500">Profile</p>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
            <span className="flex items-center gap-2"><FiMail /> {email}</span>
            <span className="flex items-center gap-2"><FiPhone /> {phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
