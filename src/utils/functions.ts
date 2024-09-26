export const capitalize = (name: string | undefined) => {
  if (name == undefined) return '';
  return name[0].toUpperCase() + name.substring(1).toLowerCase();
}