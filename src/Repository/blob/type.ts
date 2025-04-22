import { IBlobRepository } from "./blobRepository"
import { IBlobMapperRepository } from "./implementations"

export type BLOB_REPOSITORY = {
    blobMapperRepositoryDI: IBlobMapperRepository,
    blobRepositoryDI: IBlobRepository
}