import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

function exclude<T,K extends keyof T>(Schema: T, SkipKeys: K[]): Omit<T,K>{
    const newObj = { ...Schema };
    SkipKeys.forEach(key => delete newObj[key]);
    return newObj;
}

export  {prisma,exclude};