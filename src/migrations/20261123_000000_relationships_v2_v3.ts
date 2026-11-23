import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'
import { migrateRelationshipsV2_V3 } from '@payloadcms/db-mongodb/migration-utils'

/**
 * OPTIONAL one-time migration (official Payload v2 -> v3 helper).
 *
 * Payload 2 stored relationship/upload IDs as strings, Payload 3 stores them
 * as ObjectIds. The website reads (populates) both formats fine, so this is
 * NOT required to run the site. It only converts the stored IDs so that
 * filtering by relationship fields (e.g. in the admin list view) works for
 * old documents too.
 *
 * Run manually after a backup (./backup.sh):  npm run payload migrate
 */
export async function up({ req }: MigrateUpArgs): Promise<void> {
    await migrateRelationshipsV2_V3({
        batchSize: 100,
        req,
    })
}

export async function down(_args: MigrateDownArgs): Promise<void> {
    // Not reversible: the converted IDs stay valid for Payload 3.
}
