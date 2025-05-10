export function onRequest(context) {
  // console.log(context)
  return new Response("Hello, world!",
    {
      status: 200,
      headers: {
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}