export const prerender = false

import type { APIRoute } from 'astro'

/**
 * The newsletter was retired. Unsubscribe links in previously sent emails
 * land on the confirmation page; nothing else happens.
 */
export const GET: APIRoute = ({ redirect }) => redirect('/unsubscribed/', 301)
