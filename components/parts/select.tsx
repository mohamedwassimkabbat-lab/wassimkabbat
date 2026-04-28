import { IOption } from "@/types/form-t"
import { useEffect, useState } from "react"
import { ui } from "@/components/certificates/ui"

type IProps = {
  options: IOption[]
  selProps: {
    name: string
    label: string
    isRequired: boolean
    defaultValue?: string
    error?: string
  }
}

export function Select(props: IProps) {
  const { options, selProps } = props

  const [value, setValue] = useState<string | undefined>(selProps.defaultValue)

  useEffect(() => {
    setValue(selProps.defaultValue)
  }, [selProps])

  return (
    <>
      <label
        htmlFor={selProps.name}
        style={ui.fieldLabel}
      >
        {selProps.label}
      </label>

      <select
        style={ui.fieldControl}
        id={selProps.name}
        name={selProps.name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={selProps.isRequired}
      >
        <option></option>
        {options.map((i) => (
          <option key={i.id} value={i.id}>
            {i.title}
          </option>
        ))}
      </select>

      {selProps?.error && (
        <div style={ui.fieldError}>
          {selProps.error}
        </div>
      )}
    </>
  )
}
