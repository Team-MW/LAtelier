/**
 * Coordonnées du salon.
 * Laisse une chaîne vide tant que tu n'as pas la valeur.
 * WhatsApp : indicatif + numéro, sans + ni espaces. Exemple : "34600111222"
 */
export const salon = {
  phoneDisplay: "",
  phoneTel: "",
  whatsapp: "",
  email: "",
  instagram: "",
  mapsUrl: "",
};

/**
 * Horaires d'ouverture (heure de Marbella).
 * Un jour = liste de créneaux "HH:MM" → "HH:MM". Liste vide = fermé.
 * Pour une pause déjeuner : [["10:00", "14:00"], ["16:00", "20:00"]]
 * ⚠️ À VÉRIFIER AVEC LE SALON avant la mise en ligne.
 */
export type Slot = [string, string];

export const hours: Record<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun", Slot[]> = {
  mon: [["10:00", "20:00"]],
  tue: [["10:00", "20:00"]],
  wed: [["10:00", "20:00"]],
  thu: [["10:00", "20:00"]],
  fri: [["10:00", "20:00"]],
  sat: [["10:00", "20:00"]],
  sun: [],
};

export const timeZone = "Europe/Madrid";

/**
 * Tarifs en euros. Les intitulés sont traduits dans lib/content.ts (priceItems).
 * ⚠️ PRIX D'EXEMPLE — À REMPLACER PAR LES VRAIS TARIFS DU SALON.
 */
export const prices: Record<"coupe" | "degrade" | "coupeBarbe" | "barbe" | "enfant", number> = {
  coupe: 18,
  degrade: 20,
  coupeBarbe: 28,
  barbe: 12,
  enfant: 15,
};
