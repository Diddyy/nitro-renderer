import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core';
import { YoutubeDisplayVideoMessageParser } from '../../../../parser';

export class YoutubeDisplayVideoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YoutubeDisplayVideoMessageParser);
    }

    public getParser(): YoutubeDisplayVideoMessageParser
    {
        return this.parser as YoutubeDisplayVideoMessageParser;
    }
}
