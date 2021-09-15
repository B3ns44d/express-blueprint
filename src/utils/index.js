import fs from 'fs'
import path from 'path'

export const resolvePath = (pathname) => {
  const __dirname = path.resolve()
  pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '')
  const directoryPath = path.resolve(__dirname, pathname)
  return directoryPath
}

export const createDirectories = (pathname, recursive) => {
  const directoryPath = resolvePath(pathname)
  fs.mkdirSync(directoryPath, { recursive }, (e) => {
    if (e) {
      return throwError(e)
    }
    return true
  })
}

export const isThisDirectoryExist = (pathname) => {
  const directoryPath = resolvePath(pathname)
  return fs.existsSync(directoryPath)
}

export const createFile = (pathname, data) => {
  const filePath = resolvePath(pathname)
  fs.writeFileSync(filePath, data, (e) => {
    if (e) {
      return throwError(e)
    }
    return true
  })
}
