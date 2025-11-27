export const metadata = {
  title: "WhatsApp AI Agent",
  description: "AI agent for WhatsApp via Cloud API"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          margin: 0,
          color: "#0f172a",
          background: "#f8fafc"
        }}
      >
        {children}
      </body>
    </html>
  );
}

