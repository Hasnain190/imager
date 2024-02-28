"use server";

import { paypalUrl } from "../../../constants";
import Transaction from "../database/models/transection.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { updateCredits } from "./user.actions";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;

  const url = paypalUrl;

  // Encode client ID and secret
  const credentials = `${clientId}:${clientSecret}`;

  // Set up the request headers
  const headers = new Headers();
  headers.append("Authorization", `Basic ${credentials}`);
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  // Set up the request body
  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");

  // Send the request
  const response = fetch(url, {
    method: "POST",
    headers: headers,
    body: body.toString(),
  });

  const data = await (
    await response
  )
    .json()

    .catch((error) => console.error("Error:", error));
}

export async function createTransactions(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();
    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    await updateCredits(transaction.buyerId, transaction.credits);
    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}
