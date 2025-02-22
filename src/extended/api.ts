import { base64urlToBuffer, bufferToBase64url } from "../base64url";
import { convert } from "../convert";
import { PublicKeyCredentialWithClientExtensionResults } from "../basic/json";
import {
  CredentialCreationOptionsExtendedJSON,
  CredentialRequestOptionsExtendedJSON,
  PublicKeyCredentialWithAssertionExtendedResultsJSON,
  PublicKeyCredentialWithAttestationExtendedResultsJSON,
} from "./json";
import {
  credentialCreationOptionsExtended,
  credentialRequestOptionsExtended,
  publicKeyCredentialWithAssertionExtended,
  publicKeyCredentialWithAttestationExtended,
} from "./schema";

// create

export function createExtendedRequestFromJSON(
  requestJSON: CredentialCreationOptionsExtendedJSON,
): CredentialCreationOptions {
  return convert(
    base64urlToBuffer,
    credentialCreationOptionsExtended,
    requestJSON,
  );
}

export function createExtendedResponseToJSON(
  credential: PublicKeyCredential,
): PublicKeyCredentialWithAttestationExtendedResultsJSON {
  const credentialWithClientExtensionResults = credential as PublicKeyCredentialWithClientExtensionResults;
  credentialWithClientExtensionResults.clientExtensionResults = credential.getClientExtensionResults();
  return convert(
    bufferToBase64url,
    publicKeyCredentialWithAttestationExtended,
    credentialWithClientExtensionResults,
  );
}

export async function createExtended(
  requestJSON: CredentialCreationOptionsExtendedJSON,
): Promise<PublicKeyCredentialWithAttestationExtendedResultsJSON> {
  const credential = (await navigator.credentials.create(
    createExtendedRequestFromJSON(requestJSON),
  )) as PublicKeyCredential;
  return createExtendedResponseToJSON(credential);
}

// get

export function getExtendedRequestFromJSON(
  requestJSON: CredentialRequestOptionsExtendedJSON,
): CredentialRequestOptions {
  return convert(
    base64urlToBuffer,
    credentialRequestOptionsExtended,
    requestJSON,
  );
}

export function getExtendedResponseToJSON(
  credential: PublicKeyCredential,
): PublicKeyCredentialWithAssertionExtendedResultsJSON {
  const credentialWithClientExtensionResults = credential as PublicKeyCredentialWithClientExtensionResults;
  credentialWithClientExtensionResults.clientExtensionResults = credential.getClientExtensionResults();
  return convert(
    bufferToBase64url,
    publicKeyCredentialWithAssertionExtended,
    credentialWithClientExtensionResults,
  );
}

export async function getExtended(
  requestJSON: CredentialRequestOptionsExtendedJSON,
): Promise<PublicKeyCredentialWithAssertionExtendedResultsJSON> {
  const credential = (await navigator.credentials.get(
    getExtendedRequestFromJSON(requestJSON),
  )) as PublicKeyCredential;
  return getExtendedResponseToJSON(credential);
}
