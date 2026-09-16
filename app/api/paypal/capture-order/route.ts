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

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {orderID?: string} | null;
  const orderID = body?.orderID;

  if (!orderID || !/^[A-Z0-9-]+$/i.test(orderID)) {
    return NextResponse.json({error: 'Invalid PayPal order'}, {status: 400});
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'PayPal-Request-Id': crypto.randomUUID(),
      },
      body: '{}',
      cache: 'no-store',
    });

    let data = await response.json();
    const alreadyCaptured = data.details?.some(
      (detail: {issue?: string}) => detail.issue === 'ORDER_ALREADY_CAPTURED',
    );

    if (!response.ok && alreadyCaptured) {
      const orderResponse = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderID)}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${accessToken}`},
        cache: 'no-store',
      });

      if (orderResponse.ok) {
        data = await orderResponse.json();
      }
    }

    if (!response.ok && !alreadyCaptured) {
      console.error('PayPal capture rejected', {
        orderID,
        status: response.status,
        name: data.name,
        details: data.details,
      });
      return NextResponse.json(
        {error: data.details?.[0]?.description ?? 'PayPal payment was not captured'},
        {status: 502},
      );
    }

    const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
    const expectedAmount = process.env.PAYPAL_PRICE_USD;
    const isValidPayment =
      data.intent === 'CAPTURE' &&
      data.status === 'COMPLETED' &&
      capture?.status === 'COMPLETED' &&
      capture?.amount?.currency_code === 'USD' &&
      capture?.amount?.value === expectedAmount;

    if (!isValidPayment) {
      console.error('PayPal payment verification failed', {orderID, status: data.status});
      return NextResponse.json({error: 'Payment is not completed'}, {status: 402});
    }

    return NextResponse.json({orderID, status: 'COMPLETED'});
  } catch (error) {
    console.error('PayPal order capture failed', error);
    return NextResponse.json({error: 'Unable to verify PayPal payment'}, {status: 500});
  }
}
