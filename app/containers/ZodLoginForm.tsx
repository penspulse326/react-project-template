import type { LoginResponse } from '~/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, KeyRound, Loader2, Lock, ShieldAlert, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { loginUser } from '~/services/user';

// 1. 定義 Zod Schema（集中管理所有的驗證邏輯與錯誤訊息）
const loginSchema = z.object({
  username: z
    .string()
    .min(1, '使用者名稱為必填欄位')
    .min(3, '使用者名稱長度至少需為 3 個字元'),
  password: z
    .string()
    .min(1, '密碼為必填欄位')
    .min(4, '密碼長度至少需為 4 個字元'),
  expiresInMins: z.coerce
    .number({
      invalid_type_error: '過期時間為必填欄位',
    })
    .min(1, '過期時間最少為 1 分鐘')
    .max(180, '過期時間最多為 180 分鐘'),
});

// 2. 自動推導 TypeScript 型別
type LoginFormInputs = z.infer<typeof loginSchema>;

interface ZodLoginFormProps {
  onLoginSuccess: (profile: LoginResponse) => void;
}

export default function ZodLoginForm({ onLoginSuccess }: ZodLoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    // 3. 整合 zodResolver，將 Zod schema 注入 React Hook Form
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      expiresInMins: 30,
    },
    mode: 'onChange',
  });

  function handleAutofill() {
    // 使用 setValue 來寫入值並觸發驗證
    setValue('username', 'emilys', { shouldValidate: true, shouldDirty: true });
    setValue('password', 'emilyspass', { shouldValidate: true, shouldDirty: true });
    setValue('expiresInMins', 30, { shouldValidate: true, shouldDirty: true });
    setApiError(null);
  }

  async function onSubmit(data: LoginFormInputs) {
    setIsLoading(true);
    setApiError(null);

    const result = await loginUser(data.username, data.password, data.expiresInMins);

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
          帳號登入 (Zod + RHF)
        </CardTitle>
        <CardDescription className="text-center text-xs text-slate-400">
          此表單的欄位驗證完全使用 Zod Schema 與 React Hook Form 整合處理。
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
              // 4. 僅需綁定欄位名稱，不需要在 register 內撰寫任何 validation 規則
              {...register('username')}
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
              {...register('password')}
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
              placeholder="過期時間 (預設 30 分鐘)"
              className={cn(
                'bg-slate-50/50 focus:bg-white transition-all',
                errors.expiresInMins && 'border-red-400 focus-visible:ring-red-400 focus-visible:ring-1',
              )}
              // 用 valueAsNumber 確保輸出是 number 型別
              {...register('expiresInMins', { valueAsNumber: true })}
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
        所有欄位防呆在輸入變更時，會透過 Zod 進行即時 Schema 驗證。
      </CardFooter>
    </Card>
  );
}
