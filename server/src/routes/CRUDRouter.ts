import { Router } from "express";

import { controllerManger } from "../controllers/ControllerManager.js";
import type { NextFunction, Request, Response } from 'express';


// Generic wrapper for extention
function asyncHandler(func: (req: Request, res: Response, next: NextFunction) => Promise<any>){
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next)
    }
}

// Generic CRUD router with async handler wrapper, communicates with Controllers to access data
export function CRUDRouter<T>(entityName: string): Router {
    const router = Router();

    router.get(
        "/",
        asyncHandler(async (req: Request, res: Response) => {
            // Controllers are fetched in the request in case data source changes.
            const controller = controllerManger.getController(entityName);
            const items = await controller.getAll();
            res.status(200).json(items);
        })
    )

    router.get(
        "/:id",
        asyncHandler(async (req: Request, res: Response) => {
            const controller = controllerManger.getController(entityName);

            if(req.params.id){
                const item = await controller.getById(req.params.id);
                if(item){
                    res.status(200).json(item)
                }
                else {
                    res.status(404).json({"error" : "No item with that id."})
                }
            }
        })
    )

    router.post(
        "/",
        asyncHandler(async (req: Request, res: Response) => {
            const controller = controllerManger.getController(entityName);
            const item = controller.create(req.body);
            res.status(201).json({"message" : "Item created.", "item" : item});
        })
    )

    router.put(
        "/:id",
        asyncHandler(async (req: Request, res: Response) => {
            const controller = controllerManger.getController(entityName);

            if(req.params.id && req.body){
              const item = controller.update(req.params.id, req.body);
              res.status(200).json({"message" : "Item updated.", "item" : item})
            } else {
                res.status(500).json({"error" : "No id or object body provided."})
            }
        })
    )

    router.delete(
        "/:id",
        asyncHandler(async (req: Request, res: Response) => {
            const controller = controllerManger.getController(entityName);

            if(req.params.id){
              const item = controller.delete(req.params.id);
              if (item) {
                  res.status(200).json({"message" : "Item deleted.", "item" : item})
                } 
                else {
                res.status(404).json({"error" : "No item with that id."})
                }
            }
        })
    )

    return router;
}