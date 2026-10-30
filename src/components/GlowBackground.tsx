// The two soft blue/violet glows behind the page. They're purely decorative,
// so aria-hidden hides them from screen readers and pointer-events-none
// lets clicks pass through to the content.
function GlowBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -right-20 size-96 rounded-full bg-[#7c3aed] opacity-45 blur-[90px]" />
      <div className="absolute top-1/3 -left-28 size-80 rounded-full bg-[#2563eb] opacity-40 blur-[90px]" />
    </div>
  )
}

export default GlowBackground
