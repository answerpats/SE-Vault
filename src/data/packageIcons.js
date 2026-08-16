import { createElement } from 'react';
import {
  Briefcase,
  Palette,
  ShoppingCart,
  Server,
  BarChart3,
  Users,
  FileText,
  Rocket,
  ShieldCheck,
  Globe,
  Megaphone,
  Wallet,
  Settings,
  GraduationCap,
  Package,
} from 'lucide-react';

// Name -> component map. Names are what get stored in the database so the
// admin can pick an icon without us persisting a React component.
const packageIcons = {
  Briefcase,
  Palette,
  ShoppingCart,
  Server,
  BarChart3,
  Users,
  FileText,
  Rocket,
  ShieldCheck,
  Globe,
  Megaphone,
  Wallet,
  Settings,
  GraduationCap,
  Package,
};

export const iconNames = Object.keys(packageIcons);

export function getPackageIcon(name) {
  return packageIcons[name] || Package;
}

/**
 * Static component that resolves an icon by name at render time. Using this
 * instead of `const Icon = getPackageIcon(name)` keeps the component identity
 * stable across renders (see react-hooks/static-components).
 */
export function PackageIcon({ name, ...props }) {
  return createElement(getPackageIcon(name), props);
}

export default packageIcons;
