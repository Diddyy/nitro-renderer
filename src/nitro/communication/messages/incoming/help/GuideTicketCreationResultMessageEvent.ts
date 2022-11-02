import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { GuideTicketCreationResultMessageParser } from '../../parser';

export class GuideTicketCreationResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideTicketCreationResultMessageParser);
    }

    public getParser(): GuideTicketCreationResultMessageParser
    {
        return this.parser as GuideTicketCreationResultMessageParser;
    }
}
