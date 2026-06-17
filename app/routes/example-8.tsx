import { LogOut } from 'lucide-react';
import LoginForm from '~/components/container/LoginForm';
import { Button } from '~/components/ui/button';
import { useUserStore } from '~/store/userStore';

export default function Example8Page() {
  const { userProfile, setUserProfile, clearUserProfile } = useUserStore();

  function handleLogout() {
    clearUserProfile();
  }

  return (
    <div className="mx-auto my-8 max-w-lg px-4 text-left">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          [example-08] Zustand 狀態管理
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          使用 Zustand 進行全域/外部狀態管理，流程與 Example 7 相同，但狀態改由 Zustand Store 管理。
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
