import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
// Middleware that validates JsonWebTokens and sets req.user
import * as jwt from 'express-jwt';
// A library to retrieve RSA signing keys from a JWKS (JSON Web Key Set) endpoint.
import { expressJwtSecret } from 'jwks-rsa';
// import { ConfigService } from '../modules/config/config.service';

/**
 * @class AuthenticationMiddleware
 * @classdesc Middleware that check the validity of the token
 */
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  // // We can use ConfigService because this middleware is defined in AppModule, so it is not global scoped but 'lives' into the injection engine.
  readonly DOMAIN = process.env.AUTH0_DOMAIN;

  // NestMiddleware's interface function that return a middleware function
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      console.log(req);
      // here it validates JsonWebTokens (JWT)
      jwt({
        // here it retrives the secret (RSA signing keys) from auth0 endpoint.
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${this.DOMAIN}/.well-known/jwks.json`,
        }),

        audience: process.env.AUDIENCE || 'http://localhost:3000',
        issuer: `https://${this.DOMAIN}/`,
        algorithm: 'RS256',
      })(req, res, err => {
        // if there's an error checking the token, a message is sent
        if (err) {
          const status = err.status || 500;
          const message =
            err.message || 'Sorry, we were unable to process your request.';
          return res.status(status).send({
            message,
          });
        }
        // if no errors occured, the pipeline goes on. Moreover 'Jwt' has setted the req.user
        next();
      });
    };
  }
}
//       // here it validates JsonWebTokens (JWT)
//       jwt({
//         // here it retrives the secret (RSA signing keys) from auth0 endpoint.
//         secret: expressJwtSecret({
//           cache: true,
//           rateLimit: true,
//           jwksRequestsPerMinute: 5,
//           jwksUri: `https://${this.DOMAIN}/.well-known/jwks.json`,
//         }),
//         // documented as audience but only works as "aud"
//         // https://github.com/auth0-blog/nodejs-jwt-authentication-sample/issues/30
//         aud: process.env.AUDIENCE || 'http://localhost:3000/',
//         issuer: `https://${this.DOMAIN}/`,
//         algorithm: 'RS256',
//       })(req, res, err => {
//         // if there's an error checking the token, a message is sent
//         if (err) {
//           const status = err.status || 500;
//           const message =
//             err.message || 'Sorry, we were unable to process your request.';
//           return res.status(status).send({
//             message,
//           });
//         }
//         // if no errors occured, the pipeline goes on. Moreover 'Jwt' has setted the req.user
//         next();
//       });
//     };
//   }
// }
