import { Router } from 'express';
import { AssetController } from '../controllers/asset.controller';
import { createAssetSchema, assetIdSchema } from '../validators/asset.validator';
import { validate, ValidationSource } from '../middlewares/validate.middleware';


const assetController = new AssetController();
export const assetRouter = Router();

assetRouter.get('/', assetController.getAllAssets);
assetRouter.get(
  '/:id',
  validate(assetIdSchema, ValidationSource.PARAMS),
  assetController.getAssetById
);

assetRouter.post(
  '/',
  validate(createAssetSchema, ValidationSource.BODY),
  assetController.createAsset
);

assetRouter.patch(
  '/:id',
  validate(assetIdSchema, ValidationSource.PARAMS),
  validate(createAssetSchema, ValidationSource.BODY),
  assetController.refreshLastAssetPrice
);