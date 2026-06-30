import { createFileRoute } from "@tanstack/react-router";

// Redirect the app root to the static CalculateIt site under /site/.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      window.location.replace("/site/index.html");
    }
  },
  component: () => null,
});
