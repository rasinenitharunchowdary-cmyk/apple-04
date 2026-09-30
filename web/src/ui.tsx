import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { assets, type AssetKey } from "../../shared/assets";
import dimensions from "../../shared/dimensions.json";
const files = import.meta.glob("../../assets/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
export function Picture({
  name,
  alt = "",
  className = "",
  style,
  priority = false,
}: {
  name: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  const file = assets[name as AssetKey];
  const size = dimensions[file as keyof typeof dimensions];
  if (!file) throw new Error(`Unknown asset: ${name}`);
  return (
    <img
      src={files["../../assets/" + file]}
      alt={alt}
      className={className}
      width={size.width}
      height={size.height}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      data-asset={name}
    />
  );
}
export function Link({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`text-link ${className}`}
      href={href}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
      <span aria-hidden="true"> ›</span>
    </a>
  );
}
export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const restoreFocus = useRef(document.activeElement as HTMLElement | null);
  useEffect(() => {
    const last = restoreFocus.current;
    const dialog = ref.current;
    ref.current?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = old;
      last?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={wide ? "modal wide" : "modal"}
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button className="close" aria-label="Close dialog" onClick={onClose}>
        ×
      </button>
      <h2>{title}</h2>
      {children}
    </dialog>
  );
}
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}
