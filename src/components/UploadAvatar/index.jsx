import { useUser } from "../../providers/userContext";
import ModalBase from "../ModalBase";
import DropPhoto from "./steps/DropPhoto";
import './styles.scss'

export default function UploadAvatar() {

    const { photoSteps, setPhotoSteps } = useUser()

    const STEPS = ['select', 'crop', 'preview'];

    const currentIndex = STEPS.indexOf(photoSteps);

    const closeModal = () => {
        setPhotoSteps('')
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

            {photoSteps === "select" && <DropPhoto />}

            <div className="upload-navigation horizontal w100 g1 jc-end">
                {photoSteps !== 'select' && (
                    <button className="button secondary hover-yellow" type="button"
                    // onClick={handleBack}
                    >
                        Voltar
                    </button>
                )}
                <div className="w100" />
                <button className="button secondary hover-red" type="button"
                // onClick={handleCloseModal}
                >
                    Cancelar
                </button>
                {photoSteps !== 'preview' && (
                    <button className="button" type="button"
                    // disabled={!avatarState.imageForCrop} onClick={handleNext}
                    >
                        Continuar
                    </button>
                )}
                {photoSteps === 'preview' && (
                    <button className="button" type="button"
                    // onClick={handleSaveAvatar}
                    >
                        Salvar
                    </button>
                )}
            </div>
        </ModalBase>
    )
}