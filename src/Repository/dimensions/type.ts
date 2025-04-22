import { IDimensionsProjectRepository } from "./dimensionsProjectRepository";
import { IDimensionsRepository } from "./dimensionsRepository";

export type DIMENSIONS_REPOSITORY = {
  dimensionsRepositoryDI: IDimensionsRepository;
  dimensionsProjectRepositoryDI: IDimensionsProjectRepository;
};