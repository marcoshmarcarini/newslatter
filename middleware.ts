import { NextResponse } from "next/server"

export function middleware(req: any) {
    const url = req.nextUrl.clone()
    console.log(url)

    const isAuthenticated = false

    if (!isAuthenticated) {
        url.pathname = '/publish-posts'
        return NextResponse.redirect(url)
    }


    return NextResponse.next()

}

export const config = {
    matcher: [
        '/publish-posts/path:*',
    ]
}