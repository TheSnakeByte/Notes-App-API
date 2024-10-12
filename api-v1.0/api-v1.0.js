const cons = require("coloured-logs");
const ffdb = require("flat-file-db");
const db = ffdb.sync("db.json");

async function handleReq(method, id, body) {
  if (method == "GET") {
    const data = db.get(id.toString());
    if (!data) {
      return {
        success: false,
        result: `Cannot GET, note with id '${id}' does not exist`,
        data: null,
        status: 404,
      };
    } else {
      return {
        success: true,
        result: `Found note with id '${id}'`,
        data: data,
        status: 200,
      };
    }
  } else if (method == "POST") {
    const data = db.get(id.toString());
    if (!data) {
      db.put(id, body);
      return {
        success: true,
        result: `Created note with id '${id}'`,
        data: null,
        status: 200,
      };
    } else {
      return {
        success: false,
        result: `Cannot POST, note with id '${id}' already exists`,
        data: null,
        status: 409,
      };
    }
  } else if (method == "PUT") {
    const data = db.get(id.toString());
    if (!data) {
      return {
        success: false,
        result: `Cannot PUT, note with id '${id}' does not exist`,
        data: null,
        status: 404,
      };
    } else {
      db.put(id, body);
      return {
        success: true,
        result: `Updated note with id '${id}'`,
        data: null,
        status: 200,
      };
    }
  } else if (method == "DELETE") {
    const data = db.get(id.toString());
    if (!data) {
      return {
        success: false,
        result: `Cannot DELETE, note with id '${id}' does not exist`,
        data: null,
        status: 404,
      };
    } else {
      db.del(id);
      return {
        success: true,
        result: `Deleted note with id '${id}'`,
        data: null,
        status: 200,
      };
    }
  } else {
    return {
      success: false,
      result: `Invalid method: '${method}'`,
      data: null,
      status: 405,
    };
  }
}

module.exports = handleReq;
