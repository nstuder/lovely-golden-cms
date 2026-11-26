import type { MongooseAdapter } from '@payloadcms/db-mongodb'
import { getClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/** Docker healthcheck: the website runs and reaches MongoDB. */
export async function GET() {
    try {
        const payload = await getClient()
        const { connection } = payload.db as unknown as MongooseAdapter
        await connection.db?.admin().ping()
        return Response.json({ ok: true })
    } catch {
        return Response.json({ ok: false }, { status: 503 })
    }
}
