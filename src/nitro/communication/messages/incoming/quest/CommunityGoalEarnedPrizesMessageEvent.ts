import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CommunityGoalEarnedPrizesMessageParser } from '../../parser/quest/CommunityGoalEarnedPrizesMessageParser';

export class CommunityGoalEarnedPrizesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityGoalEarnedPrizesMessageParser);
    }

    public getParser(): CommunityGoalEarnedPrizesMessageParser
    {
        return this.parser as CommunityGoalEarnedPrizesMessageParser;
    }
}
