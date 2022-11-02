import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { NoSuchFlatParser } from '../../parser';

export class NoSuchFlatEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NoSuchFlatParser);
    }

    public getParser(): NoSuchFlatParser
    {
        return this.parser as NoSuchFlatParser;
    }
}
