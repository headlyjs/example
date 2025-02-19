import { CRMProvider } from "./CRMProvder";
import { ContentfulCRM } from "./providers/ContentfulCRM";

export class CRMFactory {
  static getCRM(): CRMProvider {
    const provider = process.env.CRM_PROVIDER || "contentful";

    switch (provider.toLowerCase()) {
      case "contentful":
        return new ContentfulCRM();
      default:
        throw new Error(`CRM Provider "${provider}" is not supported.`);
    }
  }
}
