import moduleAlias from "module-alias"

moduleAlias.addAliases({
  "@root": `${__dirname}/`,
  "@ari": `${__dirname}/ari`,
  "@database": `${__dirname}/database`,
  "@interfaces": `${__dirname}/interfaces`,
  "@config": `${__dirname}/config`,
  "@api": `${__dirname}/api`
})
