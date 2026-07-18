export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brass/20 bg-cream/95 px-4 py-3 backdrop-blur sm:hidden">
      <a
        href="#signup"
        className="block w-full rounded-full bg-brass py-3 text-center text-sm font-semibold text-cream shadow-md shadow-brass/25"
      >
        Get Early Access
      </a>
    </div>
  );
}
