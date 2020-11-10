export class ServiceError extends Error {}

export class ResourceDoesNotExistError extends ServiceError {}

export class IncorrectPayloadError extends ServiceError {}

export function filterPayload(model, payload) {
  return Object.keys(payload).reduce((acc, attribute) => {
    if (model.publicAttributes.includes(attribute)) {
      acc[attribute] = payload[attribute];
    }
    return acc;
  }, {});
}