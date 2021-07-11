const fs = require('fs')

export const readFile = async (filePath: string): Promise<string> => {
  if (!fs.existsSync(filePath)) { //判断是否存在该文件
    return ''
  }
  try {
    let result = fs.readFileSync(filePath)
    return result.toString()
  } catch (error) {
    throw error
  }
}


export const writeFile = (filePath: string, text: string) => {
  fs.writeFile(filePath, text, (error: any) => { 
    if (error) throw error
  })
}