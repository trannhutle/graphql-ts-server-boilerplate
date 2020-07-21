import * as bcryptjs from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async ({ email, password }: GQL.IRegisterOnMutationArguments) => {
      const userAlreadyExisted = User.findOne({
        where: { email },
        select: ["id"],
      });

      if (userAlreadyExisted) {
        return [
          {
            path: "email",
            message: "Already taken",
          },
        ];
      }

      const hashedPasscode = await bcryptjs.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPasscode,
      });

      await user.save();
      return null;
    },
  },
};
