"use client"

import { useEffect, useState } from "react"
import { Modal } from "@/components/modal"
import { FormFields } from "./form-fields"
import { PlusIcon } from "@heroicons/react/24/outline"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { ui } from "./ui"

type IProps = {
  certTypes: ICertType[]
  getCertFromApi: () => void
  setEditCert: (cert?: ICertificate) => void
  editCert?: ICertificate
}

export function Form(props: IProps) {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { certTypes, getCertFromApi, editCert, setEditCert } = props

  const closeModal = () => {
    setOpenModal(false)
    setEditCert(undefined)
  }

  useEffect(() => {
    if (editCert?.id) {
      setOpenModal(true)
    }
  }, [editCert])

  return (
    <div style={ui.toolbar}>
      <button
        style={ui.addButton}
        type="button"
        onClick={() => setOpenModal(true)}
      >
        <PlusIcon style={ui.icon} /> Add
      </button>

      {openModal ? (
        <Modal
          openModal={openModal}
          setOpenModal={closeModal}
          title={editCert?.id ? "Edit Certificate" : "Certificate Form"}
        >
          <FormFields
            {...{ certTypes, getCertFromApi, editCert, setEditCert }}
            closeModal={closeModal}
          />
        </Modal>
      ) : null}
    </div>
  )
}
