"use client"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { deleteApi } from "@/utils/server-api"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ui } from "./ui"

type IProps = {
  certTypes: ICertType[]
  certificates: ICertificate[]
  setEditCert: (cert: ICertificate) => void
  getCertFromApi: () => void
}

export function CertList(props: IProps) {
  const { certTypes, certificates, setEditCert, getCertFromApi } = props

  const findType = (id?: string) => certTypes.find((i) => i.id === id)?.title

  const changeCert = (id?: string) => {
    if (!id) return
    const cert = certificates.find((i) => i.id === id)
    if (!cert) return
    setEditCert(cert)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    await deleteApi("/api/certificates", id)
    getCertFromApi()
  }

  return (
    <div style={ui.listCard}>
      <table style={ui.table}>
        <thead style={ui.tableHead}>
          <tr>
            <th scope="col" style={ui.tableHeadCell}>
              Name
            </th>
            <th scope="col" style={ui.tableHeadCell}>
              Note
            </th>
            <th scope="col" style={ui.tableHeadCell}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {certificates.length ? (
            certificates.map((c) => (
              <tr key={c.id} style={ui.tableRow}>
                <td style={ui.tableCell}>{findType(c.typeId)}</td>
                <td style={ui.tableCell}>{c.company}</td>
                <td style={ui.tableCell}>
                  <div style={ui.actions}>
                    <button
                      title="Edit"
                      type="button"
                      onClick={() => changeCert(c.id)}
                      style={ui.editButton}
                    >
                      <PencilIcon style={ui.icon} />
                      Edit
                    </button>
                    <button
                      title="Delete"
                      type="button"
                      onClick={() => handleDelete(c.id)}
                      style={ui.deleteButton}
                    >
                      <TrashIcon style={ui.icon} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr style={ui.tableRow}>
              <td style={ui.emptyState} colSpan={3}>
                No certificates yet. Click Add to create your first one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
