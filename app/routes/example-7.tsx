import type { LoginResponse } from '~/services/users';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import LoginForm from '~/components/LoginForm';
import { Button } from '~/components/ui/button';

export default function Example7Page() {
  const [userProfile, setUserProfile] = useState<LoginResponse | null>(null);

  function handleLogout() {
    setUserProfile(null);
  }

  return (
    <div className="mx-auto my-8 max-w-lg px-4 text-left">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          [example-07] React Hook Form 表單驗證
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          整合 React Hook Form 的驗證功能，並串接 DummyJSON Login API 進行身分驗證。
        </p>
      </div>

      <LoginForm
        key={userProfile ? 'logged-in' : 'logged-out'}
        onLoginSuccess={setUserProfile}
      />

      {userProfile && (
        <div className="animate-in fade-in slide-in-from-top-2 mt-6 space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-left duration-300">
          <div className="max-h-[85px] overflow-y-auto rounded-lg bg-slate-900 p-3 font-mono text-[10px] leading-normal break-all text-slate-300 select-all">
            {userProfile.accessToken}
          </div>
          <div className="flex justify-end pt-1">
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
