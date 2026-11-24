import { NextResponse, type NextRequest } from 'next/server'

/** Redirect the bare domain to www in production (as the Express app did). */
export function proxy(request: NextRequest) {
    const host = request.headers.get('host') ?? ''
    if (process.env.NODE_ENV === 'production' && !/^www/.test(host)) {
        const { pathname, search } = request.nextUrl
        const target = `https://www.${host}${pathname}${search}`
        // e.g. bots calling the server by IP ("www.1.2.3.4" is no valid host)
        if (URL.canParse(target)) return NextResponse.redirect(target, 301)
    }
    return NextResponse.next()
}
