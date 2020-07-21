import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeormConn = async () => {
  const conectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  console.log("What is the connection ", conectionOptions);
  await createConnection({ ...conectionOptions, name: "default" });
};
