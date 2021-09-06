import Brands from '@/assets/icon-fonts/Brands/selection.json';
import Feather from '@/assets/icon-fonts/Feather/selection.json';
import Material from '@/assets/icon-fonts/Material/selection.json';

const familySelections = {
  Brands,
  Feather,
  Material
};
const familyClasses = {
  Brands: 'brands',
  Feather: 'feather',
  Material: 'material'
};
const defaultFamily = 'Feather';

export function getIcon(name, family) {
  family = family || defaultFamily;

  const nameIndex = familySelections[family]
    ?.findIndex(function(n) {
      return n == name;
    }) ?? -1;

  return nameIndex > -1 ? `${familyClasses[family]} ${familyClasses[family]}-${familySelections[family][nameIndex]}` : '';
}

export function hasFamily(family) {
  return Object.keys(families).includes(family);
}

export function hasIcon(name, family) {
  return !!getIcon(family, name);
}
