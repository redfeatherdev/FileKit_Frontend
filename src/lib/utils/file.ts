import { DOCUMENT_TYPES, MIME_TYPES } from '@/config/file';

export function acceptedMimeType() {
  const result = MIME_TYPES.reduce((acc, value) => {
    return { ...acc, [value]: [] };
  }, {});

  return result;
}

export function acceptedDocumentType() {
  const result = DOCUMENT_TYPES.reduce((acc, value) => {
    return { ...acc, [value]: [] };
  }, {});

  return result;
}

