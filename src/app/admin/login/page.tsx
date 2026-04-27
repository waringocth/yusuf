'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, KeyRound, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { sendOtp, verifyOtp } from '@/app/actions/auth';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');
    setMessage('');

    const res = await sendOtp(email);

    if (res.success) {
      setStep(2);
      setMessage('Doğrulama kodu e-posta adresinize gönderildi.');
    } else {
      setError(res.error || 'Bir hata oluştu.');
    }

    setIsLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Lütfen 6 haneli kodu eksiksiz girin.');
      return;
    }

    setIsLoading(true);
    setError('');

    const res = await verifyOtp(email, otp);

    if (res.success) {
      router.push('/admin');
      router.refresh(); // Force refresh to apply middleware checks
    } else {
      setError(res.error || 'Kod hatalı veya süresi dolmuş.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-200">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Yönetim Paneli
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sadece yetkili personel giriş yapabilir.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                      E-posta Adresiniz
                    </label>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-xl border-0 py-3 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                        placeholder="ornek@kilincturizm.com"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="flex w-full justify-center items-center gap-2 rounded-xl bg-brand-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Giriş Kodu Gönder
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="otp" className="block text-sm font-medium leading-6 text-slate-900">
                        Doğrulama Kodu
                      </label>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm font-semibold text-brand-600 hover:text-brand-500"
                      >
                        Geri Dön
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-slate-500 mb-4">
                      {email} adresine 6 haneli bir kod gönderdik.
                    </p>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyRound className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Sadece rakam
                        className="block w-full rounded-xl border-0 py-3 pl-10 text-center tracking-[0.5em] text-2xl font-bold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
                        placeholder="••••••"
                      />
                    </div>
                  </div>

                  {message && (
                    <div className="text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                      {message}
                    </div>
                  )}

                  {error && (
                    <div className="text-sm text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="flex w-full justify-center items-center gap-2 rounded-xl bg-brand-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Doğrula ve Giriş Yap'
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-center text-xs text-slate-400 mt-8">
          Kılınç Turizm Yönetim Paneli &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
