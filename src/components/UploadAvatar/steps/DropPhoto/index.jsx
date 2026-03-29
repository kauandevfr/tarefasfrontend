import { useRef } from 'react';
import './styles.scss'
import { useUser } from '../../../../providers/userContext';

export default function DropPhoto() {
    const fileRef = useRef();

    const { setPhotoInfos, photoInfos } = useUser()

    const MAX_SIZE_MB = 3;

    const ACCEPTED_TYPES = /^image\/(png|jpe?g|webp)$/i;

    const onSelectPhoto = async (e) => {
        const f = e.target.files?.[0];
        if (!f) return;

        if (!ACCEPTED_TYPES.test(f.type)) {
            // return setAlertModal({ open: true, tag: "error", message: "A foto de perfil deve ser PNG, JPG ou WEBP." });
        }

        if (f.size > MAX_SIZE_MB * 1024 * 1024) {
            // return setAlertModal({ open: true, tag: "error", message: `A foto de perfil não pode ultrapassar ${MAX_SIZE_MB} MB.` });
        }

        setPhotoInfos(prev => ({
            ...prev,
            fileRaw: f,
            imageForCrop: URL.createObjectURL(f),
            crop: { x: 0, y: 0 },
            zoom: 1,
            name: f.name,
        }));

    };

    const hasFile = Boolean(photoInfos.imageForCrop);

    return (
        <div className="container-drop-photo w100">
            <div className={`drop-zone center g2 ${hasFile && 'selected'}`}>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={onSelectPhoto}
                    ref={fileRef}
                />

                <svg className="drop-zone-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z" fill="rgb(var(--yellow-800))" />
                    <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="rgb(var(--yellow-800))" />
                </svg>

                <div className="vertical ai-center g1">

                    {hasFile ? <span className="text-sm text-white">Arquivo selecionado: {photoInfos.name}</span> :
                        <>
                            <span className="text-sm text-white">Arraste a sua foto aqui</span>
                            <span className="text-sm text-gray-300">JPG, PNG ou WebP · Máx. 5MB</span>
                        </>
                    }

                    <span className="button hover-yellow text-sm">
                        {hasFile ? 'Trocar arquivo' : (
                            <>
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M20 11.08V8l-6-6H6a2 2 0 00-2 2v16c0 1.1.9 2 2 2h6" />
                                    <path d="M14 3v5h5M18 21v-6M15 18h6" />
                                </svg>
                                Escolher arquivo
                            </>
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}