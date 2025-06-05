import type { OriginalUrl } from "../value-objects/original-url.js";
import type { ShortId } from "../value-objects/short-id.js";

export type URLRawEntity = {
    id?: string;
    shortId: ShortId;
    originalUrl: OriginalUrl;
}