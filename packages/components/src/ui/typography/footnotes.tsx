import {
  FootnotesBase,
  FootnotesListBase,
  FootnoteItemBase,
  FootnoteReferenceBase,
  FootnoteBacklinkBase,
} from "./footnotes-base";
import type { FootnotesProps } from "./types";
export const FootnotesList = FootnotesListBase;
export const FootnoteItem = FootnoteItemBase;
export const FootnoteReference = FootnoteReferenceBase;
export const FootnoteBacklink = FootnoteBacklinkBase;
const FootnotesRoot = (props: FootnotesProps) => <FootnotesBase {...props} />;
FootnotesRoot.displayName = "Footnotes";
export const Footnotes = Object.assign(FootnotesRoot, {
  List: FootnotesList,
  Item: FootnoteItem,
  Reference: FootnoteReference,
  Backlink: FootnoteBacklink,
});
