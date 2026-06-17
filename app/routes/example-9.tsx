import type { LoginResponse, User } from '~/services/users';
import { CheckCircle, Database, LogOut, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import ZodLoginForm from '~/components/ZodLoginForm';
import { getUserValidated, UserSchema } from '~/services/users';

export default function Example9Page() {
  // Section A states
  const [userProfile, setUserProfile] = useState<LoginResponse | null>(null);

  // Section B states
  const [userId, setUserId] = useState<string>('1');
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [apiUser, setApiUser] = useState<User | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [zodDetailErrors, setZodDetailErrors] = useState<any[] | null>(null);

  function handleLogout() {
    setUserProfile(null);
  }

  async function handleFetchUser() {
    setIsLoadingUser(true);
    setApiError(null);
    setApiUser(null);
    setZodDetailErrors(null);

    const result = await getUserValidated(userId);

    setIsLoadingUser(false);
    if (result.success) {
      setApiUser(result.data);
    } else {
      setApiError(result.message);
      // 如果是 ZodError，可取得詳細屬性錯誤
      if (result.error && 'issues' in result.error) {
        setZodDetailErrors((result.error as any).issues);
      }
    }
  }

  // 模擬後端回傳結構異常，觸發 Zod 攔截
  async function handleSimulateValidationError() {
    setIsLoadingUser(true);
    setApiError(null);
    setApiUser(null);
    setZodDetailErrors(null);

    // 模擬後端回傳了一個不正確的格式 (例如：id 變成字串、缺少必要欄位 firstName，且 age 是負數)
    const badMockResponse = {
      id: 'not-a-number', // 應該是 number
      age: -5,
      gender: 'unknown',
      company: {
        name: 'Mock Company',
        // 缺少 title 與 department
      },
    };

    setTimeout(() => {
      setIsLoadingUser(false);
      try {
        // 使用 UserSchema 進行 parse
        UserSchema.parse(badMockResponse);
      } catch (error: any) {
        setApiError('Zod 攔截：API 響應格式驗證失敗！');
        if (error.issues) {
          setZodDetailErrors(error.issues);
        }
      }
    }, 500);
  }

  return (
    <div className="mx-auto my-8 max-w-4xl px-4 text-left">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          [example-09] Zod 驗證整合示範
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          示範 Zod 在前端的兩大核心場景：表單前端驗證（React Hook Form）與 API 響應格式驗證（Runtime Validation）。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Section 1: Zod + React Hook Form */}
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

        {/* Section 2: API Response Validation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Database className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800">2. Zod 與 API 響應資料驗證</h2>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
            <div className="space-y-1.5">
              <Label htmlFor="userId" className="font-semibold text-slate-700">
                使用者 ID (測試 API 讀取)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={function (e) { setUserId(e.target.value); }}
                  placeholder="請輸入 ID (例如 1)"
                  className="bg-slate-50/50 focus:bg-white"
                />
                <Button
                  onClick={handleFetchUser}
                  disabled={isLoadingUser}
                  className="h-10 cursor-pointer bg-slate-900 font-medium text-white hover:bg-slate-800"
                >
                  讀取並驗證
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                variant="destructive"
                onClick={handleSimulateValidationError}
                disabled={isLoadingUser}
                className="h-9 w-full cursor-pointer text-xs font-semibold"
              >
                模擬 API 結構異常 (觸發 Zod 攔截)
              </Button>
            </div>

            {/* 結果呈現區 */}
            {isLoadingUser && (
              <p className="py-4 text-center text-xs text-slate-500">資料處理中，請稍候...</p>
            )}

            {apiUser && (
              <div className="animate-in fade-in space-y-2 rounded-lg border border-emerald-200 bg-emerald-50/40 p-4 duration-200">
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Zod 驗證通過：資料結構符合預期</span>
                </div>
                <div className="space-y-1 rounded border border-emerald-100 bg-white p-3 font-mono text-xs text-slate-700">
                  <p>
                    <strong>ID:</strong>
                    {' '}
                    {apiUser.id}
                  </p>
                  <p>
                    <strong>姓名:</strong>
                    {' '}
                    {apiUser.firstName}
                    {' '}
                    {apiUser.lastName}
                  </p>
                  <p>
                    <strong>年齡:</strong>
                    {' '}
                    {apiUser.age}
                  </p>
                  <p>
                    <strong>性別:</strong>
                    {' '}
                    {apiUser.gender}
                  </p>
                  {apiUser.email && (
                    <p>
                      <strong>Email:</strong>
                      {' '}
                      {apiUser.email}
                    </p>
                  )}
                </div>
              </div>
            )}

            {apiError && (
              <div className="animate-in fade-in space-y-3 rounded-lg border border-red-200 bg-red-50/60 p-4 duration-200">
                <div className="flex items-center gap-1 text-xs font-bold text-red-800">
                  <ShieldAlert className="h-4 w-4 text-red-600" />
                  <span>{apiError}</span>
                </div>

                {zodDetailErrors && zodDetailErrors.length > 0 && (
                  <div className="max-h-48 space-y-2 overflow-x-auto rounded border border-red-100 bg-white p-3 font-mono text-[10px] text-red-700">
                    <p className="border-b border-red-100 pb-1 font-bold">Zod 詳細錯誤分析：</p>
                    {zodDetailErrors.map((issue, index) => {
                      return (
                        <div key={index} className="border-b border-slate-100 pb-1.5 last:border-0 last:pb-0">
                          <p className="font-semibold text-slate-900">
                            ❌ 欄位:
                            {' '}
                            <code className="rounded bg-slate-100 px-1">{issue.path.join('.')}</code>
                          </p>
                          <p>
                            原因:
                            {issue.message}
                          </p>
                          <p className="text-slate-400">
                            類型:
                            {issue.code}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
