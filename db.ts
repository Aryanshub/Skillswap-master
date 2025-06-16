import { PrismaClient } from "./app/generated/prisma"
//singleton function

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: PrismaClient | undefined

}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma