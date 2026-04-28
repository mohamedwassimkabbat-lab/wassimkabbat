import { ui } from "@/components/certificates/ui"

type IProps = {
  label: string
  name: string
  isRequired: boolean
  type?: string
  defaultValue?: string
  errors?: string[]
}

export function TextField(props: IProps) {
  const { label, name, defaultValue, errors, isRequired, type } = props
  return (
    <>
      <label htmlFor={name} style={ui.fieldLabel}>
        {label}
      </label>
      <input
        style={ui.fieldControl}
        type={type || "text"}
        required={isRequired}
        id={name}
        name={name}
        defaultValue={defaultValue}
      />
      {errors ? (
        <div style={ui.fieldError}>
          {errors.join(" | ")}
        </div>
      ) : null}
    </>
  )
}
