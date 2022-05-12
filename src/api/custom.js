export const toCurrency = (money) => {
    return money.toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
export const orderStatus = (statusCode) => {

    switch (statusCode) {
        case 1:
            return '결제 완료'
        case 2:
            return '주문 확인'
        case 3:
            return '배송 대기 중'
        case 4:
            return '배송중'
        case 5:
            return '배송 완료'
    }
}