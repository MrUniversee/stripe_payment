const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fees } = req.body

  const calculateOrderTotals = () => {
    //Make check with database to ensure that the item prices are correct
    //calculate order total
    return total_amount + shipping_fees
  }

  //create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderTotals(),
    currency: 'usd',
  })
  //does not log payment intent!!
  console.log(paymentIntent)
  res.json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController
