import * as migration_20261123_000000_relationships_v2_v3 from './20261123_000000_relationships_v2_v3'

export const migrations = [
    {
        up: migration_20261123_000000_relationships_v2_v3.up,
        down: migration_20261123_000000_relationships_v2_v3.down,
        name: '20261123_000000_relationships_v2_v3',
    },
]
