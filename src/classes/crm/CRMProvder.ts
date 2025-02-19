// CRMProvider.ts
import { CRMEntry } from "./types";
import { FieldsType } from "contentful";

export interface CRMProvider {
  getByContentType<F extends FieldsType>(
    contentType: string,
    include?: number
  ): Promise<CRMEntry<F>[]>;
  getBySlug<F extends FieldsType>(
    slug: string[],
    include?: number,
    isPreview?: boolean,
    secret?: string
  ): Promise<CRMEntry<F> | null>;
  getPages<F extends FieldsType>(include?: number): Promise<CRMEntry<F>[]>;
}
