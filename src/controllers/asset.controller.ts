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

    getAllAssets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    };

    getAssetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const assetId = req.params.id;
        logger.debug(`Controller: Received request to get asset by ID: ${assetId}`);
        try {
            const asset = await this.assetService.getAssetById(assetId);
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
    };

    createAsset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const body = req.body as CreateAssetDto;
        logger.debug(`Controller: Received request to create asset with body: ${JSON.stringify(body)}`);
        try {
            const assetToCreate = toCreateAssetInput(body);
            const asset = await this.assetService.createAsset(assetToCreate);
            const data = toAssetResponse(asset);
            const response = {
                message: 'Asset created successfully',
                data,
            };
            res.status(httpStatus.CREATED).send(response);

        } catch (error) {
            let appError = error as unknown;
            logger.debug(`Controller: Error creating asset`);
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while creating asset', httpStatus.INTERNAL_SERVER_ERROR, {body: req.body, originalError: appError});
            }
            next(appError);
        }
    };

    refreshLastAssetPrice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const assetId = req.params.id;
        logger.debug(`Controller: Received request to refresh last price for asset with ID: ${assetId}`);
        try {
            const updatedAsset = await this.assetService.refreshLastAssetPrice(assetId);
            const data = toAssetResponse(updatedAsset);
            const response = {
                message: 'Asset price refreshed successfully',
                data,
            };
            res.send(response);
        } catch (error) {
            let appError = error as unknown;
            logger.debug(`Controller: Error refreshing last price for asset with id: ${assetId}`);
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while refreshing asset price', httpStatus.INTERNAL_SERVER_ERROR, {id: req.params.id, originalError: appError});
            }
            next(appError);
        }
    };
}