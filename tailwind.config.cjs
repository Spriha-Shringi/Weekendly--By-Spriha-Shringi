module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      // Category theme classes that might be purged
      'from-orange-400', 'to-red-500', 'from-orange-50', 'to-red-50', 'border-orange-200', 'bg-orange-100', 'text-orange-800',
      'from-green-400', 'to-emerald-500', 'from-green-50', 'to-emerald-50', 'border-green-200', 'bg-green-100', 'text-green-800',
      'from-purple-400', 'to-pink-500', 'from-purple-50', 'to-pink-50', 'border-purple-200', 'bg-purple-100', 'text-purple-800',
      'from-blue-400', 'to-indigo-500', 'from-blue-50', 'to-indigo-50', 'border-blue-200', 'bg-blue-100', 'text-blue-800',
      'from-teal-400', 'to-cyan-500', 'from-teal-50', 'to-cyan-50', 'border-teal-200', 'bg-teal-100', 'text-teal-800',
      'from-yellow-400', 'to-amber-500', 'from-yellow-50', 'to-amber-50', 'border-yellow-200', 'bg-yellow-100', 'text-yellow-800',
      'from-rose-400', 'to-pink-500', 'from-rose-50', 'to-pink-50', 'border-rose-200', 'bg-rose-100', 'text-rose-800',
      'from-gray-400', 'to-slate-500', 'from-gray-50', 'to-slate-50', 'border-gray-200', 'bg-gray-100', 'text-gray-800',
      // Dark mode variants
      'dark:from-orange-900/20', 'dark:to-red-900/20', 'dark:border-orange-700', 'dark:bg-orange-900/40', 'dark:text-orange-300',
      'dark:from-green-900/20', 'dark:to-emerald-900/20', 'dark:border-green-700', 'dark:bg-green-900/40', 'dark:text-green-300',
      'dark:from-purple-900/20', 'dark:to-pink-900/20', 'dark:border-purple-700', 'dark:bg-purple-900/40', 'dark:text-purple-300',
      'dark:from-blue-900/20', 'dark:to-indigo-900/20', 'dark:border-blue-700', 'dark:bg-blue-900/40', 'dark:text-blue-300',
      'dark:from-teal-900/20', 'dark:to-cyan-900/20', 'dark:border-teal-700', 'dark:bg-teal-900/40', 'dark:text-teal-300',
      'dark:from-yellow-900/20', 'dark:to-amber-900/20', 'dark:border-yellow-700', 'dark:bg-yellow-900/40', 'dark:text-yellow-300',
      'dark:from-rose-900/20', 'dark:to-pink-900/20', 'dark:border-rose-700', 'dark:bg-rose-900/40', 'dark:text-rose-300',
      'dark:from-gray-900/20', 'dark:to-slate-900/20', 'dark:border-gray-700', 'dark:bg-gray-900/40', 'dark:text-gray-300',
      // Button gradients
      'bg-gradient-to-r', 'from-orange-500', 'to-red-500', 'hover:from-orange-600', 'hover:to-red-600',
      'from-green-500', 'to-emerald-500', 'hover:from-green-600', 'hover:to-emerald-600',
      'from-purple-500', 'to-pink-500', 'hover:from-purple-600', 'hover:to-pink-600',
      'from-blue-500', 'to-indigo-500', 'hover:from-blue-600', 'hover:to-indigo-600',
      'from-teal-500', 'to-cyan-500', 'hover:from-teal-600', 'hover:to-cyan-600',
      'from-yellow-500', 'to-amber-500', 'hover:from-yellow-600', 'hover:to-amber-600',
      'from-rose-500', 'to-pink-500', 'hover:from-rose-600', 'hover:to-pink-600',
      'from-gray-500', 'to-slate-500', 'hover:from-gray-600', 'hover:to-slate-600',
      // Background gradients
      'bg-gradient-to-br'
    ],
    theme: {
      extend: {
        colors: {
            primary: {
              light: "#14b8a6", // teal-500
              dark: "#6366f1",  // indigo-500
            }
          }
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      }
    },
    plugins: [],
  };
  