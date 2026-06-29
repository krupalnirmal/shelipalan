import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "शेळीपालन - गावातल्या शेळ्या/बोकड एका ठिकाणी",
    short_name: "शेळीपालन",
    description: "शेतकरी आणि खातिकसाठी शेळीपालन डिरेक्टरी",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ed",
    theme_color: "#15803d",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
