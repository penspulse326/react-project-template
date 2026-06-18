import ZodApiSection from '~/containers/ZodApiSection';
import ZodFormSection from '~/containers/ZodFormSection';

export default function Example9Page() {
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
        <ZodFormSection />

        {/* Section 2: API Response Validation */}
        <ZodApiSection />
      </div>
    </div>
  );
}
