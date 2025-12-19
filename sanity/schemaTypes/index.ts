import { type SchemaTypeDefinition } from "sanity";
import { hero } from "../schemas/hero";
import { accordions } from "../schemas/accordions";
import { aboutus } from "../schemas/aboutus";
import { travelguide } from "../schemas/travelguide";
import { guesthouses } from "../schemas/guesthouses";
import { cafe } from "../schemas/cafe";
import { rocknreelmenu } from "../schemas/rocknreelmenu";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    accordions,
    aboutus,
    travelguide,
    guesthouses,
    cafe,
    rocknreelmenu,
  ],
};
