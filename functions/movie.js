const axios = require('axios')
// 객체 구조분해하여 코드 단순화
const { OMDB_API_KEY } = process.env

exports.handler = async function (event) {
    console.log(event)
    const payload = JSON.parse(event.body)
    const { title, type, year, page, id } = payload
    const url = id 
      ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
      : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    try {
        const { data } = await axios.get(url)
        if(data.Error){
            return {
                // 잘못된 요청처리에 대한 에러 코드
                statusCode: 400,
                body: data.Error
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch(error) {
        return{
            statusCode: error.response.status,
            body: error.message
        }
    }
}