import { defineType, defineField } from "sanity";

export const cafe = defineType({
  name: "cafe",
  title: "Cafe & Restaurant",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "menu",
      title: "Menu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
            }),
            defineField({
              name: "id",
              title: "ID",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "items",
              title: "Title",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "itemName",
                      title: "Item Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "string",
                    }),
                    defineField({
                      name: "price",
                      title: "Price",
                      type: "number",
                    }),
                    defineField({
                      name: "image",
                      title: "Image",
                      type: "image",
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
