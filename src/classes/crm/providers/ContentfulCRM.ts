import {
  createClient,
  EntryCollection,
  EntrySkeletonType,
  FieldsType,
} from "contentful";
import { CRMEntry } from "../types";
import { CRMProvider } from "../CRMProvder";

// Helper interface: a Contentful entry with fields of type F.
// F is constrained to FieldsType.
interface ContentfulEntry<F extends FieldsType = Record<string, unknown>>
  extends EntrySkeletonType {
  fields: F;
}

export class ContentfulCRM implements CRMProvider {
  private client;
  private previewClient;
  private previewSecret: string | undefined;

  constructor() {
    this.client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });

    this.previewClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
      host: "preview.contentful.com",
    });

    this.previewSecret = process.env.CONTENTFUL_PREVIEW_SECRET;
  }

  // Choose between the preview client and the normal client.
  private getClient(isPreview: boolean, secret?: string) {
    if (isPreview) {
      if (secret !== this.previewSecret) {
        console.warn("⚠️ Invalid preview secret attempt.");
        return this.client; // fallback to normal client
      }
      return this.previewClient;
    }
    return this.client;
  }

  // Format Contentful entries to our CRMEntry shape.
  private formatEntries<F extends FieldsType>(
    entries: EntryCollection<ContentfulEntry<F>>
  ): CRMEntry<F>[] {
    return entries.items.map((entry) => ({
      id: entry.sys.id,
      type: entry.sys.contentType.sys.id,
      fields: entry.fields as F, // cast to F to satisfy TS
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    }));
  }

  async getByContentType<F extends FieldsType>(
    contentType: string,
    include: number = 3
  ): Promise<CRMEntry<F>[]> {
    try {
      const response = await this.client.getEntries<ContentfulEntry<F>>({
        content_type: contentType,
        // Contentful's include accepts values 0–10.
        include: include as
          | 0
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
          | 10
          | undefined,
      });
      return this.formatEntries(response);
    } catch (error) {
      console.error(`❌ Error fetching content type "${contentType}"`, error);
      return [];
    }
  }

  async getBySlug<F extends FieldsType>(
    slug: string[],
    include: number = 3,
    isPreview: boolean = false,
    secret?: string
  ): Promise<CRMEntry<F> | null> {
    try {
      // Create a query object.
      // Using Record<string, unknown> to avoid using explicit any.
      const query: Record<string, unknown> = {
        content_type: "page",
        include: include as
          | 0
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
          | 10
          | undefined,
        "fields.slug[match]": slug.length ? slug.join("/") : "home",
      };

      const response = await this.getClient(isPreview, secret).getEntries<
        ContentfulEntry<F>
      >(query);

      // console.dir(response, {depth: null})
      const entries = this.formatEntries(response);
      return entries.length > 0 ? entries[0] : null;
    } catch (error) {
      console.error(`❌ Error fetching page "${slug}"`, error);
      return null;
    }
  }

  async getPages<F extends FieldsType>(
    include: number = 1
  ): Promise<CRMEntry<F>[]> {
    try {
      const response = await this.client.getEntries<ContentfulEntry<F>>({
        content_type: "page",
        include: include as
          | 0
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
          | 10
          | undefined,
      });
      return this.formatEntries(response);
    } catch (error) {
      console.error("❌ Error fetching pages", error);
      return [];
    }
  }
}
