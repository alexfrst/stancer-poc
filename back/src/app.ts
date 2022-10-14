import express, {Request} from "express";
import cors from "cors";
import {Payment} from 'stancer-connector'
import {buildPaymentLink, createExternalPayment, getExternalPaymentStatus} from "./services/payments";
import {createPayment, getPayment, setPaymentStatus} from "./repository/payments";


const app = express();

app.use(cors());

app.post("/checkout", async (req, res) => {
  const payment : Payment = await createExternalPayment(100, "Descriptive description")

  const paymentId = (await createPayment(payment.id, payment.status || "INITIATED")).id

  console.log(buildPaymentLink(payment.id))

  res.send({"externalPaymentUrl": buildPaymentLink(payment.id), "id": paymentId})
})

app.get("/check-payment-state", async (req: Request<{ id: number}>, res) => {
  const paymentExternalId = (await getPayment(req.params.id)).externalId
  const paymentStatus: string = (await getExternalPaymentStatus(paymentExternalId))
  await setPaymentStatus(req.params.id,paymentStatus)


  if(paymentStatus == "ACCEPTED"){
    // Launch you successfull order process here :)
    res.send({status: "ACCEPTED"})
  }

  res.send({status: "REFUSED"})
})

export default app;
