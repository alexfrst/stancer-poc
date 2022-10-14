import {Currency, PaymentMethod, PaymentStatus, StancerConnector} from "stancer-connector";

const ACCEPTED_PAYMENT_STATE = [PaymentStatus.CAPTURED, PaymentStatus.AUTHORIZED, PaymentStatus.TO_CAPTURE, PaymentStatus.CAPTURE_SENT]


const stancerConnector :StancerConnector =  new StancerConnector({privateKey:"",publicKey:""})

async function createExternalPayment(priceInCents: number, desc: string){
    return stancerConnector.createPayment({
        amount: priceInCents,
        currency: Currency.EUR,
        description: desc,
        methods_allowed: [PaymentMethod.CARD],
        return_url: "https://localhost:4200/success"
    })
}

async function deleteExternalPayment(id:string){
    return stancerConnector.deletePayment(id)
}

async function getExternalPaymentStatus(id:string){
    const payment = await stancerConnector.getPayment(id)

    if (ACCEPTED_PAYMENT_STATE.includes(payment.status)){
        return "ACCEPTED"
    }

    if (payment.status == null){
        return "INITIATED"
    }

    return payment.status.toString()

}

function buildPaymentLink(id:string){
    return stancerConnector.buildPaymentLink(id, "en-gb")
}

export {
    createExternalPayment, deleteExternalPayment, getExternalPaymentStatus, buildPaymentLink
}