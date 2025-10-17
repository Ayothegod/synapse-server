export const httpStatus = {
  ok: 200, 
  created: 201, 
  noContent: 204,

  badRequest: 400, // Invalid data from client
  unauthorized: 401, // Not logged in
  forbidden: 403, // Logged in, but not allowed (e.g. trying to access another user's file)
  
  notFound: 404, // Resource doesn't exist (e.g. product not found)
  conflict: 409, // Duplicate (e.g. email already taken)

  internalServerError: 500, // Unexpected server crash or bug
  serviceUnavailable: 503, // Server is up but unavailable (e.g. maintenance)
};

// NOTE: Ecample constant valus
export const SocketEventEnum = Object.freeze({
  CONNECTED_EVENT: "connected",
  DISCONNECT_EVENT: "disconnect",
  SOCKET_ERROR_EVENT: "socketError",
});

export const ErrorEventEnum = Object.freeze({
  ALREADY_EXISTS: "ALREADY_EXISTS",
  NO_TOKEN: "NO_TOKEN",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
});

export const GenErrorEnum = Object.freeze({
  PERMISSION_DENIED: {
    code: "PERMISSION_DENIED",
    message: "You lack permissions for this action.",
  },
  RATE_LIMITED: {
    code: "RATE_LIMITED",
    message: "You are sending messages too quickly.",
  },
  CONNECTION_ERROR: {
    code: "CONNECTION_ERROR",
    message: "Network issue, please retry.",
  },
});
