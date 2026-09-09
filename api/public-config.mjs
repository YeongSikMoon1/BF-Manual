export default function handler(_request,response){
 response.status(200).json({kakaoJsKey:process.env.KAKAO_JS_KEY||''});
}
