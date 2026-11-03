export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 82" fill="none" aria-hidden="true">
      <ellipse cx="32" cy="41" rx="27" ry="36" stroke="currentColor" strokeWidth="1.6" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M32 15.5 17.2 64h7.1L32 42.4 39.7 64h7.1L32 15.5Zm0 22.2 4.2 12.1h-8.4L32 37.7Z"
      />
    </svg>
  );
}
