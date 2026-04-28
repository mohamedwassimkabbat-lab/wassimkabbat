import { Select } from "../parts/select"
import { IState } from "@/types/shared-t"
import { toSelArr } from "@/utils/form/select-helper"
import { TextField } from "../parts/text-field"
import { SubmitButton } from "@/components/parts/submit-button"
import { useActionState, useEffect, useRef } from "react"
import { createCertificates } from "@/actions/certificates"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { useBoundStore, useShallow } from "@/store/store-provider"
import { ui } from "./ui"

const initialState: IState = {
  message: "",
  errors: undefined,
  isSaved: false,
}

type IProps = {
  certTypes: ICertType[]
  getCertFromApi: () => void
  setEditCert: (cert?: ICertificate) => void
  editCert?: ICertificate
  closeModal: () => void
}

export function FormFields(props: IProps) {
  const ref = useRef<HTMLFormElement>(null)

  const { certTypes, getCertFromApi, editCert, setEditCert, closeModal } = props

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    })),
  )

  const [state, formAction] = useActionState<IState, FormData>(
    createCertificates,
    initialState,
  )

  const selProps = {
    label: "Certificate Title",
    name: "typeId",
    isRequired: true,
    defaultValue: editCert?.typeId,
    error: state?.errors?.typeId && state?.errors?.typeId.join(" | "),
  }

  useEffect(() => {
    if (state.isSaved) {
      setMessage(state?.message ?? "")
      getCertFromApi()
      closeModal()
    }
  }, [closeModal, getCertFromApi, setMessage, state])

  const handleAction = (data: FormData) => {
    formAction(data)
    ref.current?.reset()
    if (data.has("id")) {
      setEditCert(undefined)
    }
  }

  return (
    <form ref={ref} action={handleAction} style={ui.form}>
      <div style={ui.fieldRow}>
        <Select
          options={toSelArr<ICertType>(certTypes, "title")}
          selProps={selProps}
        />
      </div>

      <div style={ui.fieldRow}>
        <TextField
          label="Note"
          name="company"
          isRequired={true}
          defaultValue={editCert?.company}
          errors={state?.errors?.company}
        />
      </div>

      {editCert?.id && <input type="hidden" name="id" value={editCert.id} />}

      <div
        style={{
          ...ui.message,
          ...(state?.errors
            ? ui.messageError
            : state?.message
              ? ui.messageSuccess
              : {}),
        }}
      >
        {state?.message}
      </div>

      <div style={ui.submitRow}>
        <SubmitButton name={editCert?.id ? "Save" : "Add"} />
      </div>
    </form>
  )
}
