﻿import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingOtherNotAllowedParser } from '../../../parser/inventory/trading/TradingOtherNotAllowedParser';

export class TradingOtherNotAllowedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingOtherNotAllowedParser);
    }

    public getParser(): TradingOtherNotAllowedParser
    {
        return this.parser as TradingOtherNotAllowedParser;
    }
}
