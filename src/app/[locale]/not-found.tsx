import Link from "next/link";

/**
 * 404 page for Collectif Nova.
 * Dark theme with glitch effect text and violet glow.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 gradient-mesh-bg opacity-50" />

      <div className="text-center max-w-md relative z-10">
        {/* Glitch 404 */}
        <div className="relative mb-4">
          <p className="font-heading text-8xl md:text-9xl font-bold text-violet-500/20 select-none animate-glitch neon-text-violet">
            404
          </p>
          <p className="absolute inset-0 font-heading text-8xl md:text-9xl font-bold text-cyan-400/10 select-none translate-x-1 translate-y-1">
            404
          </p>
        </div>
        <h1 className="mb-3 font-heading text-2xl font-semibold text-gris-50">
          Page introuvable
        </h1>
        <p className="mb-8 text-gris-400">
          La page que vous cherchez n&apos;existe pas ou a &eacute;t&eacute;
          d&eacute;plac&eacute;e.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-noir-800 glow-violet"
        >
          Retour &agrave; l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
