import { useUser } from '../../../../providers/userContext'
import './styles.scss'

export default function CropPhoto() {

    const { photoInfos, setPhotoInfos } = useUser()

    const handleZoom = (e) => {
        setPhotoInfos(prev => ({ ...prev, zoom: Number(e.target.value) }))
    }

    const handleBrightness = (e) => {
        setPhotoInfos(prev => ({ ...prev, brightness: Number(e.target.value) }))
    }

    return (
        <div className="crop-controls w100 vertical g1 ai-center">
            <div className="field-group">
                <label htmlFor="zoomrange" className="label">Zoom</label>
                <input
                    className="range"
                    type="range"
                    name="zoomrange"
                    id="zoomrange"
                    min="1"
                    max="10"
                    step="0.01"
                    value={photoInfos.zoom}
                    onChange={handleZoom}
                />
            </div>

            <div className="field-group">
                <label htmlFor="brightnessrange" className="label">Brilho</label>
                <input
                    className="range"
                    type="range"
                    name="brightnessrange"
                    id="brightnessrange"
                    min="50"
                    max="150"
                    step="1"
                    value={photoInfos.brightness}
                    onChange={handleBrightness}
                />
            </div>

            <p className="form-subtitle">
                Ajuste o brilho e o zoom da sua foto
            </p>
        </div>
    )
}