export function generateInitials(fullName: string): string {
  if (!fullName) return "RU";

  const names = fullName.trim().split(" ");

  if (names.length === 0) return "";

  let initials = names[0].charAt(0).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].charAt(0).toUpperCase();
  }

  return initials;
}
