"use client"
import { Form } from "./form"
import { CertList } from "./list"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { ui } from "./ui"

type IProps = { certTypes: ICertType[] }

export function Wrapper(props: IProps) {
  const { certTypes } = props
  const [editCert, setEditCert] = useState<ICertificate | undefined>()
  const [certificates, setCertificates] = useState<ICertificate[]>([])

  const getCertFromApi = () => {
    getApi<ICertificate[]>(`/api/certificates`).then((res) => {
      setCertificates(res ?? [])
    })
  }

  useEffect(() => {
    getCertFromApi()
  }, [])

  return (
    <section style={ui.page}>
      <Form
        certTypes={certTypes}
        getCertFromApi={getCertFromApi}
        setEditCert={setEditCert}
        editCert={editCert}
      />
      <CertList
        certTypes={certTypes}
        certificates={certificates}
        setEditCert={setEditCert}
        getCertFromApi={getCertFromApi}
      />
    </section>
  )
}
