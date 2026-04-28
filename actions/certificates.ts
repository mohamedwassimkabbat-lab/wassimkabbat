"use server"

import { IState } from "@/types/shared-t"
import { postApi, putApi } from "@/utils/server-api"
import { z } from "zod"

export async function createCertificates(
  prevState: IState,
  formData: FormData,
): Promise<IState> {
  const schema = z.object({
    id: z.coerce.string().optional(),
    typeId: z.coerce.string(),
    company: z.string().min(2),
  })

  const rawFormData = {
    id: formData.has("id") ? formData.get("id") : undefined,
    typeId: formData.get("typeId"),
    company: formData.get("company"),
  }

  const parse = schema.safeParse(rawFormData)

  if (!parse.success) {
    const tree = z.treeifyError(parse.error)

    const fieldErrors: Record<string, string[]> = {}

    if (tree.properties) {
      const props = tree.properties

      for (const key of Object.keys(props) as Array<keyof typeof props>) {
        const field = props[key]

        if (field?.errors?.length) {
          fieldErrors[key] = field.errors
        }
      }
    }

    return {
      errors: fieldErrors,
      message: "Incorrectly filled fields!",
      isSaved: false,
    }
  }

  const dto = parse.data

  if (!dto?.id) {
    await postApi(`/api/certificates`, dto)
    return { message: "Data sent successfully", isSaved: true }
  }

  await putApi(`/api/certificates/${dto.id}`, dto)
  return { message: "Data updated successfully", isSaved: true }
}