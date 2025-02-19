// types.ts
export interface CRMEntry<F = unknown> {
  id: string;
  type: string;
  fields: F;
  createdAt: string;
  updatedAt: string;
}

export interface HeaderCenterComponentFields {
  title?: string;
  description?: string;
  subDescription?: string;
  buttonText?: string;
  showEmailRequest?: boolean;
  backgroundColor?: string;
}

export interface RichTextComponentFields {
  title?: string;
  body: {
    nodeType: string;
    data: Record<string, unknown>;
    content: RichTextNode[];
  };
}

export interface RichTextNode {
  nodeType: string;
  value?: string;
  data: Record<string, unknown>;
  content?: RichTextNode[];
}

// Discriminated types for your components:
export type HeaderCenterComponentEntry =
  CRMEntry<HeaderCenterComponentFields> & {
    sys: { id: string; contentType: { sys: { id: "headerCenterComponent" } } };
  };

export type RichTextComponentEntry = CRMEntry<RichTextComponentFields> & {
  sys: { id: string; contentType: { sys: { id: "richTextComponent" } } };
};

export type PageComponent = HeaderCenterComponentEntry | RichTextComponentEntry;

// /classes/crm/types.ts

// Define a dedicated interface for SEO data.
export interface SEOFields {
  pageTitle: string;
  pageDescription: string;
  images?: {
    fields: {
      title: string;
      file: {
        url: string;
        details: {
          size: number;
          image?: {
            width: number;
            height: number;
          };
        };
        fileName: string;
        contentType: string;
      };
    };
  }[];
  changeFrequency: string;
  priority: string;
  disableIndexing: boolean;
  head: string;
}

// Update your PageFields to include a dedicated SEO section.
export interface PageFields {
  title: string;
  content?: string;
  slug: string;
  seo: {
    fields: SEOFields;
  };
  components?: PageComponent[];
}

// Assume PageComponent and other types are defined below...
