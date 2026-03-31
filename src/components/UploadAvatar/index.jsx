import { useGlobal } from "../../providers/globalContext";
import { useUser } from "../../providers/userContext";
import { useSavePhoto } from "../../services/savePhoto";
import ModalBase from "../ModalBase";
import CropPhoto from "./steps/CropPhoto";
import DropPhoto from "./steps/DropPhoto";
import ViewPhoto from "./steps/ViewPhoto";
import './styles.scss'

export default function UploadAvatar() {

    const { photoSteps, setPhotoSteps, photoInfos, setPhotoInfos, initialPhotoInfos } = useUser()

    const { setAlertInfos } = useGlobal()

    const handleSave = useSavePhoto();

    const STEPS = ['select', 'crop', 'preview'];

    const currentIndex = STEPS.indexOf(photoSteps);

    const handleNext = () => {
        const next = STEPS[currentIndex + 1];
        if (next) setPhotoSteps(next);
    };

    const handleBack = () => {
        const prev = STEPS[currentIndex - 1];
        if (prev) setPhotoSteps(prev);
    };

    const closeModal = () => {
        setPhotoSteps('')
        setPhotoInfos(initialPhotoInfos)
    }

    const saveAndClose = () => {
        handleSave()
        closeModal()

        setAlertInfos({ open: true, message: 'Foto de perfil atualizada com sucesso!', type: 'success' })
    }

    return (
        <ModalBase
            title='Alterar foto'
            onClose={closeModal}
            isOpen={photoSteps !== ''}

        >
            <div className="horizontal g1 ai-start w100">
                {STEPS.map(step => (
                    <div
                        key={step}
                        className={`step-dot ${photoSteps === step ? 'active' : ''}`}
                    />
                ))}

            </div>

            {photoSteps !== 'select' && <ViewPhoto />}
            {photoSteps === "select" && <DropPhoto />}
            {photoSteps === "crop" && <CropPhoto />}

            {photoSteps === 'preview' &&
                <div className="preview-profile vertical g1 ai-center">
                    <h1 className="form-title">Kauan Rodrigues Oliveira</h1>
                    <h1 className="form-subtitle">kauanrdx145@gmail.com</h1>
                    <p className="form-subtitle">
                        Sua foto de perfil ficará assim
                    </p>
                </div>
            }

            <div className="upload-navigation horizontal w100 g1 jc-end">
                {photoSteps !== 'select' && (
                    <button className="button secondary hover-yellow" type="button"
                        onClick={handleBack}
                    >
                        Voltar
                    </button>
                )}
                <div className="w100" />
                <button className="button secondary hover-red" type="button"
                    onClick={closeModal}
                >
                    Cancelar
                </button>
                {photoSteps !== 'preview' && (
                    <button className="button" type="button"
                        disabled={!photoInfos.imageForCrop} onClick={handleNext}
                    >
                        Continuar
                    </button>
                )}
                {photoSteps === 'preview' && (
                    <button className="button" type="button"
                        onClick={saveAndClose}
                    >
                        Salvar
                    </button>
                )}
            </div>
        </ModalBase>
    )
}