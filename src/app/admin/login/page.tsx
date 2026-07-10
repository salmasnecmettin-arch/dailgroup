"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { signIn } from "@/lib/actions/auth";
import { Logo } from "@/components/site/logo";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-dail-navy-950 px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex justify-center">
          <Logo tone="dark" />
        </div>
        <p className="mt-2 text-center text-sm text-dail-navy-900/50">
          Yönetim Paneli
        </p>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dail-navy-900/70">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              name="username"
              required
              autoComplete="username"
              className="w-full rounded-xl border border-dail-navy-900/10 px-4 py-3 text-sm outline-none focus:border-dail-red-500 focus:ring-2 focus:ring-dail-red-500/20"
              placeholder="dailgrup"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dail-navy-900/70">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-xl border border-dail-navy-900/10 px-4 py-3 text-sm outline-none focus:border-dail-red-500 focus:ring-2 focus:ring-dail-red-500/20"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-dail-red-500">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-dail-red-500 px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
