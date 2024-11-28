import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const secret_key = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
export const middleware = (req: NextRequest, res: NextResponse) => {
    const roleUser = req.cookies.get('_roled')?.value
    const tokenUser = req.cookies.get('_toksis')?.value
    const pathname = req.nextUrl.pathname

    let role = ''
    if (roleUser) {
        role = CryptoJS.AES.decrypt(roleUser, secret_key).toString(CryptoJS.enc.Utf8)
    }

    if ((role == 'ADMIN' || role == 'USER') && tokenUser && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (role != 'ADMIN' && tokenUser && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!tokenUser && !roleUser && pathname.startsWith('/cart')) {
        return NextResponse.redirect(new URL('/login',  req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/register', '/dashboard', '/cart'],
};