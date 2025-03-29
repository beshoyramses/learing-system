import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { order_id } = req.query;

  try {
    // First check our own database
    // const localPayment = await checkLocalDatabase(order_id);
    // if (localPayment?.verified) {
    //   return res.json({ success: true });
    // }

    // Then verify with Paymob
    const response = await axios.get(
      `https://accept.paymob.com/api/acceptance/transactions?order_id=${order_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PAYMOB_API_KEY}`
        }
      }
    );

    const transaction = response.data.find((txn: any) => txn.order === order_id);
    
    if (transaction && transaction.success && transaction.is_voided === false) {
      // Save to your database here
      // await saveSuccessfulPayment(transaction);
      
      return res.status(200).json({ 
        success: true,
        data: transaction
      });
    }

    return res.status(400).json({ 
      success: false,
      message: 'Payment not found or not successful'
    });

  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  }
}