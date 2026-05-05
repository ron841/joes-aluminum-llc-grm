// Twitter card image. Same composition as opengraph-image.tsx.
// Next.js requires runtime/size/alt/contentType to be statically declared
// at the file level (no re-export). The default function does delegate.
import OpenGraphImage from "./opengraph-image";

export const runtime = "edge";

export const alt =
  "Joe's Aluminum L.L.C. 5.0 stars on 115 reviews. Fruitland Park, FL.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return OpenGraphImage();
}
