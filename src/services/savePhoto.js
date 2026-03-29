// utils/savePhoto.js
import { useUser } from "../providers/userContext";
import instance from "./instance";

function createImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', () => reject(new Error('Erro ao carregar imagem')));
        img.src = typeof url === 'string' ? url : URL.createObjectURL(url);
    });
}

const getCroppedBlob = async (imageSrc, croppedAreaPixels) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
        image,
        croppedAreaPixels.x, croppedAreaPixels.y,
        croppedAreaPixels.width, croppedAreaPixels.height,
        0, 0,
        croppedAreaPixels.width, croppedAreaPixels.height,
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => blob ? resolve(blob) : reject(new Error('Canvas vazio')),
            'image/jpeg',
            0.95
        );
    });
}

export function useSavePhoto() {
    const { photoInfos, listUser } = useUser();

    return async () => {
        try {

            const blob = await getCroppedBlob(photoInfos.imageForCrop, photoInfos.croppedAreaPixels);

            const fd = new FormData();

            fd.append("avatar", blob, "avatar.jpg");

            await instance.put("/user/avatar", fd);

            listUser()
        } catch (err) {
            // showError(err);
        }
    };
}