import { type Request, type Response, type NextFunction } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { AssetService } from '../services/asset.service';
import { toAssetResponse, toCreateAssetInput } from '../mappers/asset.mapper';
import { CreateAssetDto } from '../dtos/asset.dto';
import { AppError } from '../utils/application.error';
import { app } from '../app';

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
            logger.debug('Controller: Error fetching assets');
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while retrieving assets', httpStatus.INTERNAL_SERVER_ERROR, {originalError: appError});
            }
            next(appError);
        }
    }

    async getAssetById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const assetId = req.params.id;
        logger.debug(`Controller: Received request to get asset by ID: ${assetId}`);
        try {
            const asset = await this.assetService.getAssetById(assetId);
            if (!asset) {
                res.status(httpStatus.NOT_FOUND).send({ error: 'Asset not found' });
                return;
            }
            const data = toAssetResponse(asset);

            const response = {
                message: 'Asset retrieved successfully',
                data,
            };
            res.send(response);
        } catch (error) {
            let appError = error as unknown;
            logger.debug(`Controller: Error fetching asset by id: ${assetId}`);
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while retrieving asset', httpStatus.INTERNAL_SERVER_ERROR, {id: req.params.id, originalError: appError});
            }
            next(appError);
        }
    }
}