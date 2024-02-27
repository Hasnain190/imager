import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { CldImage } from 'next-cloudinary'
import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
export default function TransformedImage({
    image,
    type,
    title,
    isTransforming,
    setIsTransforming,
    transformationConfig,
    hasDownload = false

}: TransformedImageProps) {


    const downloadHandler = () => {

    }
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex-between">
                <h3 className='h3-bold text-dark-600'>Transformed</h3>
                {hasDownload && (
                    <Button
                        className='download-btn'
                        onClick={downloadHandler}
                    >
                        <Image
                            src="/assets/icons/download.svg"
                            alt="download"
                            width={24}
                            height={24}
                            className='pb-[6px]'
                        />
                    </Button>
                )}
            </div>

            {image?.publicId && transformationConfig ? (
                <div className='relative'>
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId}
                        alt={image?.title || 'transformed-image'}
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="transformed-image"
                        onLoad={() => { setIsTransforming && setIsTransforming(false) }}
                        onError={() => {
                            debounce(() => {
                                setIsTransforming && setIsTransforming(false)
                            }, 8000)
                        }}

                        {...transformationConfig}
                    />
                    {isTransforming && (
                        <div className="transformed-loader">
                            <Image
                                src="/assets/icons/spinner.svg"
                                width={50}
                                height={50}
                                alt='Transforming'
                            />
                        </div>
                    )}
                </div >
            ) : (
                <div className="transformed-placeholder">Transformed Image</div>
            )}

        </div>
    )
}
