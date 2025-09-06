import { LogOut } from "lucide-react";
import MessMateLogo from "@/assets/logo.jpg";
import LoginPage from "@/app/login/page";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Logout logic would go here
    console.log("Logout clicked");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={MessMateLogo.src}
            alt="MessMate Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-xl font-bold text-indigo-600 tracking-tight">
            MessMate
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium
                     hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
