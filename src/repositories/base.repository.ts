import { Document, Model, Types } from 'mongoose';
import logger from '../config/logger';

export abstract class BaseRepository<T, TModel extends Document> {
    protected model: Model<TModel>;
    protected entityName: string;

    constructor(model: Model<TModel>, entityName: string) {
        this.model = model;
        this.entityName = entityName;
    }

    protected transformId(doc: TModel): T {
        const startObj = doc.toObject() as Record<string, unknown> & { _id: Types.ObjectId };

        const { _id, ...rest } = startObj;

        return {
            id: _id.toString(),
            ...rest,
        } as unknown as T;
    }

    async getAll(
        filters: Record<string, unknown> = {},
        pagination: { skip: number; limit: number } = { skip: 0, limit: 0 }
    ): Promise<T[]> {
        logger.debug(`Repository: Finding ${this.entityName} with filters: ${JSON.stringify(filters)} and pagination: ${JSON.stringify(pagination)}`);
        const docs = await this.model.find(filters, {}, pagination);
        logger.debug(`Repository: Found ${docs.length} ${this.entityName}`);
        return docs.map((doc) => this.transformId(doc));
    }


    async getById(id: string): Promise<T | null> {
        logger.debug(`Repository: Finding ${this.entityName} by id: ${id}`);
        const doc = await this.model.findById(id);
        if (!doc) {
            logger.debug(`Repository: No ${this.entityName} found with id: ${id}`);
            return null;
        }
        logger.debug(`Repository: Found ${this.entityName} with id: ${id}`);
        return this.transformId(doc);
    }

    async create(data: Partial<TModel>): Promise<T | null> {
        logger.debug(`Repository: Creating ${this.entityName} with data: ${JSON.stringify(data)}`);
        const doc = await this.model.create(data);
        if (!doc) {
            logger.debug(`Repository: Failed to create ${this.entityName}`);
            return null;
        }
        logger.debug(`Repository: Created ${this.entityName} with id: ${doc._id}`);
        return this.transformId(doc);
    }

    async update(id: string, data: Partial<TModel>): Promise<T | null> {
        logger.debug(`Repository: Updating ${this.entityName} with id: ${id} and data: ${JSON.stringify(data)}`);
        const doc = await this.model.findByIdAndUpdate(id, data, { new: true });
        if (!doc) {
            logger.debug(`Repository: No ${this.entityName} found with id: ${id}`);
            return null;
        }
        logger.debug(`Repository: Updated ${this.entityName} with id: ${id}`);
        return this.transformId(doc);
    }
}