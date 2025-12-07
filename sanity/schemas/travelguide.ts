import { defineType, defineField } from "sanity";

export const travelguide = defineType({
  name: "travelGuide",
  title: "Travel Guide",
  type: "document",
  fields: [
    defineField({
      name: "travelGuideText",
      title: "Travel Guide Text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
