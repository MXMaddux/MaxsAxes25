import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.***REMOVED***!, {
  apiVersion: "2025-03-31.basil", // Use the latest API version
});

// Define the expected request body type
interface PaymentRequestBody {
  cart: any[]; // Replace `any[]` with a more specific CartItem type if available
  shipping_fee: number;
  total_amount: number;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: PaymentRequestBody = await request.json();
    const { cart, shipping_fee, total_amount } = body;

    // Validate the request body
    if (
      !Array.isArray(cart) ||
      typeof shipping_fee !== "number" ||
      typeof total_amount !== "number"
    ) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total_amount + shipping_fee, // Total amount in cents
      currency: "usd",
    });

    // Return the client secret
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);

    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.statusCode || 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle generic errors
    return new Response(
      JSON.stringify({ error: "Failed to create PaymentIntent" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
