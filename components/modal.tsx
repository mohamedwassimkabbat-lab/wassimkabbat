"use client"

import { ReactNode } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { ui } from "@/components/certificates/ui"

type ISetOpenModal = {
  setOpenModal: (s: boolean) => void
}

type IProps = ISetOpenModal & {
  openModal: boolean
  title: string
  children: ReactNode
}

export function Modal(props: IProps) {
  const { title, openModal, setOpenModal, children } = props

  return openModal ? (
    <div
      style={ui.modalOverlay}
      onMouseDown={() => setOpenModal(false)}
    >
      <div
        style={ui.modalCard}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div style={ui.modalHeader}>
          <h3 style={ui.modalTitle}>{title}</h3>

          <button
            type="button"
            style={ui.modalClose}
            onClick={() => setOpenModal(false)}
          >
            <XMarkIcon style={{ width: 32, height: 32 }} />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div style={ui.modalBody}>{children}</div>
      </div>
    </div>
  ) : null
}
