import { CertTypeService } from "@/services/cert-type-service"

export async function GET() {
  const certTypeService = new CertTypeService()
  const certTypes = await certTypeService.getAll()
  return Response.json(certTypes)
}
