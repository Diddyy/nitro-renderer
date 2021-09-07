﻿import { Graphics } from '@pixi/graphics';
import { Point } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { TilingSprite } from '@pixi/sprite-tiling';
import { NitroSprite } from '../../../../../../../core';
import { IGraphicAsset } from '../../../../../../../room/object/visualization/utils/IGraphicAsset';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { PlaneTexture } from './PlaneTexture';

export class PlaneMaterialCell
{
    private _cachedBitmapData: Graphics;
    private _texture: PlaneTexture;
    private _extraItemOffsets: Point[];
    private _extraItemAssets: IGraphicAsset[];
    private _extraItemCount: number = 0;

    constructor(texture: PlaneTexture, assets: IGraphicAsset[] = null, offsetPoints: Point[] = null, limit: number = 0)
    {
        this._cachedBitmapData  = null;
        this._texture           = texture;
        this._extraItemOffsets  = [];
        this._extraItemAssets   = [];
        this._extraItemCount    = 0;

        if(assets && assets.length && (limit > 0))
        {
            let assetIndex = 0;

            while(assetIndex < assets.length)
            {
                const graphic = assets[assetIndex];

                if(graphic) this._extraItemAssets.push(graphic);

                assetIndex++;
            }

            if(this._extraItemAssets.length)
            {
                if(offsetPoints)
                {
                    let pointIndex = 0;

                    while(pointIndex < offsetPoints.length)
                    {
                        const point = offsetPoints[pointIndex];

                        if(point) this._extraItemOffsets.push(new Point(point.x, point.y));

                        pointIndex++;
                    }
                }

                this._extraItemCount = limit;
            }
        }
    }

    public get isStatic(): boolean
    {
        return this._extraItemCount == 0;
    }

    public dispose(): void
    {
        if(this._texture)
        {
            this._texture.dispose();

            this._texture = null;
        }

        if(this._cachedBitmapData)
        {
            this._cachedBitmapData.destroy();

            this._cachedBitmapData = null;
        }

        this._extraItemAssets   = null;
        this._extraItemOffsets  = null;
        this._extraItemCount    = 0;
    }

    public clearCache(): void
    {
        if(this._cachedBitmapData)
        {
            this._cachedBitmapData.destroy();

            this._cachedBitmapData = null;
        }
    }

    public getHeight(normal: IVector3D): number
    {
        if(this._texture)
        {
            const texture = this._texture.getBitmap(normal);

            if(texture) return texture.height;
        }

        return 0;
    }

    public render(normal: IVector3D, textureOffsetX: number, textureOffsetY: number): Sprite
    {
        if(!this._texture) return null;

        const texture = this._texture.getBitmap(normal);

        if(!texture) return null;

        let bitmap: Sprite = null;

        if((textureOffsetX !== 0) || (textureOffsetY !== 0))
        {
            while(textureOffsetX < 0) textureOffsetX += texture.width;

            while(textureOffsetY < 0) textureOffsetY += texture.height;

            const tiling = new TilingSprite(texture, texture.width, texture.height);

            tiling.tilePosition.x = (textureOffsetX % texture.width);
            tiling.tilePosition.y = (textureOffsetY % texture.height);

            tiling.uvRespectAnchor = true;

            if(textureOffsetX)
            {
                tiling.anchor.x = 1;
                tiling.scale.x  = -1;
            }

            if(textureOffsetY)
            {
                tiling.anchor.y = 1;
                tiling.scale.y  = -1;
            }

            bitmap = tiling;
        }
        else
        {
            bitmap = new NitroSprite(texture);
        }

        if(bitmap)
        {
            // if(!this.isStatic)
            // {
            //     if(this._cachedBitmapData)
            //     {
            //         if((this._cachedBitmapData.width !== bitmap.width) || (this._cachedBitmapData.height !== bitmap.height))
            //         {
            //             this._cachedBitmapData.destroy();

            //             this._cachedBitmapData = null;
            //         }
            //         else
            //         {
            //             const bitmapTexture = TextureUtils.generateTexture(bitmap, new Rectangle(0, 0, bitmap.width, bitmap.height));

            //             RoomVisualization.RENDER_TEXTURES.push(bitmapTexture);

            //             if(bitmapTexture)
            //             {
            //                 this._cachedBitmapData
            //                     .beginTextureFill({ texture: bitmapTexture })
            //                     .drawRect(0, 0, bitmapTexture.width, bitmapTexture.height)
            //                     .endFill();
            //             }
            //         }
            //     }

            //     if(!this._cachedBitmapData) this._cachedBitmapData = bitmap.clone();

            //     const limitMin      = Math.min(this._extraItemCount, this._extraItemOffsets.length);
            //     const limitMax      = Math.max(this._extraItemCount, this._extraItemOffsets.length);
            //     const offsetIndexes = Randomizer.getArray(this._extraItemCount, limitMax);

            //     let i = 0;

            //     while (i < limitMin)
            //     {
            //         const offset    = this._extraItemOffsets[offsetIndexes[i]];
            //         const item      = this._extraItemAssets[(i % this._extraItemAssets.length)];

            //         if(offset && item)
            //         {
            //             const assetTexture = item.texture;

            //             if(assetTexture)
            //             {
            //                 const offsetFinal   = new Point((offset.x + item.offsetX), (offset.y + item.offsetY));
            //                 const flipMatrix    = new Matrix();

            //                 let x           = 1;
            //                 let y           = 1;
            //                 let translateX  = 0;
            //                 let translateY  = 0;

            //                 if(item.flipH)
            //                 {
            //                     x           = -1;
            //                     translateX  = assetTexture.width;
            //                 }

            //                 if(item.flipV)
            //                 {
            //                     y           = -1;
            //                     translateY  = assetTexture.height;
            //                 }

            //                 let offsetX = (offsetFinal.x + translateX);
            //                 offsetX = ((offsetX >> 1) << 1);

            //                 flipMatrix.scale(x, y);
            //                 flipMatrix.translate(offsetX, (offsetFinal.y + translateY));

            //                 this._cachedBitmapData
            //                     .beginTextureFill({ texture: assetTexture, matrix: flipMatrix })
            //                     .drawRect(flipMatrix.tx, flipMatrix.ty, assetTexture.width, assetTexture.height)
            //                     .endFill();
            //             }
            //         }

            //         i++;
            //     }

            //     return this._cachedBitmapData;
            // }

            return bitmap;
        }

        return null;
    }

    public getAssetName(normal:IVector3D): string
    {
        return (this._texture == null) ? null : this._texture.getAssetName(normal);
    }
}
