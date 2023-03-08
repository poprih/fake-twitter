import path from "path";
import fs from 'fs'

const DBPATH = process.env.NODE_ENV === 'development' ? path.join(process.cwd(), 'db') : '/tmp/';

export async function getData(relativePath: string) {
  const jsonData = await fs.readFileSync(DBPATH + relativePath, 'utf-8')
  return JSON.parse(jsonData)
}

export async function setData(relativePath: string, data: object) {
  await fs.writeFileSync(DBPATH + relativePath, JSON.stringify(data))
}