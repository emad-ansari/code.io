import { Github } from "lucide-react";

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <button className="flex items-center justify-center gap-2 py-3 px-4 glass-card rounded-xl hover:bg-white/10 transition-colors text-sm font-medium text-white">
        <Github className="w-4 h-4" />
        GitHub
      </button>
      <button className="flex items-center justify-center gap-2 py-3 px-4 glass-card rounded-xl hover:bg-white/10 transition-colors text-sm font-medium text-white">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
        Google
      </button>
    </div>
  );
}

