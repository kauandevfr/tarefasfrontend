import './styles.scss'

export default function Checkbox({ id, checked, onChange }) {
    return (
        <label className="checkbox"
        //  htmlFor={id}
        >
            <input
                type="checkbox"
                // id={id}
                checked={checked}
                onChange={onChange}
                hidden
            />
            <span className="checkbox-box" />
        </label>
    )
}