import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      window.location.replace("/index.html");
    }
  },
  component: () => null,
});

