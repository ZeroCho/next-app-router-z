export { auth as middleware } from "./auth"

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
}