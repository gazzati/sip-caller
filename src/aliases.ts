import moduleAlias from "module-alias"

moduleAlias.addAliases({
  "@root": `${__dirname}/`,
  "@processes": `${__dirname}/processes`,
  "@database": `${__dirname}/database`,
  "@services": `${__dirname}/services`,
  "@interfaces": `${__dirname}/interfaces`,
  "@config": `${__dirname}/config`,
  "@api": `${__dirname}/api`
})
