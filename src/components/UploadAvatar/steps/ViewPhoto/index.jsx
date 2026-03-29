import { useCallback } from "react";
import Cropper from "react-easy-crop";
import './styles.scss';
import { useUser } from "../../../../providers/userContext";

export default function ViewPhoto() {
    const { photoInfos, setPhotoInfos, photoSteps } = useUser();

    const onCropChange = useCallback((crop) => {
        setPhotoInfos(prev => ({ ...prev, crop }));
    }, [setPhotoInfos]);

    const onZoomChange = useCallback((zoom) => {
        setPhotoInfos(prev => ({ ...prev, zoom }));
    }, [setPhotoInfos]);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setPhotoInfos(prev => ({ ...prev, croppedAreaPixels }));
    }, [setPhotoInfos]);

    return (
        <div className="crop-container">
            <Cropper
                image={photoInfos.imageForCrop}
                crop={photoInfos.crop}
                zoom={photoInfos.zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                cropSize={{ width: 260, height: 260 }}
                onCropChange={photoSteps === 'crop' ? onCropChange : () => { }}
                onZoomChange={photoSteps === 'crop' ? onZoomChange : () => { }}
                onCropComplete={onCropComplete}
                style={{
                    containerStyle: {
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: photoSteps !== 'crop' ? '50%' : '20%',
                        overflow: 'hidden',
                        pointerEvents: photoSteps !== 'crop' ? 'none' : 'auto',
                    },
                    mediaStyle: {
                        filter: `brightness(${photoInfos.brightness}%)`,
                        transition: 'filter .2s',
                    },
                    cropAreaStyle: {
                        borderRadius: `${photoSteps !== 'crop' ? '50%' : '20%'}`,
                        boxShadow: '0 0 0 9999px rgba(23, 23, 23, 0.7)',
                        border: '3px solid rgba(var(--yellow-800))'
                    },
                }}
            />
        </div>
    );
}