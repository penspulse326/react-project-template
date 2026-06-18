import type { LoginResponse } from '~/types/user';
import { CheckCircle, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import ZodLoginForm from './ZodLoginForm';

export default function ZodFormSection() {
  const [userProfile, setUserProfile] = useState<LoginResponse | null>(null);

  function handleLogout() {
    setUserProfile(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <CheckCircle className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-800">1. Zod + React Hook Form 表單驗證</h2>
      </div>

      <ZodLoginForm
        key={userProfile ? 'logged-in' : 'logged-out'}
        onLoginSuccess={setUserProfile}
      />

      {userProfile && (
        <div className="animate-in fade-in slide-in-from-top-2 mt-4 space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 duration-300">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span>登入成功！Token 資訊已載入：</span>
          </div>
          <div className="max-h-[85px] overflow-y-auto rounded-lg bg-slate-900 p-3 font-mono text-[10px] leading-normal break-all text-slate-300 select-all">
            {userProfile.accessToken}
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex h-7 cursor-pointer items-center gap-1 text-xs text-slate-600 hover:text-slate-900"
            >
              <LogOut className="h-3 w-3" />
              登出 / 清除
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
