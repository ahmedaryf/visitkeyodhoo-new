import { defineField, defineType } from "sanity";

export const rocknreelmenu = defineType({
  name: "rocknreelmenu",
  title: "Rock N Reel Menu",
  type: "document",
  fields: [
    defineField({
      name: "categories",
      title: "Categories",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "items",
      title: "Items",
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
              name: "itemDescription",
              title: "Item Description",
              type: "text",
            }),
            defineField({
              name: "itemImage",
              title: "Item Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "priceInMvr",
              title: "Price In MVR",
              type: "number",
            }),
            defineField({
              name: "priceInUsd",
              title: "Price In USD",
              type: "number",
            }),
            defineField({
              name: "mostPopular",
              title: "Most Popular",
              type: "boolean",
            }),
            defineField({
              name: "vegetarian",
              title: "Vagetarian",
              type: "boolean",
            }),
          ],
        },
      ],
    }),
  ],
});
