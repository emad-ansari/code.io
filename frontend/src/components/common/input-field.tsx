import { LucideIcon   } from "lucide-react";

interface InputFieldProps extends  React.InputHTMLAttributes<HTMLInputElement>{
  icon:  LucideIcon ;
  label: string
}

export function InputField({ icon: Icon, label, ...props }: InputFieldProps) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          <Icon className="w-4 h-4" />
        </div>
        <input
          {...props}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary/50 focus:bg-white/10 transition-color "
        />
      </div>
    </div>
  );
}
