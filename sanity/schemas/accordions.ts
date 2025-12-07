import { defineType, defineField } from "sanity";

export const accordions = defineType({
  name: "accordions",
  title: "Accordions (FAQ)",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Id",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
