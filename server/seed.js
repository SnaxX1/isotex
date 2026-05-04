import prisma from './prisma.js';

const products = [
  {
    title: 'NeoBrick - Indigo Indigo',
    category: 'INTERIOR DECORATION',
    price: '20.00',
    stock: 500,
    status: 'In Stock',
    description: 'Self-locking architectural brick with a raw industrial aesthetic. The distinctive indigo hue comes from 100% recycled denim fibers.',
    sustainability: '85% recycled denim, 15% mineral-based binder. Recycles 6.5kg of denim waste per unit. Zero-water dyeing process.',
    image: '/images/IMG-20260420-WA0042.jpg'
  },
  {
    title: 'Soft Grey Facing Plate',
    category: 'INTERIOR DECORATION',
    price: '25.00',
    stock: 200,
    status: 'In Stock',
    description: 'Ultra-thin facing plates designed for modern interior cladding. Features a smooth, concrete-like finish derived from mixed neutral textile waste.',
    sustainability: '90% mixed neutral textiles, 10% eco-resin. Recycles 3.2kg of mixed textile waste per square meter.',
    image: '/images/IMG-20260421-WA0014.jpg'
  },
  {
    title: 'Cento Mixed Block',
    category: 'INSULATION',
    price: '20.00',
    stock: 0,
    status: 'Made to Order',
    description: 'High-density acoustic and thermal isolation block. The unique speckled appearance comes from processing unsorted, multi-colored textile waste streams.',
    sustainability: '100% post-consumer mixed textiles, compressed under heat. Diverts 12kg of unrecyclable mixed textiles from landfill per block.',
    image: '/images/IMG-20260420-WA0030.jpg'
  },
  {
    title: 'Garden Edge - Raw Indigo',
    category: 'EXTERIOR DECORATION',
    price: '25.00',
    stock: 150,
    status: 'In Stock',
    description: 'Weather-resistant landscaping bricks designed for outdoor use. Coated with a proprietary eco-sealant to withstand the elements while maintaining the signature indigo texture.',
    sustainability: '80% recycled denim, 20% weather-resistant bio-resin. Recycles 5kg of denim waste per unit. Non-toxic sealant.',
    image: '/images/IMG-20260421-WA0010.jpg'
  },
  {
    title: 'NeoBrick - Charcoal Denim',
    category: 'INTERIOR DECORATION',
    price: '20.00',
    stock: 300,
    status: 'In Stock',
    description: 'Dark-toned self-locking architectural brick crafted from heavy-weight recycled denim offcuts. The deep charcoal finish creates a dramatic, contemporary accent wall effect.',
    sustainability: '88% recycled dark denim, 12% mineral-based binder. Recycles 7kg of dark denim waste per unit. Zero-VOC manufacturing process.',
    image: '/images/IMG-20260420-WA0033.jpg'
  },
  {
    title: 'Ivory Facing Plate',
    category: 'INTERIOR DECORATION',
    price: '25.00',
    stock: 180,
    status: 'In Stock',
    description: 'Premium-finish cladding panel with a warm ivory tone achieved by blending light-colored textile waste streams. Ideal for minimalist and Scandinavian-inspired interiors.',
    sustainability: '92% recycled light-toned textiles, 8% eco-resin. Recycles 3.5kg of light textile waste per square meter. Water-based finishing.',
    image: '/images/IMG-20260421-WA0017.jpg'
  },
  {
    title: 'ThermoBlock - Color Mix XL',
    category: 'INSULATION',
    price: '20.00',
    stock: 0,
    status: 'Made to Order',
    description: 'Extra-large format thermal insulation block for high-performance wall assemblies. The vibrant color-mix pattern makes it a striking choice when left exposed in industrial interiors.',
    sustainability: '100% post-consumer mixed textiles, heat-compressed without adhesives. Diverts 18kg of unsorted mixed textiles from landfill per block.',
    image: '/images/IMG-20260420-WA0036.jpg'
  },
  {
    title: 'ExteriorFace - Neutral Slab',
    category: 'EXTERIOR DECORATION',
    price: '25.00',
    stock: 100,
    status: 'In Stock',
    description: 'Heavy-duty exterior cladding slab engineered for facade applications. The reinforced eco-resin matrix ensures long-term durability against UV, rain, and thermal cycling.',
    sustainability: '85% recycled neutral textiles, 15% UV-stabilized bio-resin. Recycles 4kg of textile waste per panel. No solvent-based treatments.',
    image: '/images/IMG-20260421-WA0021.jpg'
  }
];

const seedDatabase = async () => {
  console.log('🌱 Seeding ISOTEX products into database...');
  try {
    // Clear existing products
    await prisma.product.deleteMany();
    console.log('🗑️  Cleared existing products.');

    // Add new products
    for (const product of products) {
      await prisma.product.create({
        data: product
      });
      console.log(`  ✅ Added: ${product.title}`);
    }

    console.log('\n🎉 All 8 ISOTEX products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
