import swaggerJsdoc from "swagger-jsdoc";
import basicAuth from "basic-auth";
import { Request, Response, NextFunction } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dink Link API",
      version: "1.0",
    },
  },
  apis: ["./src/**/controllers/*.ts", "./src/**/services/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = basicAuth(req);
  const username = "admin";
  const password = "password";
  if (!user || user.name !== username || user.pass !== password) {
    res.set("WWW-Authenticate", 'Basic realm="Swagger Docs"');
    return res.status(401).send("Authentication required.");
  }
  next();
};

export const swaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar { background: #2E8540; position: relative; }
    .swagger-ui .topbar .download-url-wrapper { display: none; }
    .swagger-ui .topbar .topbar-wrapper {
      position: relative;
      padding-left: 0;
      padding-right: 56px;
    }
    .swagger-ui .topbar .topbar-wrapper:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background-size: contain;
    }
    .swagger-ui .info { background: #ffffff; border-radius: 8px; padding: 16px; }
    .swagger-ui .scheme-container { background: #f0f9f1; }
  `,
  customSiteTitle: "Dink Link API",
  // customfavIcon:
  //   "https://flexie-storage.s3.us-east-2.amazonaws.com/profile_photos/flexie_logo",
};
