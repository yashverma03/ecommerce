import type { NextFunction, Response } from 'express';
import type { AuthRequest } from '../utils/types';
import { createPaymentService } from '../service/payment.ts';

export const createPayment = (req: AuthRequest, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { userId } = req;
      const { sessionId, error, statusCode } = await createPaymentService(userId);

      if (error !== undefined) {
        return res.status(statusCode).json({ error });
      }

      res.status(200).json({ message: 'Payment session created by stripe', data: { sessionId } });
    } catch (error) {
      next(error);
    }
  };

  void request();
};
