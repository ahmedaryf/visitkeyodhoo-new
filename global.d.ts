// declare module "*.css" {
//   const content: { [className: string]: string };
//   export default content;
// }

// CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Global CSS (side-effect only)
declare module "*.css";

// Swiper types
declare module "swiper/css";
declare module "swiper/css/autoplay";
declare module "swiper/css/navigation";
declare module "swiper/css/effect-fade";
