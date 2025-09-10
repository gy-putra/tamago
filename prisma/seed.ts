import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create sample products
const products = [
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with excellent cushioning",
    price: 150000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 25,
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Premium running shoes with boost technology",
    price: 180000,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 30,
  },
  {
    name: "Converse Chuck Taylor",
    description: "Classic canvas sneakers for everyday wear",
    price: 655000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 40,
  },
  {
    name: "Vans Old Skool",
    description: "Iconic skate shoes with durable construction",
    price: 700000,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 35,
  },
  {
    name: "New Balance 990v5",
    description: "Made in USA premium lifestyle sneakers",
    price: 185000,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 20,
  }
]

  console.log('Start seeding...')
  
  for (const product of products) {
    const result = await prisma.product.create({
      data: product,
    })
    console.log(`Created product with id: ${result.id}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })