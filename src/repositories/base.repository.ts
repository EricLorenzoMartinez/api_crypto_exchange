import { Document, Model, Types } from 'mongoose';
import logger from '../config/logger';

/**
 * Common base repository for all entities, providing basic CRUD operations.
 */
export abstract class BaseRepository<T, TModel extends Document> {
    // Variables
    protected model: Model<TModel>;
    protected entityName: string;

    /**
     * Constructor
     * @param model 
     * @param entityName 
     */
    constructor(model: Model<TModel>, entityName: string) {
        this.model = model;
        this.entityName = entityName;
    }

    /**
     * Transform Mongoose doc to plain object with 'id' instead of '_id'
     */
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
    ) {
        logger.debug(
            `Repository: Finding ${this.entityName} with filters: ${JSON.stringify(
                filters
            )} and pagination: ${JSON.stringify(pagination)}`
        );
        const docs = await this.model.find(filters, {}, pagination);
        logger.debug(`Repository: Found ${docs.length} ${this.entityName}`);
        return docs.map((doc) => this.transformId(doc));
    }
}