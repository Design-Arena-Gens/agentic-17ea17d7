export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: "48px 24px"
      }}
    >
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>WhatsApp AI Agent</h1>
      <p style={{ marginTop: 0, color: "#334155" }}>
        Production webhook is available at <code>/api/webhook</code>.
      </p>

      <section
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 24,
          marginTop: 24
        }}
      >
        <h2 style={{ marginTop: 0 }}>Setup Summary</h2>
        <ol style={{ lineHeight: 1.7 }}>
          <li>
            Set environment variables: <code>OPENAI_API_KEY</code>,{" "}
            <code>WHATSAPP_ACCESS_TOKEN</code>,{" "}
            <code>WHATSAPP_VERIFY_TOKEN</code>.
          </li>
          <li>
            In Meta Developer Dashboard, configure the callback URL to{" "}
            <code>https://agentic-17ea17d7.vercel.app/api/webhook</code> with
            your verify token.
          </li>
          <li>
            Send a WhatsApp message to your business number to see AI replies.
          </li>
        </ol>
      </section>
    </main>
  );
}

