const foo: any[] = []
const bar = foo[0]?.textContent?.match(/[0-9]+/g)
console.log(bar)
type Base64String = string;

// 验证字符串是否为有效的Base64格式
function isValidBase64(str: Base64String): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch (e) {
    return false;
  }
}

// Base64编码
function encodeBase64(str: string): Base64String {
  return btoa(str);
}

// Base64解码
function decodeBase64(base64Str: Base64String): string {
  return atob(base64Str);
}

const testBool = false
if( 
  testBool
) {
  console.log('true')
} else {
  console.log('false')
}

const mapArr: any = null
const mapArr2 = mapArr?.map((item: any) => {
  return {
    a:item.a
  }
})
console.log(mapArr2)
