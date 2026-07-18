import Joi from 'joi';
import type { Optional } from 'src/common/type/native';
import { NodeEnv } from '../enum/node-env.enum';

type EnvFilePath = `.env.${NodeEnv}`;

export function resolveEnvFilePath(nodeEnv: Optional<string>): EnvFilePath {
  const result = Joi.string<NodeEnv>()
    .valid(...Object.values(NodeEnv))
    .required()
    .validate(nodeEnv);

  if (result.error) {
    throw new Error(`NODE_ENV가 누락되었거나 올바르지 않습니다: ${result.error.message}`);
  }

  return `.env.${result.value}`;
}
