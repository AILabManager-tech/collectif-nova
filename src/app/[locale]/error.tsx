"use client";

import { AlertTriangle } from "lucide-react";

/**
 * Error boundary page for Collectif Nova.
 * Dark theme with violet accents and retry functionality.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20">
          <AlertTriangle className="h-8 w-8 text-violet-400" />
        </div>
        <h1 className="mb-2 font-heading text-2xl font-semibold text-gris-50">
          Une erreur est survenue
        </h1>
        <p className="mb-6 text-gris-400">
          Nous nous excusons pour ce d&eacute;sagr&eacute;ment. Veuillez
          r&eacute;essayer.
        </p>
        <button
          onClick={reset}
          className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-noir-800"
        >
          R&eacute;essayer
        </button>
      </div>
    </main>
  );
}
