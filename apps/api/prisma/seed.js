// // prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');
const prisma = new PrismaClient();

const salt = 10
async function main() {

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@8th.com',
      password: await hash('admin', salt),
      isVerify: true,
      address: 'Bogor',
      role: 'ADMIN',
      phoneNumber: '088219238124',
      profilePicture: 'https://i.pinimg.com/1200x/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg',
      verifyEmailCode: 'admin-ganteng',
    }
  })

  const products = [
    {
      productName: '8 TINY HOLES - MURDERER',
      description: 'A reusable and eco-friendly water bottle, perfect for staying hydrated on the go. Made from BPA-free materials.',
      stock: 150,
      price: 100,
      category: 'Drinkware',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://example.com/images/product1.jpg' }
      ]
    },
    {
      productName: '8 TINY HOLES - KRAKEN',
      description: 'Energy-efficient smart LED light bulb compatible with Alexa and Google Home. Change colors and control brightness remotely.',
      stock: 200,
      price: 100,
      category: 'Electronics',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://example.com/images/product2.jpg' }
      ]
    },
    {
      productName: '8 TINY HOLES - LOGO IMPACT',
      description: 'Handcrafted lavender soap made with all-natural ingredients. Ideal for sensitive skin and relaxation.',
      stock: 100,
      price: 100,
      category: 'Beauty & Personal Care',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://example.com/images/product3.jpg' }
      ]
    },
    {
      productName: '8 TINY HOLES - AFTER BREAK',
      description: 'A luxurious 4-piece cotton bedding set designed for comfort and durability. Available in queen and king sizes.',
      stock: 50,
      price: 100,
      category: 'Home & Living',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://example.com/images/product4.jpg' }
      ]
    },
    {
      productName: '8 TINY HOLES - MURDERER',
      description: 'High-quality wireless earbuds with noise-canceling technology and a 12-hour battery life. Perfect for music and calls.',
      stock: 120,
      price: 100,
      category: 'Electronics',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://example.com/images/product5.jpg' }
      ]
    }
  ];

  for (const product of products) {
    const { size, productImage, ...productData } = product;

    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        productImage: {
          create: productImage
        },
        sizeChart: {
          create: size.map((s)=> {
            return {
              size: s
            }
          })
        }
      }
    });

    console.log(`Product created: ${createdProduct.productName}`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
