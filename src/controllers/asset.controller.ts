import { type Request, type Response, type NextFunction } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { AssetService } from '../services/asset.service';
import { toAssetResponse, toCreateAssetInput } from '../mappers/asset.mapper';
import { CreateAssetDto } from '../dtos/asset.dto';
import { AppError } from '../utils/application.error';

export class AssetController {
    private assetService: AssetService;

    constructor() {
        this.assetService = new AssetService();
    }

    async getAllAssets(req: Request, res: Response, next: NextFunction): Promise<void> {
        logger.debug(`Controller: Received request to get all assets with query: ${JSON.stringify(req.query)}`);
        try {
            const { skip = 0, limit = 0 } = req.query;
            const pagination = {
                skip: parseInt(skip as string, 10),
                limit: parseInt(limit as string, 10),
            };
            const assets = await this.assetService.getAllAssets(pagination);
            const data = assets.map(toAssetResponse);
            const response = {
                message: 'Assets retrieved successfully',
                length: data.length,
                data,
            };
            res.send(response);
        } catch (error) {
            let appError = error as unknown;
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while retrieving assets', httpStatus.INTERNAL_SERVER_ERROR);
            }
            next(appError);
        }
    }
}