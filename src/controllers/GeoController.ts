import { Request, Response, NextFunction } from 'express';
import { GeoService } from '../services/GeoService';
import { sendSuccess } from '../utils/responses';

export const GeoController = {
  countries: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await GeoService.listCountries();
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  },
  regions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await GeoService.listRegions(req.query.countryCode as string);
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  },
  cities: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await GeoService.listCities(req.query.regionName as string, req.query.countryCode as string);
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  },
  cityById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const city = await GeoService.getCity(req.params.id);
      sendSuccess(res, city);
    } catch (err) {
      next(err);
    }
  },
};
