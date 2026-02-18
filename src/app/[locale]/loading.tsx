/**
 * Loading state for Collectif Nova.
 * Dark theme with violet/cyan gradient spinner.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-noir-800">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-gris-800" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-violet-500 border-r-cyan-400" />
        </div>
        <p className="text-sm font-medium text-gris-400 animate-pulse">
          Chargement&hellip;
        </p>
      </div>
    </div>
  );
}
