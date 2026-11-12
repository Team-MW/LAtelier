// Logo du salon (public/logo.png), utilisé comme masque : il prend la couleur
// du texte (currentColor), donc reste lisible sur les fonds sombres.
export function Mark({ className }: { className?: string }) {
  return <span className={`logo-mark ${className ?? ""}`} aria-hidden="true" />;
}
