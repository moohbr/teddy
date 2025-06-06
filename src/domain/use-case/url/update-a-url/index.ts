import { logger } from "@infrastructure/logger";
import { UpdateUrlUseCaseInterface } from "./interface";
import { UpdateUrlResponse } from "./response";
import { UpdateUrlRequest } from "./request";
import { URLRepositoryInterface } from "@domain/entities/url/repositories";

export class UpdateUrlUseCase implements UpdateUrlUseCaseInterface {
  constructor(
    private readonly urlRepository: URLRepositoryInterface,
  ) { }

  public async execute(
    request: UpdateUrlRequest,
  ): Promise<UpdateUrlResponse> {
    try {
      logger.info("Starting update url process");

      const url = await this.urlRepository.findByShortId(request.getShortId());
      if (!url) {
        return UpdateUrlResponse.failure("URL não encontrada");
      }

      if (!url.isOwner(request.getUserId())) {
        return UpdateUrlResponse.failure("URL não encontrada");
      }

      const updatedUrl = await this.urlRepository.updateByShortId(request.getShortId(), request.getOriginalUrl());
      if (updatedUrl) {
        return UpdateUrlResponse.success(url);
      }

      return UpdateUrlResponse.failure("Nenhuma URL encontrada");
    } catch (error) {
      logger.error("Error during update url", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): UpdateUrlResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return UpdateUrlResponse.failure("Houve um erro ao atualizar a URL", errors);
  }
}