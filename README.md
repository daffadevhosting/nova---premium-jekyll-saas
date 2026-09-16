<div align="center">
<img width="1200" height="475" alt="GHBanner" src="/nova.png" />
</div>

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
3. Copy the PayPal values from [.env.example](.env.example) into `.env.local`. Use PayPal sandbox credentials while testing. Keep `PAYPAL_CLIENT_SECRET` server-only and use the same value for `PAYPAL_PRICE_USD` and `NEXT_PUBLIC_PAYPAL_PRICE_USD`.
4. Run the app:
   `npm run dev`

## PayPal download flow

The Premium ZIP button opens PayPal Smart Buttons. The server creates and captures the order through PayPal's REST API, verifies the completed capture, currency, and configured amount, and only then allows the browser to generate the ZIP. Cancelled, pending, or failed payments do not trigger a download.

Set `PAYPAL_ENV=live` only after testing with sandbox credentials. Never expose `PAYPAL_CLIENT_SECRET` as a `NEXT_PUBLIC_*` variable.
