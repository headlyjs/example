import { JSX } from "react";
import HeadlySlug, {
  generateStaticParams,
  generateMetadata,
  HeadlySlugProps,
} from "@headly/core/pages/slug";
import Wrapper from "@/components/ui/Wrapper";
import CallToActionComponent from "@/components/blocks/CallToActionComponent";

export { generateStaticParams, generateMetadata };

export default function Page(props: HeadlySlugProps): JSX.Element {
  return (
    <HeadlySlug
      {...props}
      overrides={{
        ui: { Wrapper },
        blocks: { callToActionComponent: CallToActionComponent },
      }}
    />
  );
}
