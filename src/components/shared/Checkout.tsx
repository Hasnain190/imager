"use client"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits, createTransactions } from "../../lib/actions/transection.actions";

import { PayPalButton } from "react-paypal-button-v2";
import { redirect } from "next/navigation";
const Checkout = ({
    plan,
    amount,
    credits,
    buyerId,
}: {
    plan: string;
    amount: number;
    credits: number;
    buyerId: string;
}) => {
    const { toast } = useToast();
    const [scriptLoaded, setScriptLoaded] = useState(false);
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            toast({
                title: "Order placed!",
                description: "You will receive an email confirmation",
                duration: 5000,
                className: "success-toast",
            });
        } if (query.get("canceled")) {
            toast({
                title: "Order canceled!",
                description: "Continue to shop around and checkout when you're ready",
                duration: 5000,
                className: "error-toast",
            });
        }
    }, []);
    useEffect(() => {
        const addPayPalScript = async () => {
            if (!window.paypal) {
                const script = document.createElement("script");
                script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
                script.onload = () => setScriptLoaded(true);
                document.body.appendChild(script);
            } else {
                setScriptLoaded(true);
            }
        };

        addPayPalScript();
    }, []);

    const onCheckout = async () => {
        const transaction = {
            plan,
            amount,
            credits,
            buyerId,
        };

        await checkoutCredits(transaction);
    };



    const onSuccessHandler: Function | undefined = async (details: { payer: { name: { given_name: string; }; }; }, data: { orderID: any; }) => {
        alert("Transaction completed by " + details.payer.name.given_name);

        await createTransactions({
            plan,
            amount,
            credits,
            buyerId,
            paypalId: data.orderID,
            createdAt: new Date()
        });

        redirect("/profile");
    };
    return (
        // <form onSubmit={onCheckout}>
        <section>
            {scriptLoaded && (
                <div id="paypal-button-container">

                    <PayPalButton
                        amount={amount}

                        onSuccess={onSuccessHandler}
                    />
                </div>
            )}


        </section>
        // </form>
    );
};

export default Checkout;
