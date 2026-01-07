export async function GET() {
  return new Response(JSON.stringify({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER
  }));
}
