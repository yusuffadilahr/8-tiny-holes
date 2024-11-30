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
      description: 'Bold and edgy, the Murderer T-shirt is a statement piece for the fearless. Made from soft, breathable cotton, this shirt brings a unique design that stands out, perfect for those who dare to make an impact. Embrace your inner rebel in style.',
      stock: 150,
      price: 100,
      category: 'T-shirt',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://www.orbisjkt.com/cdn/shop/files/Resizecopyqunnov24-01_600x.jpg?v=1731066010' }
      ]
    },
    {
      productName: '8 TINY HOLES - KRAKEN',
      description: 'Unleash the power of the Kraken with this eye-catching T-shirt. Featuring a striking graphic print and a comfortable, relaxed fit, this piece is perfect for streetwear enthusiasts looking to add a bold design to their collection. Wear it loud, wear it proud.',
      stock: 200,
      price: 100,
      category: 'T-shirt',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://www.orbisjkt.com/cdn/shop/files/ORBISBURURESIZE1-25_600x.jpg?v=1730808669' }
      ]
    },
    {
      productName: '8 TINY HOLES - LOGO IMPACT',
      description: 'The Logo Impact T-shirt combines simplicity with sophistication. Featuring a minimalist logo and crafted from high-quality cotton, this shirt offers a soft, premium feel and effortless style. Perfect for a laid-back look or layered with your favorite jacket.',
      stock: 100,
      price: 100,
      category: 'T-shirt',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://www.orbisjkt.com/cdn/shop/files/ORBISBURURESIZE3-01_600x.jpg?v=1730808848' }
      ]
    },
    {
      productName: '8 TINY HOLES - AFTER BREAK',
      description: 'Relax in style with the After Break T-shirt. This soft, premium cotton tee features a casual fit and a cool graphic that makes it perfect for day-to-day wear. Whether youre lounging at home or out with friends, this piece adds a touch of effortless cool.',
      stock: 50,
      price: 100,
      category: 'T-shirt',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://www.orbisjkt.com/cdn/shop/files/Resize-07_f9241227-96e1-475e-99b3-9b165a3ebfe2_600x.jpg?v=1730112677' }
      ]
    },
    {
      productName: '8 TINY HOLES - BURN',
      description: 'Turn up the heat with the Burn T-shirt. Featuring a striking design and made from breathable cotton, this shirt is perfect for those who love to stand out. With its bold graphic and comfortable fit, its the ideal piece for adding a little fire to your wardrobe.',
      stock: 120,
      price: 100,
      category: 'Jacket',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://www.orbisjkt.com/cdn/shop/products/FailureMateriel3Black1_57c50553-1c55-4670-9986-a042c642350b_600x.jpg?v=1609170304' }
      ]
    },
    {
      productName: '8 TINY HOLES - PARTIAL',
      description: 'The Partial T-shirt is all about combining comfort with style. Crafted from soft cotton, this shirt features a unique design that’s perfect for casual outings. Its versatility makes it a wardrobe staple, while the graphic adds a cool, modern edge to any outfit.',
      stock: 150,
      price: 100,
      category: 'Jacket',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://www.orbisjkt.com/cdn/shop/products/Untitled-3-02_a2f744f2-115f-4269-853d-d0999a99fa9d_600x.jpg?v=1617332765' }
      ]
    },
    {
      productName: '8 TINY HOLES - WILD SPIRIT',
      description: 'The Wild Spirit tee is for those who embrace the untamed. Featuring bold graphics and a rebellious vibe, this shirt is all about freedom and individuality. Crafted from soft cotton, it’s perfect for anyone who dares to stand out.',
      stock: 120,
      price: 100,
      category: 'Jacket',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://www.orbisjkt.com/cdn/shop/products/Watchouttheworld-CREW-front_600x.jpg?v=1620589482' }
      ]
    },
    // https://www.orbisjkt.com/cdn/shop/files/1_d7b38957-8123-4605-a195-592e7b7533a7_600x.jpg?v=1730288483
    {
      productName: '8 TINY HOLES - UNCHAINED',
      description: 'The Unchained jacket is for those who refuse to be held back. Featuring a sleek, modern design with subtle yet powerful detailing, this jacket embodies freedom. With its versatile style, it’s ready to elevate your streetwear game.',
      stock: 90,
      price: 180,
      category: 'Caps',
      size: ['S', 'M', 'L', 'XL'],
      productImage: [
        { imageUrl: 'https://www.orbisjkt.com/cdn/shop/files/1_d7b38957-8123-4605-a195-592e7b7533a7_600x.jpg?v=1730288483' }
      ]
    },
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
