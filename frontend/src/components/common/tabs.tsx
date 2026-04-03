import { Home, BookOpen, Info, User, LogIn, CodeXml } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Problemset", icon: CodeXml, href: "/problemset" },
  { name: "CS Fundamentals", icon: BookOpen, href: "/cs" },
];

interface Props {
  isLoggedIn: boolean;
}

export default function MobileTabBar({ isLoggedIn }: Props) {
  const location = useLocation();

  const activeIndex = tabs.findIndex(
    (tab) => location.pathname === tab.href
  );

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[70%] max-w-md z-50 md:hidden">
      <div className="relative flex items-center px-2 py-2 rounded-2xl 
        bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">

        {/* 🔵 Sliding Background Indicator */}
        <div
          className="absolute top-1 bottom-1 rounded-xl 
          bg-gradient-to-r from-blue-500/20 to-purple-500/20 
          backdrop-blur-md border border-white/10
          transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / (tabs.length + 1)}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {/* Tabs */}
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.href;

          return (
            <Link
              key={tab.name}
              to={tab.href}
              className="relative z-10 flex-1 flex flex-col items-center py-2 justify-center"
            >
              <Icon
                className={`w-6 h-6 transition ${
                  isActive
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
            </Link>
          );
        })}

        {/* Profile/Login Tab */}
        <div className="relative z-10 flex-1 flex flex-col items-center py-2">
          {isLoggedIn ? (
            <User className="w-6 h-6 text-gray-400" />
          ) : (
            <LogIn className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}