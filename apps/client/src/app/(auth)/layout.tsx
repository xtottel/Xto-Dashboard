
import GridShape from "@/components/common/GridShape";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray-900 sm:p-0">
        {children}

        {/* Right side brand panel */}
        <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
          <div className="relative flex flex-col items-center justify-center z-1">
            {/* ===== Common Grid Shape Start ===== */}
            <GridShape />

            <div className="flex flex-col items-center max-w-xs space-y-4">
              <h3 className="text-center text-white font-bold text-6xl">
                Welcome to Xtopay
              </h3>
              <p className="text-center text-gray-300 dark:text-white/60 text-lg">
                Powering payments across Ghana with secure, fast and reliable
                rails built for businesses of all sizes.
              </p>
            </div>
          </div>

          {/* ===== Xtottel Signature ===== */}
          <div className="absolute bottom-6 right-6 text-right">
            <p className="text-xs text-gray-400 dark:text-gray-500 italic">
              Powered by
            </p>
            <p className="text-sm font-semibold text-white dark:text-white/80">
              Xtottel Ltd
            </p>
            {/* <p className="text-xs text-gray-400 dark:text-gray-500 italic">
            Built with <span className="text-red-500">💚</span> by{" "}
            <a
              href="https://xtottel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              Xtottel Ltd
            </a>
          </p> */}
          </div>

        </div>

        {/* Future buttons (e.g., theme switcher) */}
        <div className="fixed bottom-6 right-6 z-50 hidden sm:block"></div>
      </div>
    </div>
  );
}
