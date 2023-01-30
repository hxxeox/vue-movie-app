exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        // body 부분은 문자데이터만 반환이 가능하다.
        //body: 'Hello world!'
        // 객체데이터를 할당하고 싶을때 사용하는 방법
        body: JSON.stringify({
            name:'HEROPY',
            age:85,
            email:'daa2123@naver.com'
        })
    }
}