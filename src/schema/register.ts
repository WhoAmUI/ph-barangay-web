import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const schema = z.object({
  // Step 1
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  // Maybe in the future will be implemented as Select option
  role: z.string().min(3, "Role must be at least 3 characters"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^(\+63|0)[0-9]{10}$/, "Invalid Phone Number"),

  // Step 2
  barangay: z.string().min(1, "Barangay is required"),
  cityMunicipality: z.string().min(1, "City/Municipality is required"),
  province: z.string().min(1, "Province is required"),

  // Step 3
  officialId: z
    .instanceof(File, { message: "File is required" })
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => file && ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .pdf, .docx, .jpg, and .png files are accepted."
    ),
  authorizationLetter: z
    .instanceof(File, { message: "File is required" })
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => file && ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .pdf, .docx, .jpg, and .png files are accepted."
    ),
  supportingDocuments: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .pdf, .docx, .jpg, and .png files are accepted."
    ),
});

export type FormData = z.infer<typeof schema>;

export type StoredFormData = Omit<
  FormData,
  "officialId" | "authorizationLetter" | "supportingDocuments"
> & {
  officialId: string | null;
  authorizationLetter: string | null;
  supportingDocuments: string | null;
};
