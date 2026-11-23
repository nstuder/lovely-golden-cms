import { NextResponse, type NextRequest } from 'next/server'

/** Redirect the bare domain to www in production (as the Express app did). */
export function proxy(request: NextRequest) {
    const host = request.headers.get('host') ?? ''
    if (process.env.NODE_ENV === 'production' && !/^www/.test(host)) {
        const { pathname, search } = request.nextUrl
        return NextResponse.redirect(
            `https://www.${host}${pathname}${search}`,
            301
        )
    }
    return NextResponse.next()
}
