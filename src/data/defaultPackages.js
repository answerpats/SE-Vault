// Fallback packages, shown only when the API returns nothing (e.g. before the
// database has been seeded). The same content is seeded into the `packages`
// table by api/setup.php so it becomes editable from the admin dashboard.
// `icon` is a name that maps to a component via data/packageIcons.js.
const defaultPackages = [
  {
    icon: 'Briefcase',
    title: 'Starter Package',
    subtitle: 'Small Business Support',
    description: 'Essential business support services designed for startups and small enterprises looking to build a strong operational foundation.',
    features: ['Business registration & compliance', 'Basic bookkeeping & tax filing', 'Administrative support', 'Monthly advisory sessions'],
  },
  {
    icon: 'Palette',
    title: 'Portfolio Package',
    subtitle: 'Brand & Portfolio Management',
    description: 'Build and showcase your professional identity with a compelling digital presence that attracts clients and opportunities.',
    features: ['Professional portfolio website', 'Brand identity & design', 'Social media setup & strategy', 'Content creation support'],
    highlighted: true,
  },
  {
    icon: 'ShoppingCart',
    title: 'Commerce Suite',
    subtitle: 'E-Commerce Solutions',
    description: 'End-to-end e-commerce solutions to help you sell online with confidence — from storefront to payment processing.',
    features: ['Online store development', 'Payment gateway integration', 'Inventory management setup', 'Digital marketing & SEO'],
  },
  {
    icon: 'Server',
    title: 'Enterprise Systems',
    subtitle: 'Business Systems',
    description: 'Comprehensive systems integration and digital transformation consulting for established businesses ready to scale.',
    features: ['ERP & CRM implementation', 'Financial systems setup', 'Process automation', 'Staff training & onboarding'],
  },
];

export default defaultPackages;
