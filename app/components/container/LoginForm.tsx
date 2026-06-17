import type { LoginResponse } from '~/services/users';
import { AlertCircle, KeyRound, Loader2, Lock, ShieldAlert, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { loginUser } from '~/services/users';

interface LoginFormInputs {
  username: string;
  password: string;
  expiresInMins: number;
}

interface LoginFormProps {
  onLoginSuccess: (profile: LoginResponse) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: '',
      password: '',
      expiresInMins: 30,
    },
    mode: 'onChange',
  });

  function handleAutofill() {
    setValue('username', 'emilys', { shouldValidate: true, shouldDirty: true });
    setValue('password', 'emilyspass', { shouldValidate: true, shouldDirty: true });
    setValue('expiresInMins', 30, { shouldValidate: true, shouldDirty: true });
    setApiError(null);
  }

  async function onSubmit(data: LoginFormInputs) {
    setIsLoading(true);
    setApiError(null);

    const result = await loginUser(data.username, data.password, Number(data.expiresInMins));

    setIsLoading(false);
    if (result.success) {
      onLoginSuccess(result.data);
    } else {
      setApiError(result.message);
    }
  }

  return (
    <Card className="border-slate-200/80 bg-white/70 shadow-xl backdrop-blur-md transition-all duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
          <KeyRound className="h-5 w-5 text-indigo-600" />
          帳號登入
        </CardTitle>
        <CardDescription className="text-center text-xs text-slate-400">
          請輸入 DummyJSON 帳號與密碼進行測試驗證。
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Autofill helper */}
        <div className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50/80 p-3 text-xs text-indigo-900 transition-all hover:bg-indigo-50">
          <div className="flex items-center justify-between gap-2">
            <span>
              💡

              <strong>測試帳密：</strong>
              <code className="rounded border bg-white px-1 py-0.5 font-mono select-all">emilys</code>

              /
              <code className="ml-1 rounded border bg-white px-1 py-0.5 font-mono select-all">emilyspass</code>
            </span>
            <button
              type="button"
              onClick={handleAutofill}
              className="shrink-0 cursor-pointer font-bold text-indigo-600 underline transition-colors hover:text-indigo-800"
            >
              點擊自動填入
            </button>
          </div>
        </div>

        {apiError && (
          <div className="animate-in fade-in slide-in-from-top-1 mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 duration-200">
            <ShieldAlert className="h-4 w-4 shrink-0 text-red-600" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username field */}
          <div className="space-y-1.5">
            <Label htmlFor="username" className="flex items-center gap-1.5 font-semibold text-slate-700">
              <UserIcon className="h-3.5 w-3.5 text-slate-500" />
              使用者名稱 (Username)
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="請輸入使用者名稱"
              className={cn(
                'bg-slate-50/50 focus:bg-white transition-all',
                errors.username && 'border-red-400 focus-visible:ring-red-400 focus-visible:ring-1',
              )}
              {...register('username', {
                required: '使用者名稱為必填欄位',
                minLength: {
                  value: 3,
                  message: '使用者名稱長度至少需為 3 個字元',
                },
              })}
            />
            {errors.username && (
              <p className="animate-in fade-in mt-0.5 flex items-center gap-1 text-xs text-red-500 duration-150">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Lock className="h-3.5 w-3.5 text-slate-500" />
              密碼 (Password)
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="請輸入密碼"
              className={cn(
                'bg-slate-50/50 focus:bg-white transition-all',
                errors.password && 'border-red-400 focus-visible:ring-red-400 focus-visible:ring-1',
              )}
              {...register('password', {
                required: '密碼為必填欄位',
                minLength: {
                  value: 4,
                  message: '密碼長度至少需為 4 個字元',
                },
              })}
            />
            {errors.password && (
              <p className="animate-in fade-in mt-0.5 flex items-center gap-1 text-xs text-red-500 duration-150">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Expires field */}
          <div className="space-y-1.5">
            <Label htmlFor="expiresInMins" className="flex items-center gap-1.5 font-semibold text-slate-700">
              Token 有效期限 (分鐘)
            </Label>
            <Input
              id="expiresInMins"
              type="number"
              placeholder="過期時間 (預設 60 分鐘)"
              className={cn(
                'bg-slate-50/50 focus:bg-white transition-all',
                errors.expiresInMins && 'border-red-400 focus-visible:ring-red-400 focus-visible:ring-1',
              )}
              {...register('expiresInMins', {
                required: '過期時間為必填欄位',
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: '過期時間最少為 1 分鐘',
                },
                max: {
                  value: 180,
                  message: '過期時間最多為 180 分鐘',
                },
              })}
            />
            {errors.expiresInMins && (
              <p className="animate-in fade-in mt-0.5 flex items-center gap-1 text-xs text-red-500 duration-150">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.expiresInMins.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading || !isValid}
              className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 bg-indigo-600 font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:translate-y-px"
            >
              {isLoading && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  驗證中...
                </>
              )}
              {!isLoading && '登入並驗證表單'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="block border-t border-slate-100 pt-4 text-center text-[10px] text-slate-400">
        表單會在欄位變更時動態進行前端驗證。若欄位不符規則，送出按鈕將被禁用。
      </CardFooter>
    </Card>
  );
}
