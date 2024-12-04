import { z } from 'zod';

import { DOCUMENT_TYPES, MAX_IMAGE_SIZE } from '@/config/file';
import { MESSAGES } from '@/config/messages';

export const DocumentSchema = z
  .array(z.custom<File>())
  .refine(
    (files) => {
      return files.every((file) => file instanceof File);
    },
    {
      message: MESSAGES.EXPECTED_A_FILE,
    }
  )
  .refine(
    (files) => files.every((file) => file.size <= MAX_IMAGE_SIZE),
    MESSAGES.FILE_SIZE_SHOULD_BE_LESS_THAN_5MB
  )
  .refine(
    (files) => files.every((file) => DOCUMENT_TYPES.includes(file.type)),
    MESSAGES.ONLY_THESE_TYPES_ARE_ALLOWED_PDF_DOC_DOCX
  );
