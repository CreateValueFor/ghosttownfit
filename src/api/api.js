import axios from "axios"



// const BASE_URL = "http://13.125.119.128:8000/"
export const BASE_URL = "https://ghost.callenge.co.kr/"
// export const BASE_URL = "http://localhost:8000/"

const _baseGetRequest = async (path) => {
    const headers = {
        authorization: 'heello'
    }
    const res = await axios.get(`${BASE_URL + path}`, { headers })
    return res.data
}
const _basePostRequest = async (path, param) => {
    const headers = {
        authorization: 'heello'
    }
    const { data } = await axios.post(`${BASE_URL + path}`, param, { headers })
    return data;
}

/**
 *
 * 로그인 - POST
 * @param - userid, password
 */
export const postLogin = async (param) => {
    return await _basePostRequest('auth/login', param)
}

/**
 *
 * 로그인 - GET
 * @param - 
 */
export const getLogout = async () => {
    return await _baseGetRequest('auth/logout')
}

/**
 *
 * 게시물 작성 - POST
 * @param - name, password, title, contents
 */

export const postInquiry = async (param) => {
    return await _basePostRequest('inquiry', param)
}

/**
 * 파트너 불러오기 - GET
 * 
 */

export const getPartners = async () => {

    const res = await _baseGetRequest('partner')
    return res.data
}

/**
 * 문의사항 불러오기 - GET
 * 
 */

export const getInquiry = async (page) => {

    const res = await _baseGetRequest(`inquiry?page=${page}`)
    return res.data
}

/**
 * 입고일정 불러오기 - GET
 * 
 */

export const getCalendar = async () => {

    const res = await _baseGetRequest(`calendar`)
    return res.data
}

/**
 * 
 * 제품 목록 불러오기 - GET
 */
export const getProducts = async () => {
    const res = await _baseGetRequest('product/color')
    return res.data;
}