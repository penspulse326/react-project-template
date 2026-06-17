import type { LoginResponse } from '~/services/users';
import { Mail, ShieldCheck } from 'lucide-react';

interface UserProfileCardProps {
  profile: LoginResponse;
}

export default function UserProfileCard({ profile }: UserProfileCardProps) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="flex justify-center p-4">
      {/* Employee ID Badge container - Credit Card size proportions (approx 3.375" x 2.125" aspect ratio, scaled up) */}
      <div className="relative w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100">
        {/* Top Header Section with decorative gradient */}
        <div className="h-20 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-700 px-4 pt-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-bold tracking-widest uppercase">ACME CORP</span>
            </div>
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-white/95 uppercase">
              STAFF
            </span>
          </div>
          <div className="mt-2 text-center text-[10px] font-semibold tracking-widest text-slate-200/90 uppercase">
            Employee Access Pass
          </div>
        </div>

        {/* Profile Avatar with absolute overlay overlap */}
        <div className="relative -mt-10 flex justify-center">
          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
            <img
              src={profile.image}
              alt={fullName}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 pt-3 pb-5 text-center">
          <h2 className="text-xl leading-tight font-bold text-slate-800">
            {fullName}
          </h2>
          <p className="mt-1 text-xs font-medium tracking-wider text-indigo-600 uppercase">
            @
            {profile.username}
          </p>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="max-w-[200px] truncate" title={profile.email}>
              {profile.email}
            </span>
          </div>

          {/* Decorative Smart Chip & Barcode mockup */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            {/* Gold smart chip mock */}
            <div className="h-7 w-9 rounded-md bg-linear-to-br from-amber-300 via-yellow-400 to-amber-500 p-1 opacity-80 shadow-inner">
              <div className="grid h-full w-full grid-cols-3 gap-0.5 rounded border border-yellow-600/30">
                <div className="border-r border-b border-yellow-600/20"></div>
                <div className="border-r border-b border-yellow-600/20"></div>
                <div className="border-b border-yellow-600/20"></div>
                <div className="border-r border-yellow-600/20"></div>
                <div className="border-r border-yellow-600/20"></div>
                <div className="border-yellow-600/20"></div>
              </div>
            </div>

            {/* Micro barcode mock */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex h-5 items-end gap-0.5 opacity-60">
                <div className="h-full w-0.5 bg-slate-900"></div>
                <div className="h-full w-1 bg-slate-900"></div>
                <div className="h-full w-0.5 bg-slate-900"></div>
                <div className="h-full w-1.5 bg-slate-900"></div>
                <div className="h-full w-0.5 bg-slate-900"></div>
                <div className="h-full w-1 bg-slate-900"></div>
                <div className="h-full w-0.5 bg-slate-900"></div>
                <div className="h-full w-1.5 bg-slate-900"></div>
              </div>
              <span className="font-mono text-[7px] tracking-wider text-slate-400">
                ID:
                {' '}
                {profile.id.toString().padStart(6, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
