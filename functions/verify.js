// functions/api/verify.ts

import { verifyCloudProof } from '@worldcoin/idkit';

export const onRequestOptions = async () => {
  // CORS preflight 처리 (필요 없으면 제거 가능)
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export const onRequestPost = async (context) => {
  const { request, env } = context;
  console.log('request', request);
  try {
    // 1) 클라이언트가 보낸 proof 파싱
    const proof = await request.json();
    console.log('proof', proof);

    // 2) 환경 변수에 설정한 APP_ID, ACTION_ID 가져오기
    const appId = env.APP_ID;
    const actionId = env.ACTION_ID;
    if (!appId || !actionId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing APP_ID or ACTION_ID' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
           },
        },
      );
    }

    // 3) World ID Developer Portal API로 증명 검증
    const verifyRes = await verifyCloudProof(proof, appId, actionId);
    console.log('verifyRes', verifyRes);

    // 4) 검증 성공/실패에 따라 응답 반환
    if (verifyRes.success) {
      console.log("success");
      // (필요 시) DB 업데이트 등 추가 로직 삽입
      return new Response(JSON.stringify(verifyRes), {
        status: 200,
        headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
         },
      });
    } else {
      return new Response(JSON.stringify(verifyRes), {
        status: 400,
        headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
         },
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : String(err) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
         },
      },
    );
  }
};
