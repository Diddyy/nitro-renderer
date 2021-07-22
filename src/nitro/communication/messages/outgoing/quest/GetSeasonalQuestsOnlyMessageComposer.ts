import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GetSeasonalQuestsOnlyMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetSeasonalQuestsOnlyMessageComposer>>
{
  private _data: ConstructorParameters<typeof GetSeasonalQuestsOnlyMessageComposer>;

  constructor()
  {
      this._data = [];
  }

  public getMessageArray()
  {
      return this._data;
  }

  public dispose(): void
  {
      return;
  }
}
