import { defineType, defineField } from "sanity";

export const aboutus = defineType({
  name: "aboutus",
  title: "Aboutus",
  type: "document",
  fields: [
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
