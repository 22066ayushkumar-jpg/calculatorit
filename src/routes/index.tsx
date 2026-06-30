import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({ href: "/site/index.html", replace: true });
    }
  },
  component: RootFallback,
});

function RootFallback() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#f7f1e5",
        color: "#21352b",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <a
        href="/site/index.html"
        style={{
          display: "inline-flex",
          minHeight: "48px",
          alignItems: "center",
          border: "1px solid #21352b",
          borderRadius: "999px",
          padding: "0 22px",
          color: "inherit",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        Open CalculateIt
      </a>
    </main>
  );
}
