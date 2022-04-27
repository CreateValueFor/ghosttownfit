import axios from "axios"


let TOKEN = "";

if (TOKEN === "") {
    TOKEN = getCookie('gt-acst')
}

function setCookie(cName, cValue, cDay) {
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    let cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

const delCookie = function delCookie_by_name(name) {
    let date = new Date();
    date.setDate(date.getDate() - 100);
    let Cookie = `${name}=;Expires=${date.toUTCString()}`
    document.cookie = Cookie;
}

// 쿠키 가져오기 함수
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if (start != -1) {
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

export const BASE_URL = "https://ghost.callenge.co.kr/"
// export const BASE_URL = "http://localhost:8000/"

const _baseGetRequest = async (path) => {
    if (!TOKEN) {
        console.log('there is no token')
        console.log(getCookie('gt-acst'))
        TOKEN = getCookie("gt-acst")
    }
    const headers = {
        authorization: `Bearer ${TOKEN}`
    }
    const res = await axios.get(`${BASE_URL + path}`, { headers })
    return res.data
}
const _baseDeleteRequest = async (path) => {
    if (!TOKEN) {
        console.log('there is no token')
        console.log(getCookie('gt-acst'))
        TOKEN = getCookie("gt-acst")
    }
    const headers = {
        authorization: `Bearer ${TOKEN}`
    }
    const res = await axios.delete(`${BASE_URL + path}`, { headers })
    return res.data
}
const _basePostRequest = async (path, param) => {
    console.log("POST action start")
    if (!TOKEN) {
        console.log('there is no token')
        console.log(getCookie('gt-acst'))
        TOKEN = getCookie("gt-acst")
    }
    const headers = {
        authorization: `Bearer ${TOKEN}`
    }
    let data;
    try {
        data = (await axios.post(`${BASE_URL + path}`, param, { headers })).data
        if (data.token) {
            console.log('토큰 저장 시작')
            setCookie('gt-acst', data.token.access, 1)
            setCookie('gt-rfst', data.token.refresh, 14)
        }
        return data;

    } catch (error) {
        console.log(error.response)
        return error.response.data
    }

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
 * 회원가입 - POST
 * @param - userid, password, phone, email, name, smsAgree, emailAgree
 */
export const postRegister = async (param) => {
    return await _basePostRequest('auth/join', param)
}

/**
 *
 * 로그인 - GET
 * @param - 
 */
export const getLogout = async () => {
    const res = await _baseGetRequest('auth/logout')
    delCookie('gt-acst');
    delCookie('gt-rfst');
    return res
}

/**
 * 
 * @param {*} param 
 * @returns 
 */
export const destoryUser = async () => {
    const res = await _baseDeleteRequest('auth')
    delCookie('gt-acst');
    delCookie('gt-rfst');
    return res
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
export const getProducts = async (param) => {
    const res = await _baseGetRequest('product/color')
    return res.data;
}

/**
 * 
 * 주문 시작하기 - POST
 */
export const startOrder = async (param) => {
    const res = await _basePostRequest('v1/order', param);
    return res;
}

export const checkOrder = async (param) => {
    const res = await _basePostRequest('v1/order/check', param);
    return res
}

export const getOrder = async () => {
    const res = await _baseGetRequest('v1/order/customer');
    return res
}