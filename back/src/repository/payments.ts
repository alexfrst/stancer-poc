import {prismaClient} from "../../prisma/client";

async function setPaymentStatus(id: number, status: string) {
    prismaClient.payment.update({
        where: {
            id,
        }, data: {
            status,
        }
    })
}

async function getPayment(id: number) {
    return prismaClient.payment.findFirstOrThrow({
        where: {
            id: id
        }
    })
}

async function createPayment(paymentExternalId: string, paymentStatus: string) {
    return prismaClient.payment.create({
        data: {
            externalId: paymentExternalId,
            status: paymentStatus || "INITIATED"
        }
    })
}


export { setPaymentStatus, createPayment, getPayment }


