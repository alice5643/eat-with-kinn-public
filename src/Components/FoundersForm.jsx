import { useEffect } from "react";

export default function FoundersForm() {
  useEffect(() => {
    const src = "https://tally.so/widgets/embed.js";
    const script = document.querySelector(`script[src="${src}"]`);
    const load = () => window.Tally ? window.Tally.loadEmbeds() : null;

    if (!script) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = load;
      s.onerror = load;
      document.body.appendChild(s);
    } else {
      load();
    }
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/r/3lQvNW?hideTitle=1&transparentBackground=1"
      loading="lazy"
      width="100%"
      height="800"
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Kinn Founding Sellers"
      className="rounded-[10px]"
      style={{ minHeight: '800px', maxHeight: '800px' }}
    />
  );
}
