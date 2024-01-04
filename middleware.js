/* middleware for vercel edge */
import { next } from '@vercel/edge';

export const config = {matcher: '/api/:path*'}

export default async function middleware(req) {
	// for preflight requests
	if (req.method === 'OPTIONS') {
		return Response.json({}, {
			status: 200,
			headers: {
				'Access-Control-Allow-Headers': '*'
			}
		});
	}
}
