import { IMessageEvent, MessageEvent } from '../../../../../core';
import { MarketplaceOwnOffersParser } from '../../parser';

export class MarketplaceOwnOffersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceOwnOffersParser);
    }

    public getParser(): MarketplaceOwnOffersParser
    {
        return this.parser as MarketplaceOwnOffersParser;
    }
}
