import Joi from 'joi';
import type { Optional } from 'src/common/type/native';

const nodeEnvs = ['development', 'production'] as const;

type NodeEnv = (typeof nodeEnvs)[number];

type EnvFilePath = `.env.${NodeEnv}`;

const nodeEnvSchema = Joi.string<NodeEnv>()
  .valid(...nodeEnvs)
  .required();

export function resolveEnvFilePath(nodeEnv: Optional<string>): EnvFilePath {
  const result = nodeEnvSchema.validate(nodeEnv);

  if (result.error) {
    throw new Error(`NODE_ENV가 누락되었거나 올바르지 않습니다: ${result.error.message}`);
  }

  return `.env.${result.value}`;
}
