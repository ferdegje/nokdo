import 'cross-fetch/polyfill';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';

export interface IUserToken {
  accessToken: string;
  refreshToken: string;
}

class CognitoUserPoolHelper {
  public userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.UserPoolId || '',
      ClientId: process.env.UserPoolClientId || '',
    });
  }

  public signUp({ phone, password }: { phone: string, password: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      const attributeList: CognitoUserAttribute[] = [
        new CognitoUserAttribute({
          Name: 'phone_number',
          Value: phone,
        }),
      ];

      this.userPool.signUp(phone, password, attributeList, [], (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result?.user.getUsername() || '');
      });
    });
  }

  public confirmSignUp({ phone, code }: { phone: string, code: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: phone,
        Pool: this.userPool,
      });

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      });
    });
  }

  public signIn(
    { email, password }: { email: string, password: string },
  ): Promise<IUserToken | { userConfirmationNecessary: boolean }> {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session, userConfirmationNecessary) => {
          if (userConfirmationNecessary) {
            return resolve({ userConfirmationNecessary });
          }

          resolve({
            accessToken: session.getAccessToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}

export default new CognitoUserPoolHelper();