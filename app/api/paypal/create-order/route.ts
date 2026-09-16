import {NextResponse} from 'next/server';

const getPayPalBaseUrl = () =>
  process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal server credentials are not configured');
  }

  const response = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('PayPal authentication failed');
  }

  const data = (await response.json()) as {access_token?: string};
  if (!data.access_token) {
    throw new Error('PayPal did not return an access token');
  }

  return data.access_token;
}

export async function POST() {
  const amount = process.env.PAYPAL_PRICE_USD;

  if (!amount || !/^\d+(\.\d{1,2})?$/.test(amount) || Number(amount) <= 0) {
    return NextResponse.json({error: 'PayPal payment amount is not configured'}, {status: 503});
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'PayPal-Request-Id': crypto.randomUUID(),
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: 'nova-premium-template',
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
      }),
      cache: 'no-store',
    });

    const data = await response.json();
    if (!response.ok || !data.id) {
      return NextResponse.json({error: 'Unable to create PayPal order'}, {status: 502});
    }

    return NextResponse.json({orderID: data.id});
  } catch (error) {
    console.error('PayPal order creation failed', error);
    return NextResponse.json({error: 'Unable to create PayPal order'}, {status: 500});
  }
}
