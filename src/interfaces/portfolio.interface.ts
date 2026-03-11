export interface IPortfolioAsset {
    id: string;
    symbol: string;
    name: string;
}

export interface IPortfolioItem {
    asset: IPortfolioAsset;
    netQuantity: number;
    currentPriceUsd: number;
    currentValueUsd: number;
}