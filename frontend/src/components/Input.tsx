
interface InputProps {
    id: string
    label: string
    type: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ id, label, type, placeholder, value, onChange } : InputProps) => {
  return (
    <div className="card-input">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export default Input