import { Check, X } from "lucide-react"
import { useEffect, useState } from "react"

interface AlertProps {
  message: string
  trigger: number
  type: "success" | "error"
}

export const Alert = ({ message, trigger, type }: AlertProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!trigger) return

    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 5000)

    return () => clearTimeout(timer)
  }, [trigger])

  if (!visible) return null

  return (
    <section className="alert">
        <div className={`card-alert ${type === "success" ? "text-green-500" : "text-red-500"}`}>
            <span>
                {type === "success" ? <Check size={22} /> : <X size={22} />}
            </span>
        <p>{message}</p>
        </div>
    </section>
  )
}
