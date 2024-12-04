import { z } from 'zod';

import { DocumentSchema } from '@/lib/validations/document.schema';

export const UploadFileSchema = z.object({
  file: z.union([z.any(), DocumentSchema]).optional(),
});

export type UploadFileInput = z.infer<typeof UploadFileSchema>;
